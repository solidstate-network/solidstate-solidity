import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeBehaviorOfProxy } from '@solidstate/spec';
import {
  type $Ownable,
  $Ownable__factory,
  type $Proxy,
  $Proxy__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { network } from 'hardhat';

const connection = await network.create();

describe('Proxy', () => {
  let implementation: $Ownable;
  let instance: $Proxy;
  let deployer: HardhatEthersSigner;
  let admin: HardhatEthersSigner;
  let nonAdmin: HardhatEthersSigner;

  before(async () => {
    [deployer, admin, nonAdmin] = await connection.ethers.getSigners();
    implementation = await new $Ownable__factory(deployer).deploy();
  });

  beforeEach(async () => {
    instance = await new $Proxy__factory(deployer).deploy();
    await instance.$_setImplementation(await implementation.getAddress());
    await instance.$_setProxyAdmin(await admin.getAddress());
  });

  describeBehaviorOfProxy(connection, async () => instance, {
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('onlyProxyAdmin() modifier', () => {
    it('does not revert if sender is proxy admin', async () => {
      await expect(
        instance.connect(admin).$onlyProxyAdmin.staticCall(),
      ).not.to.revert(connection.ethers);
    });

    describe('reverts if', () => {
      it('sender is not proxy admin', async () => {
        await expect(
          instance.connect(nonAdmin).$onlyProxyAdmin.staticCall(),
        ).to.be.revertedWithCustomError(instance, 'Proxy__SenderIsNotAdmin');
      });
    });
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
