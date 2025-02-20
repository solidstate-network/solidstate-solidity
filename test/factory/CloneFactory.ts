import {
  CloneFactoryMock,
  CloneFactoryMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('CloneFactory', () => {
  let instance: CloneFactoryMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new CloneFactoryMock__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#deployClone()', () => {
      it('deploys clone and returns deployment address', async () => {
        const address = await instance['deployClone()'].staticCall();
        expect(address).to.be.properAddress;

        await instance['deployClone()']();

        expect(await ethers.provider.getCode(address)).to.equal(
          await ethers.provider.getCode(await instance.getAddress()),
        );
      });

      describe('reverts if', () => {
        it('contract creation fails');
      });
    });

    describe('#deployClone(bytes32)', () => {
      it('deploys clone and returns deployment address', async () => {
        const salt = ethers.randomBytes(32);

        const address = await instance['deployClone(bytes32)'].staticCall(salt);
        expect(address).to.be.properAddress;

        await instance['deployClone(bytes32)'](salt);

        expect(await ethers.provider.getCode(address)).to.equal(
          await ethers.provider.getCode(await instance.getAddress()),
        );
      });

      describe('reverts if', () => {
        it('contract creation fails');

        it('salt has already been used', async () => {
          const salt = ethers.randomBytes(32);

          await instance['deployClone(bytes32)'](salt);

          await expect(
            instance['deployClone(bytes32)'](salt),
          ).to.be.revertedWithCustomError(
            instance,
            'Factory__FailedDeployment',
          );
        });
      });
    });

    describe('#calculateCloneDeploymentAddress(bytes32)', () => {
      it('returns address of not-yet-deployed contract', async () => {
        const initCode = '0x58333b90818180333cf3';
        const initCodeHash = ethers.keccak256(initCode);
        const salt = ethers.randomBytes(32);

        expect(
          await instance.calculateCloneDeploymentAddress.staticCall(salt),
        ).to.equal(
          ethers.getCreate2Address(
            await instance.getAddress(),
            salt,
            initCodeHash,
          ),
        );
      });
    });
  });
});
