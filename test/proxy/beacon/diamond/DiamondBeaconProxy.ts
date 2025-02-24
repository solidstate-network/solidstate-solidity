import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfDiamondBeaconProxy } from '@solidstate/spec';
import {
  DiamondBeaconProxyMock,
  DiamondBeaconProxyMock__factory,
  OwnableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('DiamondBeaconProxy', () => {
  let beacon: any;
  let implementation: any;
  let instance: DiamondBeaconProxyMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    implementation = await new OwnableMock__factory(deployer).deploy(
      ethers.ZeroAddress,
    );

    beacon = await deployMockContract((await ethers.getSigners())[0], [
      'function facetAddress (bytes4) external view returns (address)',
    ]);

    await beacon.mock.facetAddress.returns(await implementation.getAddress());

    instance = await new DiamondBeaconProxyMock__factory(deployer).deploy(
      beacon.address,
    );
  });

  describeBehaviorOfDiamondBeaconProxy(async () => instance, {
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('__internal', () => {
    describe('#_getImplementation()', () => {
      it('returns implementation address', async () => {
        expect(await instance['__getImplementation()'].staticCall()).to.eq(
          await implementation.getAddress(),
        );
      });

      describe('reverts if', () => {
        it('beacon is non-contract address', async () => {
          await instance.setBeacon(ethers.ZeroAddress);

          await expect(instance['__getImplementation()'].staticCall()).to.be
            .reverted;
        });
      });
    });

    describe('#_getImplementation(bytes4)', () => {
      it('returns implementation address', async () => {
        expect(
          await instance['__getImplementation(bytes4)'].staticCall(
            ethers.randomBytes(4),
          ),
        ).to.eq(await implementation.getAddress());
      });

      describe('reverts if', () => {
        it('beacon is non-contract address', async () => {
          await instance.setBeacon(ethers.ZeroAddress);

          await expect(
            instance['__getImplementation(bytes4)'].staticCall(
              ethers.randomBytes(4),
            ),
          ).to.be.reverted;
        });
      });
    });
  });
});
