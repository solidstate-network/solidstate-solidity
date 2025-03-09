import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfPartiallyPausable } from '@solidstate/spec';
import {
  __hh_exposed_PartiallyPausable,
  __hh_exposed_PartiallyPausable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('PartiallyPausable', () => {
  let deployer: SignerWithAddress;
  let instance: __hh_exposed_PartiallyPausable;

  before(async () => {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new __hh_exposed_PartiallyPausable__factory(
      deployer,
    ).deploy();
  });

  describeBehaviorOfPartiallyPausable(async () => instance, {});

  // TODO: test modifiers

  // describe('whenNotPartiallyPaused(bytes32) modifier', () => {
  //   it('does not revert if contract is not paused', async () => {
  //     const key = ethers.randomBytes(32);

  //     await expect(instance.modifier_whenNotPartiallyPaused(key)).not.to.be
  //       .reverted;
  //   });

  //   describe('reverts if', () => {
  //     it('contract is paused', async () => {
  //       const key = ethers.randomBytes(32);

  //       await instance.__partiallyPause(key);

  //       await expect(
  //         instance.modifier_whenNotPartiallyPaused(key),
  //       ).to.be.revertedWithCustomError(
  //         instance,
  //         'PartiallyPausable__PartiallyPaused',
  //       );
  //     });
  //   });
  // });

  // describe('whenPartiallyPaused(bytes32) modifier', () => {
  //   it('does not revert if contract is paused', async () => {
  //     const key = ethers.randomBytes(32);

  //     await instance.__partiallyPause(key);

  //     await expect(instance.modifier_whenPartiallyPaused(key)).not.to.be
  //       .reverted;
  //   });

  //   describe('reverts if', () => {
  //     it('contract is not paused', async () => {
  //       const key = ethers.randomBytes(32);

  //       await expect(
  //         instance.modifier_whenPartiallyPaused(key),
  //       ).to.be.revertedWithCustomError(
  //         instance,
  //         'PartiallyPausable__NotPartiallyPaused',
  //       );
  //     });
  //   });
  // });

  describe('__internal', () => {
    describe('#_partiallyPaused(bytes32)', () => {
      it('todo');
    });

    describe('#_partiallyPause()', () => {
      it('sets paused status to true', async () => {
        const key = ethers.randomBytes(32);

        await instance.__hh_exposed__partiallyPause(key);

        expect(await instance.partiallyPaused.staticCall(key)).to.be.true;
      });

      it('emits PartiallyPaused event', async () => {
        const key = ethers.randomBytes(32);

        await expect(
          instance.connect(deployer).__hh_exposed__partiallyPause(key),
        )
          .to.emit(instance, 'PartiallyPaused')
          .withArgs(deployer.address, key);
      });

      it('does not affect other keys', async () => {
        const key = ethers.randomBytes(32);
        const otherKey = ethers.randomBytes(32);

        await instance.__hh_exposed__partiallyPause(key);

        expect(await instance.partiallyPaused.staticCall(otherKey)).to.be.false;
      });

      describe('reverts if', () => {
        it('contract is partially paused already', async () => {
          const key = ethers.randomBytes(32);

          await instance.__hh_exposed__partiallyPause(key);

          await expect(
            instance.__hh_exposed__partiallyPause(key),
          ).to.be.revertedWithCustomError(
            instance,
            'PartiallyPausable__PartiallyPaused',
          );
        });
      });
    });

    describe('#_partiallyUnpause()', () => {
      it('sets paused status to false', async () => {
        const key = ethers.randomBytes(32);

        await instance.__hh_exposed__partiallyPause(key);
        await instance.__hh_exposed__partiallyUnpause(key);

        expect(await instance.partiallyPaused.staticCall(key)).to.be.false;
      });

      it('emits PartiallyUnpaused event', async () => {
        const key = ethers.randomBytes(32);

        await instance.__hh_exposed__partiallyPause(key);

        await expect(
          instance.connect(deployer).__hh_exposed__partiallyUnpause(key),
        )
          .to.emit(instance, 'PartiallyUnpaused')
          .withArgs(deployer.address, key);
      });

      it('does not affect other keys', async () => {
        const key = ethers.randomBytes(32);
        const otherKey = ethers.randomBytes(32);

        await instance.__hh_exposed__partiallyPause(key);
        await instance.__hh_exposed__partiallyPause(otherKey);
        await instance.__hh_exposed__partiallyUnpause(key);

        expect(await instance.partiallyPaused.staticCall(otherKey)).to.be.true;
      });

      describe('reverts if', () => {
        it('contract is not partially paused', async () => {
          const key = ethers.randomBytes(32);

          await expect(
            instance.__hh_exposed__partiallyUnpause(key),
          ).to.be.revertedWithCustomError(
            instance,
            'PartiallyPausable__NotPartiallyPaused',
          );
        });
      });
    });
  });
});
