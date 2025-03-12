import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfECDSAMultisigWallet } from '@solidstate/spec';
import {
  $ECDSAMultisigWallet,
  $ECDSAMultisigWallet__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const randomAddress = () =>
  ethers.getAddress(ethers.zeroPadValue(ethers.randomBytes(20), 20));

describe('ECDSAMultisigWallet', () => {
  const quorum = 1n;
  let signers: SignerWithAddress[];
  let nonSigner: SignerWithAddress;
  let instance: $ECDSAMultisigWallet;

  before(async () => {
    [nonSigner, ...signers] = (await ethers.getSigners()).slice(0, 4);
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ECDSAMultisigWallet__factory(deployer).deploy();

    for (const signer of signers) {
      await instance.$_addSigner(await signer.getAddress());
    }

    await instance.$_setQuorum(quorum);
  });

  describeBehaviorOfECDSAMultisigWallet(async () => instance, {
    getSigners: async () => signers,
    getNonSigner: async () => nonSigner,
    quorum,
    getVerificationAddress: async () => await instance.getAddress(),
  });

  describe('__internal', () => {
    describe('#_isInvalidNonce(address,uint256)', () => {
      it('returns whether nonce has already been invalidated', async () => {
        const account = await signers[0].getAddress();
        const nonce = 1n;

        expect(await instance.$_isInvalidNonce.staticCall(account, nonce)).to.be
          .false;

        await instance.$_setInvalidNonce(account, nonce);

        expect(await instance.$_isInvalidNonce.staticCall(account, nonce)).to.be
          .true;
        expect(
          await instance.$_isInvalidNonce.staticCall(
            await nonSigner.getAddress(),
            nonce,
          ),
        ).to.be.false;
      });
    });

    describe('#_setInvalidNonce(address,uint256)', () => {
      it('invalidates nonce', async () => {
        const account = await signers[0].getAddress();
        const nonce = 1n;

        await instance.$_setInvalidNonce(account, nonce);

        expect(await instance.$_isInvalidNonce.staticCall(account, nonce)).to.be
          .true;
      });
    });

    describe('#_setQuorum(uint256)', () => {
      it('todo');

      describe('reverts if', () => {
        // TODO: should quorum of zero be allowed?
        it('quorum is zero');

        it('there are not enough signers to meet new quorum', async () => {
          await expect(
            instance.$_setQuorum(signers.length + 1),
          ).to.be.revertedWithCustomError(
            instance,
            'ECDSAMultisigWallet__InsufficientSigners',
          );
        });
      });
    });

    describe('#_isSigner(address)', () => {
      it('returns whether account is a signer', async () => {
        expect(
          await instance.$_isSigner.staticCall(await signers[0].getAddress()),
        ).to.be.true;
        expect(
          await instance.$_isSigner.staticCall(await nonSigner.getAddress()),
        ).to.be.false;
      });
    });

    describe('#_addSigner(address)', () => {
      it('adds account as a signer', async () => {
        const account = await nonSigner.getAddress();

        await instance.$_addSigner(account);

        expect(await instance.$_isSigner.staticCall(account)).to.be.true;
      });

      describe('reverts if', () => {
        it('256 accounts are already signers', async () => {
          for (let index = signers.length; index < 256; index++) {
            await instance.$_addSigner(randomAddress());
          }

          await expect(
            instance.$_addSigner(randomAddress()),
          ).to.be.revertedWithCustomError(
            instance,
            'ECDSAMultisigWallet__SignerLimitReached',
          );
        });

        it('signer has already been added', async () => {
          await expect(
            instance.$_addSigner(await signers[0].getAddress()),
          ).to.be.revertedWithCustomError(
            instance,
            'ECDSAMultisigWallet__AddSignerFailed',
          );
        });
      });
    });

    describe('#_removeSigner(address)', () => {
      it('removes account as a signer', async () => {
        const account = await signers[0].getAddress();

        await instance.$_removeSigner(account);

        expect(await instance.$_isSigner.staticCall(account)).to.be.false;
      });

      describe('reverts if', () => {
        it('not enough signers remain to meet quorum', async () => {
          await instance.$_setQuorum(signers.length);

          await expect(
            instance.$_removeSigner(await signers[0].getAddress()),
          ).to.be.revertedWithCustomError(
            instance,
            'ECDSAMultisigWallet__InsufficientSigners',
          );
        });

        // TODO: should removal of all signers be allowed?
        it('account is last signer');

        it('account is not signer', async () => {
          await expect(
            instance.$_removeSigner(await nonSigner.getAddress()),
          ).to.be.revertedWithCustomError(
            instance,
            'ECDSAMultisigWallet__RemoveSignerFailed',
          );
        });
      });
    });

    describe('#_verifyAndExecute((address,bytes,uint256,bool),(bytes,uint256)[])', () => {
      it('todo');
    });

    describe('#_executeCall((address,bytes,uint256,bool))', () => {
      it('todo');
    });

    describe('#_verifySignatures(bytes,(bytes,uint256)[])', () => {
      it('todo');
    });
  });
});
