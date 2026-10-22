import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeBehaviorOfTransparentProxy } from '@solidstate/spec';
import {
  $SafeOwnable__factory,
  type $TransparentProxy,
  $TransparentProxy__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { network } from 'hardhat';

const connection = await network.create();

describe('TransparentProxy', () => {
  let proxyAdmin: HardhatEthersSigner;
  let nonProxyAdmin: HardhatEthersSigner;
  let instance: $TransparentProxy;

  before(async () => {
    [proxyAdmin, nonProxyAdmin] = await connection.ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await connection.ethers.getSigners();

    const implementationInstance = await new $SafeOwnable__factory(
      deployer,
    ).deploy();

    instance = await new $TransparentProxy__factory(deployer).deploy();

    await instance.$_setImplementation(
      await implementationInstance.getAddress(),
    );
    await instance.$_setProxyAdmin(await proxyAdmin.getAddress());
  });

  describeBehaviorOfTransparentProxy(connection, async () => instance, {
    getProxyAdmin: async () => proxyAdmin,
    getNonProxyAdmin: async () => nonProxyAdmin,
    implementationFunction: 'nomineeOwner()',
    implementationFunctionArgs: [],
  });

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

      expect(await instance.$_getImplementation.staticCall()).to.equal(address);
    });
  });
});
