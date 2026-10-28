import {
  type $ReentrancyGuardTest,
  $ReentrancyGuardTest__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { network } from 'hardhat';

const connection = await network.create();

describe('ReentrancyGuard', () => {
  let instance: $ReentrancyGuardTest;

  beforeEach(async () => {
    const [deployer] = await connection.ethers.getSigners();
    instance = await new $ReentrancyGuardTest__factory(deployer).deploy();
  });

  describe('nonReentrant() modifier', () => {
    it('does not revert non-reentrant call', async () => {
      await expect(instance.modifier_nonReentrant()).not.to.revert(
        connection.ethers,
      );

      // test subsequent calls

      await expect(instance.modifier_nonReentrant()).not.to.revert(
        connection.ethers,
      );

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
        await instance.$_lockReentrancyGuard();
        await expect(instance.crossFunctionReentrancyTest()).to.revert(
          connection.ethers,
        );
      });
    });
  });

  describe('#_lockReentrancyGuard()', () => {
    it('causes nonReentrant functions to revert', async () => {
      await instance.$_lockReentrancyGuard();

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
      await instance.$_lockReentrancyGuard();

      await instance.$_unlockReentrancyGuard();

      await expect(instance.modifier_nonReentrant()).not.to.revert(
        connection.ethers,
      );
    });
  });
});
