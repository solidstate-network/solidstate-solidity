import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfManagedProxy } from '@solidstate/spec';
import {
  ManagedProxyMock,
  ManagedProxyMock__factory,
  OwnableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ManagedProxy', () => {
  let manager: any;
  let instance: ManagedProxyMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    const implementationInstance = await new OwnableMock__factory(
      deployer,
    ).deploy(ethers.ZeroAddress);

    manager = await deployMockContract((await ethers.getSigners())[0], [
      'function getImplementation () external view returns (address)',
    ]);

    await manager.mock.getImplementation.returns(
      await implementationInstance.getAddress(),
    );

    const selector = ethers.dataSlice(
      ethers.solidityPackedKeccak256(['string'], ['getImplementation()']),
      0,
      4,
    );

    instance = await new ManagedProxyMock__factory(deployer).deploy(
      manager.address,
      selector,
    );
  });

  describeBehaviorOfManagedProxy(async () => instance, {
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('__internal', () => {
    describe('#_getImplementation()', () => {
      it('returns implementation address', async () => {
        expect(await instance.__getImplementation.staticCall()).to.be
          .properAddress;
      });

      describe('reverts if', () => {
        it('manager is non-contract address', async () => {
          await instance.setManager(ethers.ZeroAddress);

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
  });
});
