import { describeBehaviorOfFactory } from '@solidstate/spec';
import { FactoryMock, FactoryMock__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Factory', function () {
  let instance: FactoryMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new FactoryMock__factory(deployer).deploy();
  });

  describeBehaviorOfFactory(async () => instance, {});

  describe('__internal', function () {
    describe('#_deploy(bytes)', function () {
      it('deploys bytecode and returns deployment address', async function () {
        const initCode = instance.deployTransaction.data;

        const address = await instance['__deploy(bytes)'].staticCall(initCode);
        expect(address).to.be.properAddress;

        await instance['__deploy(bytes)'](initCode);

        expect(await ethers.provider.getCode(address)).to.equal(
          await ethers.provider.getCode(await instance.getAddress()),
        );
      });

      describe('reverts if', function () {
        it('contract creation fails', async function () {
          const initCode = '0xfe';

          await expect(
            instance['__deploy(bytes)'](initCode),
          ).to.be.revertedWithCustomError(
            instance,
            'Factory__FailedDeployment',
          );
        });
      });
    });

    describe('#_deploy(bytes,bytes32)', function () {
      it('deploys bytecode and returns deployment address', async function () {
        const initCode = await instance.deployTransaction.data;
        const initCodeHash = ethers.keccak256(initCode);
        const salt = ethers.randomBytes(32);

        const address = await instance['__deploy(bytes,bytes32)'].staticCall(
          initCode,
          salt,
        );
        expect(address).to.equal(
          await instance.__calculateDeploymentAddress.staticCall(
            initCodeHash,
            salt,
          ),
        );

        await instance['__deploy(bytes,bytes32)'](initCode, salt);

        expect(await ethers.provider.getCode(address)).to.equal(
          await ethers.provider.getCode(await instance.getAddress()),
        );
      });

      describe('reverts if', function () {
        it('contract creation fails', async function () {
          const initCode = '0xfe';
          const salt = ethers.randomBytes(32);

          await expect(
            instance['__deploy(bytes,bytes32)'](initCode, salt),
          ).to.be.revertedWithCustomError(
            instance,
            'Factory__FailedDeployment',
          );
        });

        it('salt has already been used', async function () {
          const initCode = instance.deployTransaction.data;
          const salt = ethers.randomBytes(32);

          await instance['__deploy(bytes,bytes32)'](initCode, salt);

          await expect(
            instance['__deploy(bytes,bytes32)'](initCode, salt),
          ).to.be.revertedWithCustomError(
            instance,
            'Factory__FailedDeployment',
          );
        });
      });
    });

    describe('#_calculateDeploymentAddress(bytes32,bytes32)', function () {
      it('returns address of not-yet-deployed contract', async function () {
        const initCode = instance.deployTransaction.data;
        const initCodeHash = ethers.keccak256(initCode);
        const salt = ethers.randomBytes(32);

        expect(
          await instance.__calculateDeploymentAddress.staticCall(
            initCodeHash,
            salt,
          ),
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
