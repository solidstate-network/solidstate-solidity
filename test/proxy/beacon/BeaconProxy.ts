import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfBeaconProxy } from '@solidstate/spec';
import {
  __hh_exposed_BeaconProxy,
  __hh_exposed_BeaconProxy__factory,
  __hh_exposed_Ownable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('BeaconProxy', () => {
  let beacon: any;
  let implementation: any;
  let instance: __hh_exposed_BeaconProxy;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    implementation = await new __hh_exposed_Ownable__factory(deployer).deploy();

    beacon = await deployMockContract((await ethers.getSigners())[0], [
      'function getImplementation () external view returns (address)',
    ]);

    await beacon.mock.getImplementation.returns(
      await implementation.getAddress(),
    );

    instance = await new __hh_exposed_BeaconProxy__factory(deployer).deploy();

    await instance.__hh_exposed__setBeacon(await beacon.getAddress());
  });

  describeBehaviorOfBeaconProxy(async () => instance, {
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('__internal', () => {
    describe('#_getImplementation()', () => {
      it('returns implementation address', async () => {
        expect(
          await instance.__hh_exposed__getImplementation.staticCall(),
        ).to.eq(await implementation.getAddress());
      });

      describe('reverts if', () => {
        it('beacon is non-contract address', async () => {
          await instance.__hh_exposed__setBeacon(ethers.ZeroAddress);

          await expect(instance.__hh_exposed__getImplementation.staticCall()).to
            .be.reverted;
        });
      });
    });
  });
});
