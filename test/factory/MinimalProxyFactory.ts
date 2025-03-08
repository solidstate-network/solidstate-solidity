import {
  __hh_exposed_MinimalProxyFactory,
  __hh_exposed_MinimalProxyFactory__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MinimalProxyFactory', () => {
  let instance: __hh_exposed_MinimalProxyFactory;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_MinimalProxyFactory__factory(
      deployer,
    ).deploy();
  });

  describe('__internal', () => {
    describe('#deployMinimalProxy(address)', () => {
      it('deploys minimal proxy and returns deployment address', async () => {
        const target = await instance.getAddress();

        const address =
          await instance['__hh_exposed_deployMinimalProxy(address)'].staticCall(
            target,
          );
        expect(address).to.be.properAddress;

        await instance['__hh_exposed_deployMinimalProxy(address)'](target);

        expect(await ethers.provider.getCode(address)).to.equal(
          '0x' +
            [
              '363d3d373d3d3d363d73',
              target.replace('0x', '').toLowerCase(),
              '5af43d82803e903d91602b57fd5bf3',
            ].join(''),
        );
      });

      describe('reverts if', () => {
        it('contract creation fails');
      });
    });

    describe('#deployMinimalProxy(address,bytes32)', () => {
      it('deploys minimal proxy and returns deployment address', async () => {
        const target = await instance.getAddress();
        const salt = ethers.randomBytes(32);

        const address = await instance[
          '__hh_exposed_deployMinimalProxy(address,bytes32)'
        ].staticCall(target, salt);
        expect(address).to.be.properAddress;

        await instance['__hh_exposed_deployMinimalProxy(address,bytes32)'](
          target,
          salt,
        );

        expect(await ethers.provider.getCode(address)).to.equal(
          '0x' +
            [
              '363d3d373d3d3d363d73',
              target.replace('0x', '').toLowerCase(),
              '5af43d82803e903d91602b57fd5bf3',
            ].join(''),
        );
      });

      describe('reverts if', () => {
        it('contract creation fails');

        it('salt has already been used', async () => {
          const target = await instance.getAddress();
          const salt = ethers.randomBytes(32);

          await instance['__hh_exposed_deployMinimalProxy(address,bytes32)'](
            target,
            salt,
          );

          await expect(
            instance['__hh_exposed_deployMinimalProxy(address,bytes32)'](
              target,
              salt,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'Factory__FailedDeployment',
          );
        });
      });
    });

    describe('#calculateMinimalProxyDeploymentAddress(address,bytes32)', () => {
      it('returns address of not-yet-deployed contract', async () => {
        const target = await instance.getAddress();
        const initCode =
          await instance.__hh_exposed_generateMinimalProxyInitCode.staticCall(
            target,
          );
        const initCodeHash = ethers.keccak256(initCode);
        const salt = ethers.randomBytes(32);

        expect(
          await instance.__hh_exposed_calculateMinimalProxyDeploymentAddress.staticCall(
            target,
            salt,
          ),
        ).to.equal(ethers.getCreate2Address(target, salt, initCodeHash));
      });
    });

    describe('#generateMinimalProxyInitCode(address)', () => {
      it('returns packed encoding of initialization code prefix, target address, and initialization code suffix', async () => {
        const target = await instance.getAddress();
        const initCode =
          await instance.__hh_exposed_generateMinimalProxyInitCode.staticCall(
            target,
          );

        expect(initCode).to.equal(
          '0x' +
            [
              '3d602d80600a3d3981f3363d3d373d3d3d363d73',
              target.replace('0x', '').toLowerCase(),
              '5af43d82803e903d91602b57fd5bf3',
            ].join(''),
        );
      });
    });
  });
});
