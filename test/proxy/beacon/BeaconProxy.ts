import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfBeaconProxy } from '@solidstate/spec';
import {
  type $BeaconProxy,
  $BeaconProxy__factory,
  $Ownable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import { network } from 'hardhat';

const connection = await network.create();

describe('BeaconProxy', () => {
  let proxyAdmin: HardhatEthersSigner;
  let nonProxyAdmin: HardhatEthersSigner;
  let beacon: any;
  let implementation: any;
  let instance: $BeaconProxy;

  before(async () => {
    [proxyAdmin, nonProxyAdmin] = await connection.ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await connection.ethers.getSigners();

    implementation = await new $Ownable__factory(deployer).deploy();

    beacon = await deployMockContract(
      (await connection.ethers.getSigners())[0],
      ['function implementation () external view returns (address)'],
    );

    await beacon.mock.implementation.returns(await implementation.getAddress());

    instance = await new $BeaconProxy__factory(deployer).deploy();

    await instance.$_setProxyAdmin(await proxyAdmin.getAddress());
    await instance.$_setBeacon(await beacon.getAddress());
  });

  describeBehaviorOfBeaconProxy(connection, async () => instance, {
    getProxyAdmin: async () => proxyAdmin,
    getNonProxyAdmin: async () => nonProxyAdmin,
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('#_getImplementation()', () => {
    it('returns implementation address', async () => {
      expect(await instance.$_getImplementation.staticCall()).to.eq(
        await implementation.getAddress(),
      );
    });

    describe('reverts if', () => {
      it('beacon is non-contract address', async () => {
        await instance.$_setBeacon(ethers.ZeroAddress);

        await expect(instance.$_getImplementation.staticCall()).to.revert(
          connection.ethers,
        );
      });
    });
  });

  describe('#_setBeacon(address)', () => {
    it('updates implementation address', async () => {
      const address = await instance.getAddress();

      expect(await instance.$_getBeacon.staticCall()).not.to.equal(address);

      await instance.$_setBeacon(address);

      expect(await instance.$_getBeacon.staticCall()).to.equal(address);
    });
  });
});
