import { describeBehaviorOfReentrancyGuard } from '@solidstate/spec';
import {
  __hh_exposed_ReentrancyGuardTest,
  __hh_exposed_ReentrancyGuardTest__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ReentrancyGuard', () => {
  let instance: __hh_exposed_ReentrancyGuardTest;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_ReentrancyGuardTest__factory(
      deployer,
    ).deploy();
  });

  describeBehaviorOfReentrancyGuard(async () => instance, {});

  describe('__internal', () => {
    describe('nonReentrant() modifier', () => {
      it('does not revert non-reentrant call', async () => {
        await expect(instance.modifier_nonReentrant()).not.to.be.reverted;

        // test subsequent calls

        await expect(instance.modifier_nonReentrant()).not.to.be.reverted;

        await expect(instance.reentrancyTest()).to.be.revertedWithCustomError(
          instance,
          'ReentrancyGuard__ReentrantCall',
        );
      });

      describe('reverts if', () => {
        it('call is reentrant', async () => {
          await expect(instance.reentrancyTest()).to.be.revertedWithCustomError(
            instance,
            'ReentrancyGuard__ReentrantCall',
          );
        });

        it('call is cross-function reentrant', async () => {
          await expect(
            instance.crossFunctionReentrancyTest(),
          ).to.be.revertedWithCustomError(
            instance,
            'ReentrancyGuard__ReentrantCall',
          );

          // call function again with different contract state to avoid false-negative test coverage
          await instance.__hh_exposed__lockReentrancyGuard();
          await expect(instance.crossFunctionReentrancyTest()).to.be.reverted;
        });
      });
    });

    describe('#_lockReentrancyGuard()', () => {
      it('causes nonReentrant functions to revert', async () => {
        await instance.__hh_exposed__lockReentrancyGuard();

        await expect(
          instance.modifier_nonReentrant(),
        ).to.be.revertedWithCustomError(
          instance,
          'ReentrancyGuard__ReentrantCall',
        );
      });
    });

    describe('#_unlockReentrancyGuard()', () => {
      it('causes nonReentrant functions to pass', async () => {
        await instance.__hh_exposed__lockReentrancyGuard();

        await instance.__hh_exposed__unlockReentrancyGuard();

        await expect(instance.modifier_nonReentrant()).not.to.be.reverted;
      });
    });
  });
});
