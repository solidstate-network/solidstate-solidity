import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfBeaconProxyOwnable } from '@solidstate/spec';
import {
  BeaconProxyOwnableMock,
  BeaconProxyOwnableMock__factory,
  OwnableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('BeaconProxyOwnable', () => {
  let beacon: any;
  let instance: BeaconProxyOwnableMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    beacon = await deployMockContract((await ethers.getSigners())[0], [
      'function getImplementation () external view returns (address)',
    ]);

    const implementationInstance = await new OwnableMock__factory(
      deployer,
    ).deploy(deployer.address);

    await beacon.mock.getImplementation.returns(
      await implementationInstance.getAddress(),
    );

    const selector = ethers.dataSlice(
      ethers.solidityPackedKeccak256(['string'], ['getImplementation()']),
      0,
      4,
    );

    instance = await new BeaconProxyOwnableMock__factory(deployer).deploy(
      beacon.address,
      selector,
    );
  });

  describeBehaviorOfBeaconProxyOwnable(async () => instance, {
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('__internal', () => {
    describe('#_getImplementation()', () => {
      it('returns implementation address');

      describe('reverts if', () => {
        it('beacon is non-contract address', async () => {
          await instance.setOwner(ethers.ZeroAddress);

          await expect(instance.__getImplementation.staticCall()).to.be
            .reverted;
        });

        it('beacon fails to return implementation', async () => {
          await beacon.mock.getImplementation.revertsWithReason('ERROR');

          await expect(
            instance.__getImplementation.staticCall(),
          ).to.be.revertedWithCustomError(
            instance,
            'BeaconProxy__FetchImplementationFailed',
          );
        });
      });
    });

    describe('#_getBeacon()', () => {
      it('returns address of ERC173 owner', async () => {
        expect(await instance.__getBeacon.staticCall()).to.equal(
          await instance.getOwner.staticCall(),
        );
      });
    });
  });
});
