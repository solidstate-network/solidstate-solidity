import {
  __hh_exposed_Factory,
  __hh_exposed_Factory__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Factory', () => {
  let instance: __hh_exposed_Factory;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_Factory__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#deploy(bytes)', () => {
      it('deploys bytecode and returns deployment address', async () => {
        const { data: initCode } = instance.deploymentTransaction()!;

        const address =
          await instance['__hh_exposed_deploy(bytes)'].staticCall(initCode);
        expect(address).to.be.properAddress;

        await instance['__hh_exposed_deploy(bytes)'](initCode);

        expect(await ethers.provider.getCode(address)).to.equal(
          await ethers.provider.getCode(await instance.getAddress()),
        );
      });

      describe('reverts if', () => {
        it('contract creation fails', async () => {
          const initCode = '0xfe';

          await expect(
            instance['__hh_exposed_deploy(bytes)'](initCode),
          ).to.be.revertedWithCustomError(
            instance,
            'Factory__FailedDeployment',
          );
        });
      });
    });

    describe('#deploy(bytes,bytes32)', () => {
      it('deploys bytecode and returns deployment address', async () => {
        const { data: initCode } = instance.deploymentTransaction()!;
        const initCodeHash = ethers.keccak256(initCode);
        const salt = ethers.randomBytes(32);

        const address = await instance[
          '__hh_exposed_deploy(bytes,bytes32)'
        ].staticCall(initCode, salt);
        expect(address).to.equal(
          await instance.__hh_exposed_calculateDeploymentAddress.staticCall(
            initCodeHash,
            salt,
          ),
        );

        await instance['__hh_exposed_deploy(bytes,bytes32)'](initCode, salt);

        expect(await ethers.provider.getCode(address)).to.equal(
          await ethers.provider.getCode(await instance.getAddress()),
        );
      });

      describe('reverts if', () => {
        it('contract creation fails', async () => {
          const initCode = '0xfe';
          const salt = ethers.randomBytes(32);

          await expect(
            instance['__hh_exposed_deploy(bytes,bytes32)'](initCode, salt),
          ).to.be.revertedWithCustomError(
            instance,
            'Factory__FailedDeployment',
          );
        });

        it('salt has already been used', async () => {
          const { data: initCode } = instance.deploymentTransaction()!;
          const salt = ethers.randomBytes(32);

          await instance['__hh_exposed_deploy(bytes,bytes32)'](initCode, salt);

          await expect(
            instance['__hh_exposed_deploy(bytes,bytes32)'](initCode, salt),
          ).to.be.revertedWithCustomError(
            instance,
            'Factory__FailedDeployment',
          );
        });
      });
    });

    describe('#calculateDeploymentAddress(bytes32,bytes32)', () => {
      it('returns address of not-yet-deployed contract', async () => {
        const { data: initCode } = instance.deploymentTransaction()!;
        const initCodeHash = ethers.keccak256(initCode);
        const salt = ethers.randomBytes(32);

        expect(
          await instance.__hh_exposed_calculateDeploymentAddress.staticCall(
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
