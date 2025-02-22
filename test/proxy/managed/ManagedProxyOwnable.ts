import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfManagedProxyOwnable } from '@solidstate/spec';
import {
  ManagedProxyOwnableMock,
  ManagedProxyOwnableMock__factory,
  OwnableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ManagedProxyOwnable', () => {
  let manager: any;
  let instance: ManagedProxyOwnableMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    manager = await deployMockContract((await ethers.getSigners())[0], [
      'function getImplementation () external view returns (address)',
    ]);

    const implementationInstance = await new OwnableMock__factory(
      deployer,
    ).deploy(deployer.address);

    await manager.mock.getImplementation.returns(
      await implementationInstance.getAddress(),
    );

    const selector = ethers.dataSlice(
      ethers.solidityPackedKeccak256(['string'], ['getImplementation()']),
      0,
      4,
    );

    instance = await new ManagedProxyOwnableMock__factory(deployer).deploy(
      manager.address,
      selector,
    );
  });

  describeBehaviorOfManagedProxyOwnable(async () => instance, {
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('__internal', () => {
    describe('#_getImplementation()', () => {
      it('returns implementation address');

      describe('reverts if', () => {
        it('manager is non-contract address', async () => {
          await instance.setOwner(ethers.ZeroAddress);

          await expect(instance.__getImplementation.staticCall()).to.be
            .reverted;
        });

        it('manager fails to return implementation', async () => {
          await manager.mock.getImplementation.revertsWithReason('ERROR');

          await expect(
            instance.__getImplementation.staticCall(),
          ).to.be.revertedWithCustomError(
            instance,
            'ManagedProxy__FetchImplementationFailed',
          );
        });
      });
    });

    describe('#_getManager()', () => {
      it('returns address of ERC173 owner', async () => {
        expect(await instance.__getManager.staticCall()).to.equal(
          await instance.getOwner.staticCall(),
        );
      });
    });
  });
});
