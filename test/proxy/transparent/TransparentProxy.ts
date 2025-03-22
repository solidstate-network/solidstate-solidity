import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfTransparentProxy } from '@solidstate/spec';
import {
  $SafeOwnable__factory,
  $TransparentProxy,
  $TransparentProxy__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('TransparentProxy', () => {
  let proxyAdmin: SignerWithAddress;
  let nonProxyAdmin: SignerWithAddress;
  let instance: $TransparentProxy;

  before(async () => {
    [proxyAdmin, nonProxyAdmin] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    const implementationInstance = await new $SafeOwnable__factory(
      deployer,
    ).deploy();

    instance = await new $TransparentProxy__factory(deployer).deploy();

    await instance.$_setImplementation(
      await implementationInstance.getAddress(),
    );
    await instance.$_setAdmin(await proxyAdmin.getAddress());
  });

  describeBehaviorOfTransparentProxy(async () => instance, {
    getProxyAdmin: async () => proxyAdmin,
    getNonProxyAdmin: async () => nonProxyAdmin,
    implementationFunction: 'nomineeOwner()',
    implementationFunctionArgs: [],
  });

  describe('__internal', () => {
    describe('#_getImplementation()', () => {
      it('returns implementation address', async () => {
        expect(await instance.$_getImplementation.staticCall()).to.be
          .properAddress;
      });
    });

    describe('#_setImplementation(address)', () => {
      it('updates implementation address', async () => {
        const address = await instance.getAddress();

        expect(await instance.$_getImplementation.staticCall()).not.to.equal(
          address,
        );

        await instance.$_setImplementation(address);

        expect(await instance.$_getImplementation.staticCall()).to.equal(
          address,
        );
      });
    });
  });
});
