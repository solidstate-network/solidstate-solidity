import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondBeaconProxy } from '@solidstate/spec';
import {
  $DiamondBeaconProxy,
  $DiamondBeaconProxy__factory,
  $Ownable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('DiamondBeaconProxy', () => {
  let beacon: any;
  let implementation: any;
  let instance: $DiamondBeaconProxy;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    implementation = await new $Ownable__factory(deployer).deploy();

    beacon = await deployMockContract((await ethers.getSigners())[0], [
      'function implementation (bytes4) external view returns (address)',
    ]);

    await beacon.mock.implementation.returns(await implementation.getAddress());

    instance = await new $DiamondBeaconProxy__factory(deployer).deploy();

    await instance.$_setBeacon(await beacon.getAddress());
  });

  describeBehaviorOfDiamondBeaconProxy(async () => instance, {
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('__internal', () => {
    describe('#_getImplementation()', () => {
      it('returns implementation address', async () => {
        expect(await instance['$_getImplementation()'].staticCall()).to.eq(
          await implementation.getAddress(),
        );
      });

      describe('reverts if', () => {
        it('beacon is non-contract address', async () => {
          await instance.$_setBeacon(ethers.ZeroAddress);

          await expect(instance['$_getImplementation()'].staticCall()).to.be
            .reverted;
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
          ).to.be.reverted;
        });
      });
    });
  });
});
