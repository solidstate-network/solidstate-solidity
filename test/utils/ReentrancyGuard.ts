import { describeBehaviorOfReentrancyGuard } from '@solidstate/spec/utils/ReentrancyGuard.behavior';
import { expect } from 'chai';
import {
  ReentrancyGuardMock,
  ReentrancyGuardMock__factory,
} from '../../typechain';
import { ethers } from 'hardhat';

const deploy = async () => {
  const [deployer] = await ethers.getSigners();
  return new ReentrancyGuardMock__factory(deployer).deploy();
};

describe('ReentrancyGuard', function () {
  let instance: ReentrancyGuardMock;

  beforeEach(async function () {
    instance = await deploy();
  });

  describeBehaviorOfReentrancyGuard(
    {
      deploy,
    },
    [],
  );

  describe('__internal', function () {
    describe('nonReentrant modifier', function () {
      it('does not revert non-reentrant call', async function () {
        await expect(instance['nonReentrancyTest()']()).not.to.be.reverted;

        // test subsequent calls

        await expect(instance['nonReentrancyTest()']()).not.to.be.reverted;

        await expect(instance['reentrancyTest()']()).to.be.revertedWith(
          'ReentrancyGuard: reentrant call',
        );
      });

      describe('reverts if', function () {
        it('call is reentrant', async function () {
          await expect(instance['reentrancyTest()']()).to.be.revertedWith(
            'ReentrancyGuard: reentrant call',
          );
        });

        it('call is cross-function reentrant', async function () {
          await expect(
            instance['crossFunctionReentrancyTest()'](),
          ).to.be.revertedWith('ReentrancyGuard: reentrant call');
        });
      });
    });
  });
});
