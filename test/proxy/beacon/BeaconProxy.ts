import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfBeaconProxy } from '@solidstate/spec';
import {
  $BeaconProxy,
  $BeaconProxy__factory,
  $Ownable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('BeaconProxy', () => {
  let proxyAdmin: SignerWithAddress;
  let nonProxyAdmin: SignerWithAddress;
  let beacon: any;
  let implementation: any;
  let instance: $BeaconProxy;

  before(async () => {
    [proxyAdmin, nonProxyAdmin] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    implementation = await new $Ownable__factory(deployer).deploy();

    beacon = await deployMockContract((await ethers.getSigners())[0], [
      'function implementation () external view returns (address)',
    ]);

    await beacon.mock.implementation.returns(await implementation.getAddress());

    instance = await new $BeaconProxy__factory(deployer).deploy();

    await instance.$_setProxyAdmin(await proxyAdmin.getAddress());
    await instance.$_setBeacon(await beacon.getAddress());
  });

  describeBehaviorOfBeaconProxy(async () => instance, {
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

        await expect(instance.$_getImplementation.staticCall()).to.be.reverted;
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
