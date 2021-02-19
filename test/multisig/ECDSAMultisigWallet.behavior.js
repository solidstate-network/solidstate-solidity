const { expect } = require('chai');
const { deployMockContract } = require('@ethereum-waffle/mock-contract');

const { describeFilter } = require('../../lib/mocha_describe_filter.js');

// TODO: test revert if signer order is incorrect
// TODO: test with multiple signers

let currentNonce = ethers.constants.Zero;

const nextNonce = function () {
  currentNonce = currentNonce.add(ethers.constants.One);
  return currentNonce;
};

const describeBehaviorOfECDSAMultisigWallet = function ({ deploy, getSigners, getNonSigner, quorum, signAuthorization }, skips = []) {
  const describe = describeFilter(skips);

  describe('::ECDSAMultisigWallet', function () {
    let instance;
    let signers;
    let nonSigner;

    before(async function () {
      signers = await getSigners();

      signers.sort(function (a, b) {
        if (ethers.BigNumber.from(a.address).gt(ethers.BigNumber.from(b.address))) {
          return 1;
        } else if (ethers.BigNumber.from(a.address).lt(ethers.BigNumber.from(b.address))) {
          return -1;
        } else {
          return 0;
        }
      });

      nonSigner = await getNonSigner();

      expect(quorum).to.be.at.least(1);
      expect(signers.length).to.be.at.least(quorum);
    });

    beforeEach(async function () {
      instance = await ethers.getContractAt('ECDSAMultisigWallet', (await deploy()).address);
    });

    describe('receive', function () {
      it('accepts ether transfer', async function () {
        let [signer] = signers;
        let value = ethers.constants.One;

        await expect(
          () => signer.sendTransaction({ to: instance.address, value })
        ).to.changeEtherBalance(instance, value);
      });
    });

    describe('#verifyAndExecute', function () {
      describe('with "call" opcode', function () {
        let delegate = false;

        it('calls function on target address');

        it('transfers value to target address', async function () {
          let mock = await deployMockContract(
            signers[0],
            ['function fn () external payable returns (bool)']
          );

          await mock.mock.fn.returns(true);

          let target = mock.address;
          let { data } = await mock.populateTransaction.fn();
          let value = ethers.constants.One;
          let signatures = [];

          for (let signer of signers) {
            let nonce = nextNonce();
            let sig = await signAuthorization(signer, {
              target,
              data,
              value,
              delegate,
              nonce,
              address: instance.address,
            });

            signatures.push([sig, nonce]);
          }

          await expect(
            async function () {
              return instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures,
                { value }
              );
            }
          ).to.changeEtherBalances(
            [mock, instance],
            [value, 0]
          );
        });

        it('forwards return data from called function', async function () {
          let mock = await deployMockContract(
            signers[0],
            ['function fn () external payable returns (bool)']
          );

          await mock.mock.fn.returns(true);

          let target = mock.address;
          let { data } = await mock.populateTransaction.fn();
          let value = ethers.constants.Zero;
          let signatures = [];

          for (let signer of signers) {
            let nonce = nextNonce();
            let sig = await signAuthorization(signer, {
              target,
              data,
              value,
              delegate,
              nonce,
              address: instance.address,
            });

            signatures.push([sig, nonce]);
          }

          expect(
            ethers.utils.defaultAbiCoder.decode(
              mock.interface.functions['fn()'].outputs,
              await instance.callStatic['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures,
                { value }
              )
            )[0]
          ).to.be.true;
        });

        describe('reverts if', function () {
          it('target contract reverts', async function () {
            let mock = await deployMockContract(
              signers[0],
              ['function fn () external payable returns (bool)']
            );

            await mock.mock.fn.returns(true);

            let reason = 'revert: reason';
            await mock.mock.fn.revertsWithReason(reason);

            let target = mock.address;
            let { data } = await mock.populateTransaction.fn();
            let value = ethers.constants.Zero;
            let signatures = [];

            for (let signer of signers) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: instance.address,
              });

              signatures.push([sig, nonce]);
            }

            await expect(
              instance.callStatic['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures,
                { value }
              )
            ).to.be.revertedWith(reason);
          });

          it('quorum is not reached', async function () {
            let target = ethers.constants.AddressZero;
            let data = ethers.utils.randomBytes(32);
            let value = ethers.constants.Zero;
            let signatures = [];

            for (let signer of signers.concat([signers[0]])) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: instance.address,
              });

              signatures.push([sig, nonce]);
            }

            await expect(
              instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures.slice(0, quorum.toNumber() - 1)
              )
            ).to.be.revertedWith(
              'ECDSAMultisigWallet: quorum not reached'
            );
          });

          it('duplicate signer is found', async function () {
            let target = ethers.constants.AddressZero;
            let data = ethers.utils.randomBytes(32);
            let value = ethers.constants.Zero;
            let signatures = [];

            for (let signer of signers.concat([signers[0]])) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: instance.address,
              });

              signatures.push([sig, nonce]);
            }

            await expect(
              instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures,
                { value }
              )
            ).to.be.revertedWith(
              'ECDSAMultisigWallet: signer can not sign more than once'
            );
          });

          it('recovered signer is not authorized', async function () {
            let target = ethers.constants.AddressZero;
            let data = ethers.utils.randomBytes(32);
            let value = ethers.constants.Zero;
            let signatures = [];

            for (let signer of signers.concat([nonSigner])) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: instance.address,
              });

              signatures.push([sig, nonce]);
            }

            await expect(
              instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures,
                { value }
              )
            ).to.be.revertedWith(
              'ECDSAMultisigWallet: recovered signer not authorized'
            );
          });

          it('nonce has been used', async function () {
            let target = ethers.constants.AddressZero;
            let data = ethers.utils.randomBytes(32);
            let value = ethers.constants.Zero;
            let signatures = [];

            for (let signer of signers) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: instance.address,
              });

              signatures.push([sig, nonce]);
            }

            await instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
              [target, data, value, delegate],
              signatures,
              { value }
            );

            await expect(
              instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures,
                { value }
              )
            ).to.be.revertedWith(
              'ECDSAMultisigWallet: invalid nonce'
            );
          });
        });
      });

      describe('with "delegatecall" opcode', function () {
        let delegate = true;

        it('delegatecalls function on target address');

        it('does not transfer value to target address', async function () {
          let receiver = new ethers.VoidSigner(ethers.constants.AddressZero, ethers.provider);

          let target = receiver.address;
          let data = ethers.utils.randomBytes(0);
          let value = ethers.constants.One;
          let signatures = [];

          for (let signer of signers) {
            let nonce = nextNonce();
            let sig = await signAuthorization(signer, {
              target,
              data,
              value,
              delegate,
              nonce,
              address: instance.address,
            });

            signatures.push([sig, nonce]);
          }

          await expect(
            async function () {
              return instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures,
                { value }
              );
            }
          ).to.changeEtherBalances(
            [receiver, instance],
            [0, value]
          );
        });

        it('forwards return data from called function', async function () {
          // TODO: test non-empty return data
          let target = ethers.constants.AddressZero;
          let data = ethers.utils.randomBytes(0);
          let value = ethers.constants.Zero;
          let signatures = [];

          for (let signer of signers) {
            let nonce = nextNonce();
            let sig = await signAuthorization(signer, {
              target,
              data,
              value,
              delegate,
              nonce,
              address: instance.address,
            });

            signatures.push([sig, nonce]);
          }

          expect(
            await instance.callStatic['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
              [target, data, value, delegate],
              signatures,
              { value }
            )
          ).to.equal('0x');
        });

        describe('reverts if', function () {
          it('target contract reverts', async function () {
            let mock = await deployMockContract(
              signers[0],
              ['function fn () external payable returns (bool)']
            );

            let target = mock.address;
            let { data } = await mock.populateTransaction.fn();
            let value = ethers.constants.Zero;
            let signatures = [];

            for (let signer of signers) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: instance.address,
              });

              signatures.push([sig, nonce]);
            }

            // revert message depends on waffle mock implementation

            await expect(
              instance.callStatic['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, ethers.constants.Zero, true],
                signatures,
                { value }
              )
            ).to.be.revertedWith(
              'revert Mock on the method is not initialized'
            );
          });

          it('quorum is not reached', async function () {
            let target = ethers.constants.AddressZero;
            let data = ethers.utils.randomBytes(32);
            let value = ethers.constants.Zero;
            let signatures = [];

            for (let signer of signers.concat([signers[0]])) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: instance.address,
              });

              signatures.push([sig, nonce]);
            }

            await expect(
              instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures.slice(0, quorum.toNumber() - 1)
              )
            ).to.be.revertedWith(
              'ECDSAMultisigWallet: quorum not reached'
            );
          });

          it('duplicate signer is found', async function () {
            let target = ethers.constants.AddressZero;
            let data = ethers.utils.randomBytes(32);
            let value = ethers.constants.Zero;
            let signatures = [];

            for (let signer of signers.concat([signers[0]])) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: instance.address,
              });

              signatures.push([sig, nonce]);
            }

            await expect(
              instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures,
                { value }
              )
            ).to.be.revertedWith(
              'ECDSAMultisigWallet: signer can not sign more than once'
            );
          });

          it('recovered signer is not authorized', async function () {
            let target = ethers.constants.AddressZero;
            let data = ethers.utils.randomBytes(32);
            let value = ethers.constants.Zero;
            let signatures = [];

            for (let signer of signers.concat([nonSigner])) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: instance.address,
              });

              signatures.push([sig, nonce]);
            }

            await expect(
              instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures,
                { value }
              )
            ).to.be.revertedWith(
              'ECDSAMultisigWallet: recovered signer not authorized'
            );
          });

          it('message value is incorrect', async function () {

            let target = ethers.constants.AddressZero;
            let data = ethers.utils.randomBytes(32);
            let value = ethers.constants.Zero;
            let signatures = [];

            for (let signer of signers) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: instance.address,
              });

              signatures.push([sig, nonce]);
            }

            await expect(
              instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures,
                { value: value.add(ethers.constants.One) }
              )
            ).to.be.revertedWith(
              'ECDSAMultisigWallet: delegatecall value must match signed amount'
            );
          });

          it('nonce has been used', async function () {

            let target = ethers.constants.AddressZero;
            let data = ethers.utils.randomBytes(32);
            let value = ethers.constants.Zero;
            let signatures = [];

            for (let signer of signers) {
              let nonce = nextNonce();
              let sig = await signAuthorization(signer, {
                target,
                data,
                value,
                delegate,
                nonce,
                address: instance.address,
              });

              signatures.push([sig, nonce]);
            }

            await instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
              [target, data, value, delegate],
              signatures,
              { value }
            );

            await expect(
              instance['verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])'](
                [target, data, value, delegate],
                signatures,
                { value }
              )
            ).to.be.revertedWith(
              'ECDSAMultisigWallet: invalid nonce'
            );
          });
        });
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfECDSAMultisigWallet;
