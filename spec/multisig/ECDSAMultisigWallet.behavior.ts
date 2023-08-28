import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeFilter, signData } from '@solidstate/library';
import { IECDSAMultisigWallet } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BytesLike } from 'ethers';
import { ethers } from 'hardhat';

let currentNonce = 0n;

const nextNonce = () => {
  return ++currentNonce;
};

interface SignAuthorizationArgs {
  target: string;
  data: BytesLike;
  value: bigint;
  delegate: boolean;
  nonce: bigint;
  address: any;
}

interface Signature {
  data: Uint8Array;
  nonce: bigint;
}

const signAuthorization = async (
  signer: SignerWithAddress,
  { target, data, value, delegate, nonce, address }: SignAuthorizationArgs,
) => {
  return signData(signer, {
    values: [target, data, value, delegate],
    types: ['address', 'bytes', 'uint256', 'bool'],
    nonce,
    address,
  });
};

export interface ECDSAMultisigWalletBehaviorArgs {
  getSigners: () => Promise<SignerWithAddress[]>;
  getNonSigner: () => Promise<SignerWithAddress>;
  quorum: bigint;
  getVerificationAddress: () => Promise<string>;
}

export function describeBehaviorOfECDSAMultisigWallet(
  deploy: () => Promise<IECDSAMultisigWallet>,
  {
    getSigners,
    getNonSigner,
    quorum,
    getVerificationAddress,
  }: ECDSAMultisigWalletBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ECDSAMultisigWallet', () => {
    let instance: IECDSAMultisigWallet;
    let signers: SignerWithAddress[];
    let nonSigner: SignerWithAddress;

    let verificationAddress: string;

    before(async () => {
      signers = await getSigners();
      nonSigner = await getNonSigner();

      expect(quorum).to.be.at.least(1);
      expect(signers.length).to.be.at.least(quorum);
    });

    beforeEach(async () => {
      instance = await deploy();
      verificationAddress = await getVerificationAddress();
    });

    describe('receive()', () => {
      it('accepts ether transfer', async () => {
        const [signer] = signers;
        const value = 1n;
        const to = await instance.getAddress();

        await expect(() =>
          signer.sendTransaction({ to, value }),
        ).to.changeEtherBalance(instance, value);
      });
    });

    describe('#verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256))', () => {
      describe('with "call" opcode', () => {
        let delegate = false;

        it('calls function on target address');

        it('transfers value to target address', async () => {
          let mock = await deployMockContract(signers[0], [
            'function fn () external payable returns (bool)',
          ]);

          await mock.mock.fn.returns(true);

          let target = mock.address;
          const { data } = (await mock.populateTransaction.fn()) as {
            data: BytesLike;
          };
          let value = 1n;
          let signatures: Signature[] = [];

          for (let signer of signers) {
            let nonce = nextNonce();
            let sig = await signAuthorization(signer, {
              target,
              data,
              value,
              delegate,
              nonce,
              address: verificationAddress,
            });

            signatures.push({ data: sig, nonce });
          }

          // the changeEtherBalances matcher requires a getAddress function to work
          const addressableMock = { getAddress: () => mock.address };

          await expect(() =>
            instance.verifyAndExecute(
              { target, data, value, delegate },
              signatures,
              { value },
            ),
          ).to.changeEtherBalances([addressableMock, instance], [value, 0]);
        });

        it('forwards return data from called function', async () => {
          let mock = await deployMockContract(signers[0], [
            'function fn () external payable returns (bool)',
          ]);

          await mock.mock.fn.returns(true);

          let target = mock.address;
          const { data } = (await mock.populateTransaction.fn()) as {
            data: BytesLike;
          };
          let value = 0n;
          let signatures: Signature[] = [];

          for (let signer of signers) {
            let nonce = nextNonce();
            let sig = await signAuthorization(signer, {
              target,
              data,
              value,
              delegate,
              nonce,
              address: verificationAddress,
            });

            signatures.push({ data: sig, nonce });
          }

          expect(
            ethers.AbiCoder.defaultAbiCoder().decode(
              mock.interface.functions['fn()'].outputs ?? [],
              await instance.verifyAndExecute.staticCall(
                { target, data, value, delegate },
                signatures,
                { value },
              ),
            )[0],
          ).to.be.true;
        });

        describe('reverts if', () => {
          it('target contract reverts', async () => {
            let mock = await deployMockContract(signers[0], [
              'function fn () external payable returns (bool)',
            ]);

            await mock.mock.fn.returns(true);

            let reason = 'revert: reason';
            await mock.mock.fn.revertsWithReason(reason);

            let target = mock.address;
            const { data } = (await mock.populateTransaction.fn()) as {
              data: BytesLike;
            };
            let value = 0n;
            let signatures: Signature[] = [];

            for (let signer of signers) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: verificationAddress,
              });

              signatures.push({ data: sig, nonce });
            }

            await expect(
              instance.verifyAndExecute.staticCall(
                { target, data, value, delegate },
                signatures,
                { value },
              ),
            ).to.be.revertedWith(reason);
          });

          it('quorum is not reached', async () => {
            let target = ethers.ZeroAddress;
            let data = ethers.randomBytes(32);
            let value = 0n;
            let signatures: Signature[] = [];

            for (let signer of signers.concat([signers[0]])) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: verificationAddress,
              });

              signatures.push({ data: sig, nonce });
            }

            await expect(
              instance.verifyAndExecute(
                { target, data, value, delegate },
                signatures.slice(0, parseInt(quorum.toString()) - 1),
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'ECDSAMultisigWallet__QuorumNotReached',
            );
          });

          it('duplicate signer is found', async () => {
            let target = ethers.ZeroAddress;
            let data = ethers.randomBytes(32);
            let value = 0n;
            let signatures: Signature[] = [];

            for (let signer of signers.concat([signers[0]])) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: verificationAddress,
              });

              signatures.push({ data: sig, nonce });
            }

            await expect(
              instance.verifyAndExecute(
                { target, data, value, delegate },
                signatures,
                { value },
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'ECDSAMultisigWallet__SignerAlreadySigned',
            );
          });

          it('recovered signer is not authorized', async () => {
            let target = ethers.ZeroAddress;
            let data = ethers.randomBytes(32);
            let value = 0n;
            let signatures: Signature[] = [];

            for (let signer of signers.concat([nonSigner])) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: verificationAddress,
              });

              signatures.push({ data: sig, nonce });
            }

            await expect(
              instance.verifyAndExecute(
                { target, data, value, delegate },
                signatures,
                { value },
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'ECDSAMultisigWallet__RecoveredSignerNotAuthorized',
            );
          });

          it('nonce has been used', async () => {
            let target = ethers.ZeroAddress;
            let data = ethers.randomBytes(32);
            let value = 0n;
            let signatures: Signature[] = [];

            for (let signer of signers) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: verificationAddress,
              });

              signatures.push({ data: sig, nonce });
            }

            await instance.verifyAndExecute(
              { target, data, value, delegate },
              signatures,
              { value },
            );

            await expect(
              instance.verifyAndExecute(
                { target, data, value, delegate },
                signatures,
                { value },
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'ECDSAMultisigWallet__InvalidNonce',
            );
          });
        });
      });

      describe('with "delegatecall" opcode', () => {
        let delegate = true;

        it('delegatecalls function on target address');

        it('does not transfer value to target address', async () => {
          let receiver = new ethers.VoidSigner(
            ethers.ZeroAddress,
            ethers.provider,
          );

          let target = receiver.address;
          let data = ethers.randomBytes(0);
          let value = 1n;
          let signatures: Signature[] = [];

          for (let signer of signers) {
            let nonce = nextNonce();
            let sig = await signAuthorization(signer, {
              target,
              data,
              value,
              delegate,
              nonce,
              address: verificationAddress,
            });

            signatures.push({ data: sig, nonce });
          }

          await expect(async () => {
            return instance.verifyAndExecute(
              { target, data, value, delegate },
              signatures,
              { value },
            );
          }).to.changeEtherBalances([receiver, instance], [0, value]);
        });

        it('forwards return data from called function', async () => {
          // TODO: test non-empty return data
          let target = ethers.ZeroAddress;
          let data = ethers.randomBytes(0);
          let value = 0n;
          let signatures: Signature[] = [];

          for (let signer of signers) {
            let nonce = nextNonce();
            let sig = await signAuthorization(signer, {
              target,
              data,
              value,
              delegate,
              nonce,
              address: verificationAddress,
            });

            signatures.push({ data: sig, nonce });
          }

          expect(
            await instance.verifyAndExecute.staticCall(
              { target, data, value, delegate },
              signatures,
              { value },
            ),
          ).to.equal('0x');
        });

        describe('reverts if', () => {
          it('target contract reverts', async () => {
            let mock = await deployMockContract(signers[0], [
              'function fn () external payable returns (bool)',
            ]);

            let target = mock.address;
            const { data } = (await mock.populateTransaction.fn()) as {
              data: BytesLike;
            };
            let value = 0n;
            let signatures: Signature[] = [];

            for (let signer of signers) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: verificationAddress,
              });

              signatures.push({ data: sig, nonce });
            }

            // revert message depends on waffle mock implementation

            await expect(
              instance.verifyAndExecute(
                { target, data, value: 0, delegate: true },
                signatures,
                {
                  value,
                },
              ),
            ).to.be.revertedWith('Mock on the method is not initialized');
          });

          it('quorum is not reached', async () => {
            let target = ethers.ZeroAddress;
            let data = ethers.randomBytes(32);
            let value = 0n;
            let signatures: Signature[] = [];

            for (let signer of signers.concat([signers[0]])) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: verificationAddress,
              });

              signatures.push({ data: sig, nonce });
            }

            await expect(
              instance.verifyAndExecute(
                { target, data, value, delegate },
                signatures.slice(0, parseInt(quorum.toString()) - 1),
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'ECDSAMultisigWallet__QuorumNotReached',
            );
          });

          it('duplicate signer is found', async () => {
            let target = ethers.ZeroAddress;
            let data = ethers.randomBytes(32);
            let value = 0n;
            let signatures: Signature[] = [];

            for (let signer of signers.concat([signers[0]])) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: verificationAddress,
              });

              signatures.push({ data: sig, nonce });
            }

            await expect(
              instance.verifyAndExecute(
                { target, data, value, delegate },
                signatures,
                { value },
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'ECDSAMultisigWallet__SignerAlreadySigned',
            );
          });

          it('recovered signer is not authorized', async () => {
            let target = ethers.ZeroAddress;
            let data = ethers.randomBytes(32);
            let value = 0n;
            let signatures: Signature[] = [];

            for (let signer of signers.concat([nonSigner])) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: verificationAddress,
              });

              signatures.push({ data: sig, nonce });
            }

            await expect(
              instance.verifyAndExecute(
                { target, data, value, delegate },
                signatures,
                { value },
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'ECDSAMultisigWallet__RecoveredSignerNotAuthorized',
            );
          });

          it('message value is incorrect', async () => {
            let target = ethers.ZeroAddress;
            let data = ethers.randomBytes(32);
            let value = 0n;
            let signatures: Signature[] = [];

            for (let signer of signers) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: verificationAddress,
              });

              signatures.push({ data: sig, nonce });
            }

            await expect(
              instance.verifyAndExecute(
                { target, data, value, delegate },
                signatures,
                {
                  value: value + 1n,
                },
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'ECDSAMultisigWallet__MessageValueMismatch',
            );
          });

          it('nonce has been used', async () => {
            let target = ethers.ZeroAddress;
            let data = ethers.randomBytes(32);
            let value = 0n;
            let signatures: Signature[] = [];

            for (let signer of signers) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: verificationAddress,
              });

              signatures.push({ data: sig, nonce });
            }

            await instance.verifyAndExecute(
              { target, data, value, delegate },
              signatures,
              { value },
            );

            await expect(
              instance.verifyAndExecute(
                { target, data, value, delegate },
                signatures,
                { value },
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'ECDSAMultisigWallet__InvalidNonce',
            );
          });
        });
      });
    });
  });
}
