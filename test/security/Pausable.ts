import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfPausable } from '@solidstate/spec';
import { $Pausable, $Pausable__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Pausable', () => {
  let deployer: SignerWithAddress;
  let instance: $Pausable;

  before(async () => {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new $Pausable__factory(deployer).deploy();
  });

  describeBehaviorOfPausable(async () => instance, {});

  describe('__internal', () => {
    describe('whenNotPaused() modifier', () => {
      it('does not revert if contract is not paused', async () => {
        await expect(instance.$whenNotPaused()).not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('contract is paused', async () => {
          await instance.$_pause();

          await expect(instance.$whenNotPaused()).to.be.revertedWithCustomError(
            instance,
            'Pausable__Paused',
          );
        });
      });
    });

    describe('whenPaused() modifier', () => {
      it('does not revert if contract is paused', async () => {
        await instance.$_pause();

        await expect(instance.$whenPaused()).not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('contract is not paused', async () => {
          await expect(instance.$whenPaused()).to.be.revertedWithCustomError(
            instance,
            'Pausable__NotPaused',
          );
        });
      });
    });

    describe('#_paused()', () => {
      it('returns whether contract is paused', async () => {
        expect(await instance.$_paused.staticCall()).to.be.false;
        await instance.$_pause();
        expect(await instance.$_paused.staticCall()).to.be.true;
      });
    });

    describe('#_pause()', () => {
      it('sets paused status to true', async () => {
        await instance.$_pause();
        expect(await instance.paused()).to.be.true;
      });

      it('emits Paused event', async () => {
        await expect(instance.connect(deployer).$_pause())
          .to.emit(instance, 'Paused')
          .withArgs(deployer.address);
      });

      describe('reverts if', () => {
        it('contract is already paused', async () => {
          await instance.$_pause();
          await expect(instance.$_pause()).to.be.revertedWithCustomError(
            instance,
            'Pausable__Paused',
          );
        });
      });
    });

    describe('#_unpause()', () => {
      it('sets paused status to false', async () => {
        await instance.$_pause();

        await instance.$_unpause();
        expect(await instance.$_paused.staticCall()).to.be.false;
      });

      it('emits Unpaused event', async () => {
        await instance.$_pause();

        await expect(instance.connect(deployer).$_unpause())
          .to.emit(instance, 'Unpaused')
          .withArgs(deployer.address);
      });

      describe('reverts if', () => {
        it('contract is not paused', async () => {
          await expect(instance.$_unpause()).to.be.revertedWithCustomError(
            instance,
            'Pausable__NotPaused',
          );
        });
      });
    });
  });
});
