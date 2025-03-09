import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfPausable } from '@solidstate/spec';
import {
  __hh_exposed_Pausable,
  __hh_exposed_Pausable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Pausable', () => {
  let deployer: SignerWithAddress;
  let instance: __hh_exposed_Pausable;

  before(async () => {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new __hh_exposed_Pausable__factory(deployer).deploy();
  });

  describeBehaviorOfPausable(async () => instance, {});

  // TODO: test modifiers

  // describe('whenNotPaused() modifier', () => {
  //   it('does not revert if contract is not paused', async () => {
  //     await expect(instance.modifier_whenNotPaused()).not.to.be.reverted;
  //   });

  //   describe('reverts if', () => {
  //     it('contract is paused', async () => {
  //       await instance.__pause();

  //       await expect(
  //         instance.modifier_whenNotPaused(),
  //       ).to.be.revertedWithCustomError(instance, 'Pausable__Paused');
  //     });
  //   });
  // });

  // describe('whenPaused() modifier', () => {
  //   it('does not revert if contract is paused', async () => {
  //     await instance.__pause();

  //     await expect(instance.modifier_whenPaused()).not.to.be.reverted;
  //   });

  //   describe('reverts if', () => {
  //     it('contract is not paused', async () => {
  //       await expect(
  //         instance.modifier_whenPaused(),
  //       ).to.be.revertedWithCustomError(instance, 'Pausable__NotPaused');
  //     });
  //   });
  // });

  describe('__internal', () => {
    describe('#_paused()', () => {
      it('returns whether contract is paused', async () => {
        expect(await instance.__hh_exposed__paused.staticCall()).to.be.false;
        await instance.__hh_exposed__pause();
        expect(await instance.__hh_exposed__paused.staticCall()).to.be.true;
      });
    });

    describe('#_pause()', () => {
      it('sets paused status to true', async () => {
        await instance.__hh_exposed__pause();
        expect(await instance.paused()).to.be.true;
      });

      it('emits Paused event', async () => {
        await expect(instance.connect(deployer).__hh_exposed__pause())
          .to.emit(instance, 'Paused')
          .withArgs(deployer.address);
      });

      describe('reverts if', () => {
        it('contract is already paused', async () => {
          await instance.__hh_exposed__pause();
          await expect(
            instance.__hh_exposed__pause(),
          ).to.be.revertedWithCustomError(instance, 'Pausable__Paused');
        });
      });
    });

    describe('#_unpause()', () => {
      it('sets paused status to false', async () => {
        await instance.__hh_exposed__pause();

        await instance.__hh_exposed__unpause();
        expect(await instance.__hh_exposed__paused.staticCall()).to.be.false;
      });

      it('emits Unpaused event', async () => {
        await instance.__hh_exposed__pause();

        await expect(instance.connect(deployer).__hh_exposed__unpause())
          .to.emit(instance, 'Unpaused')
          .withArgs(deployer.address);
      });

      describe('reverts if', () => {
        it('contract is not paused', async () => {
          await expect(
            instance.__hh_exposed__unpause(),
          ).to.be.revertedWithCustomError(instance, 'Pausable__NotPaused');
        });
      });
    });
  });
});
