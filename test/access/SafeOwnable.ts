import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfSafeOwnable } from '@solidstate/spec';
import {
  SafeOwnableMock,
  SafeOwnableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('SafeOwnable', () => {
  let owner: SignerWithAddress;
  let nomineeOwner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: SafeOwnableMock;

  before(async () => {
    [owner, nomineeOwner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new SafeOwnableMock__factory(owner).deploy(owner.address);
  });

  describeBehaviorOfSafeOwnable(async () => instance, {
    getOwner: async () => owner,
    getNomineeOwner: async () => nomineeOwner,
    getNonOwner: async () => nonOwner,
  });

  describe('__internal', () => {
    describe('onlyNomineeOwner() modifier', () => {
      it('does not revert if sender is nominee owner', async () => {
        await instance.__setNomineeOwner(nomineeOwner.address);

        await expect(instance.connect(nomineeOwner).modifier_onlyNomineeOwner())
          .not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('sender is not nominee owner', async () => {
          await expect(
            instance.connect(nonOwner).modifier_onlyNomineeOwner(),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeOwnable__NotNomineeOwner',
          );

          await expect(
            instance.connect(owner).modifier_onlyNomineeOwner(),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeOwnable__NotNomineeOwner',
          );
        });
      });
    });

    describe('#_nomineeOwner()', () => {
      it('returns nominee owner address', async () => {
        await instance.__setNomineeOwner;
      });
    });

    describe('#_acceptOwnership()', () => {
      it('sets message sender as owner', async () => {
        await instance.connect(nomineeOwner).__acceptOwnership();

        expect(await instance.__owner.staticCall()).to.equal(
          nomineeOwner.address,
        );
      });

      it('sets nominee owner to zero address', async () => {
        await instance.__setNomineeOwner(nomineeOwner.address);

        await instance.connect(nomineeOwner).__acceptOwnership();

        expect(await instance.__nomineeOwner.staticCall()).to.equal(
          ethers.ZeroAddress,
        );
      });
    });

    describe('#_transferOwnership(address)', () => {
      it('sets nominee owner to given address', async () => {
        await instance.__transferOwnership(nomineeOwner.address);

        expect(await instance.__nomineeOwner.staticCall()).to.equal(
          nomineeOwner.address,
        );
      });

      it('does not update owner address', async () => {
        await instance.__transferOwnership(nomineeOwner.address);

        expect(await instance.__owner.staticCall()).to.equal(owner.address);
      });
    });

    describe('#_setNomineeOwner(address)', () => {
      it('sets nominee owner to given address', async () => {
        await instance.__setNomineeOwner(nomineeOwner.address);

        expect(await instance.__nomineeOwner.staticCall()).to.equal(
          nomineeOwner.address,
        );
      });
    });
  });
});
