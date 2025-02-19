import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfPartiallyPausable } from '@solidstate/spec';
import {
  PartiallyPausableMock,
  PartiallyPausableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('PartiallyPausable', () => {
  let deployer: SignerWithAddress;
  let instance: PartiallyPausableMock;

  before(async () => {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new PartiallyPausableMock__factory(deployer).deploy();
  });

  describeBehaviorOfPartiallyPausable(async () => instance, {});

  describe('__internal', () => {
    describe('whenNotPartiallyPaused(bytes32) modifier', () => {
      it('does not revert if contract is not paused', async () => {
        const key = ethers.randomBytes(32);

        await expect(instance.modifier_whenNotPartiallyPaused(key)).not.to.be
          .reverted;
      });

      describe('reverts if', () => {
        it('contract is paused', async () => {
          const key = ethers.randomBytes(32);

          await instance.__partiallyPause(key);

          await expect(
            instance.modifier_whenNotPartiallyPaused(key),
          ).to.be.revertedWithCustomError(
            instance,
            'PartiallyPausable__PartiallyPaused',
          );
        });
      });
    });

    describe('whenPartiallyPaused(bytes32) modifier', () => {
      it('does not revert if contract is paused', async () => {
        const key = ethers.randomBytes(32);

        await instance.__partiallyPause(key);

        await expect(instance.modifier_whenPartiallyPaused(key)).not.to.be
          .reverted;
      });

      describe('reverts if', () => {
        it('contract is not paused', async () => {
          const key = ethers.randomBytes(32);

          await expect(
            instance.modifier_whenPartiallyPaused(key),
          ).to.be.revertedWithCustomError(
            instance,
            'PartiallyPausable__NotPartiallyPaused',
          );
        });
      });
    });

    describe('#_partiallyPaused(bytes32)', () => {
      it('todo');
    });

    describe('#_partiallyPause()', () => {
      it('sets paused status to true', async () => {
        const key = ethers.randomBytes(32);

        await instance.__partiallyPause(key);

        expect(await instance.__partiallyPaused(key)).to.be.true;
      });

      it('emits PartiallyPaused event', async () => {
        const key = ethers.randomBytes(32);

        await expect(instance.connect(deployer).__partiallyPause(key))
          .to.emit(instance, 'PartiallyPaused')
          .withArgs(deployer.address, key);
      });

      it('does not affect other keys', async () => {
        const key = ethers.randomBytes(32);
        const otherKey = ethers.randomBytes(32);

        await instance.__partiallyPause(key);

        expect(await instance.__partiallyPaused(otherKey)).to.be.false;
      });

      describe('reverts if', () => {
        it('contract is partially paused already', async () => {
          const key = ethers.randomBytes(32);

          await instance.__partiallyPause(key);

          await expect(
            instance.__partiallyPause(key),
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

        await instance.__partiallyPause(key);
        await instance.__partiallyUnpause(key);

        expect(await instance.__partiallyPaused(key)).to.be.false;
      });

      it('emits PartiallyUnpaused event', async () => {
        const key = ethers.randomBytes(32);

        await instance.__partiallyPause(key);

        await expect(instance.connect(deployer).__partiallyUnpause(key))
          .to.emit(instance, 'PartiallyUnpaused')
          .withArgs(deployer.address, key);
      });

      it('does not affect other keys', async () => {
        const key = ethers.randomBytes(32);
        const otherKey = ethers.randomBytes(32);

        await instance.__partiallyPause(key);
        await instance.__partiallyPause(otherKey);
        await instance.__partiallyUnpause(key);

        expect(await instance.__partiallyPaused(otherKey)).to.be.true;
      });

      describe('reverts if', () => {
        it('contract is not partially paused', async () => {
          const key = ethers.randomBytes(32);

          await expect(
            instance.__partiallyUnpause(key),
          ).to.be.revertedWithCustomError(
            instance,
            'PartiallyPausable__NotPartiallyPaused',
          );
        });
      });
    });
  });
});
