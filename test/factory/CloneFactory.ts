import { describeBehaviorOfCloneFactory } from '@solidstate/spec';
import {
  CloneFactoryMock,
  CloneFactoryMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('CloneFactory', function () {
  let instance: CloneFactoryMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new CloneFactoryMock__factory(deployer).deploy();
  });

  describeBehaviorOfCloneFactory({ deploy: () => instance });

  describe('__internal', function () {
    describe('#_deployClone()', function () {
      it('deploys clone and returns deployment address', async function () {
        const address = await instance.callStatic['__deployClone()']();
        expect(address).to.be.properAddress;

        await instance['__deployClone()']();

        expect(await ethers.provider.getCode(address)).to.equal(
          await ethers.provider.getCode(instance.address),
        );
      });

      describe('reverts if', function () {
        it('contract creation fails');
      });
    });

    describe('#_deployClone(bytes32)', function () {
      it('deploys clone and returns deployment address', async function () {
        const salt = ethers.utils.randomBytes(32);

        const address = await instance.callStatic['__deployClone(bytes32)'](
          salt,
        );
        expect(address).to.be.properAddress;

        await instance['__deployClone(bytes32)'](salt);

        expect(await ethers.provider.getCode(address)).to.equal(
          await ethers.provider.getCode(instance.address),
        );
      });

      describe('reverts if', function () {
        it('contract creation fails');

        it('salt has already been used', async function () {
          const salt = ethers.utils.randomBytes(32);

          await instance['__deployClone(bytes32)'](salt);

          await expect(
            instance['__deployClone(bytes32)'](salt),
          ).to.be.revertedWith('Factory: failed deployment');
        });
      });
    });

    describe('#_calculateCloneDeploymentAddress(bytes32)', function () {
      it('returns address of not-yet-deployed contract', async function () {
        const initCode = '0x58333b90818180333cf3';
        const initCodeHash = ethers.utils.keccak256(initCode);
        const salt = ethers.utils.randomBytes(32);

        expect(
          await instance.callStatic.__calculateCloneDeploymentAddress(salt),
        ).to.equal(
          ethers.utils.getCreate2Address(instance.address, salt, initCodeHash),
        );
      });
    });
  });
});
