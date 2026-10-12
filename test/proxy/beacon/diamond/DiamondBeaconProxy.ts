import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondBeaconProxy } from '@solidstate/spec';
import {
  type $DiamondBeaconProxy,
  $DiamondBeaconProxy__factory,
  $Ownable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import { network } from 'hardhat';

const connection = await network.create();

describe('DiamondBeaconProxy', () => {
  let proxyAdmin: HardhatEthersSigner;
  let nonProxyAdmin: HardhatEthersSigner;
  let beacon: any;
  let implementation: any;
  let instance: $DiamondBeaconProxy;

  before(async () => {
    [proxyAdmin, nonProxyAdmin] = await connection.ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await connection.ethers.getSigners();

    implementation = await new $Ownable__factory(deployer).deploy();

    beacon = await deployMockContract(
      (await connection.ethers.getSigners())[0],
      ['function implementation (bytes4) external view returns (address)'],
    );

    await beacon.mock.implementation.returns(await implementation.getAddress());

    instance = await new $DiamondBeaconProxy__factory(deployer).deploy();

    await instance.$_setProxyAdmin(await proxyAdmin.getAddress());
    await instance.$_setBeacon(await beacon.getAddress());
  });

  describeBehaviorOfDiamondBeaconProxy(connection, async () => instance, {
    getProxyAdmin: async () => proxyAdmin,
    getNonProxyAdmin: async () => nonProxyAdmin,
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('#_getImplementation()', () => {
    it('returns implementation address', async () => {
      expect(await instance['$_getImplementation()'].staticCall()).to.eq(
        await implementation.getAddress(),
      );
    });

    describe('reverts if', () => {
      it('beacon is non-contract address', async () => {
        await instance.$_setBeacon(ethers.ZeroAddress);

        await expect(instance['$_getImplementation()'].staticCall()).to.revert(
          connection.ethers,
        );
      });
    });
  });

  describe('#_getImplementation(bytes4)', () => {
    it('returns implementation address', async () => {
      expect(
        await instance['$_getImplementation(bytes4)'].staticCall(
          ethers.randomBytes(4),
        ),
      ).to.eq(await implementation.getAddress());
    });

    describe('reverts if', () => {
      it('beacon is non-contract address', async () => {
        await instance.$_setBeacon(ethers.ZeroAddress);

        await expect(
          instance['$_getImplementation(bytes4)'].staticCall(
            ethers.randomBytes(4),
          ),
        ).to.revert(connection.ethers);
      });
    });
  });
});
