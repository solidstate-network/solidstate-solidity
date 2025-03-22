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
  let beacon: any;
  let implementation: any;
  let instance: $BeaconProxy;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    implementation = await new $Ownable__factory(deployer).deploy();

    beacon = await deployMockContract((await ethers.getSigners())[0], [
      'function implementation () external view returns (address)',
    ]);

    await beacon.mock.implementation.returns(await implementation.getAddress());

    instance = await new $BeaconProxy__factory(deployer).deploy();

    await instance.$_setBeacon(await beacon.getAddress());
  });

  describeBehaviorOfBeaconProxy(async () => instance, {
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('__internal', () => {
    describe('#_getImplementation()', () => {
      it('returns implementation address', async () => {
        expect(await instance.$_getImplementation.staticCall()).to.eq(
          await implementation.getAddress(),
        );
      });

      describe('reverts if', () => {
        it('beacon is non-contract address', async () => {
          await instance.$_setBeacon(ethers.ZeroAddress);

          await expect(instance.$_getImplementation.staticCall()).to.be
            .reverted;
        });
      });
    });
  });
});
