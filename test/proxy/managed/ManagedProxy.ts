import {
  MockContract,
  deployMockContract,
} from '@ethereum-waffle/mock-contract';
import { describeBehaviorOfManagedProxy } from '@solidstate/spec';
import {
  ManagedProxyMock,
  ManagedProxyMock__factory,
  OwnableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ManagedProxy', function () {
  let manager: MockContract;
  let instance: ManagedProxyMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();

    const implementationInstance = await new OwnableMock__factory(
      deployer,
    ).deploy(ethers.ZeroAddress);

    manager = await deployMockContract((await ethers.getSigners())[0], [
      'function getImplementation () external view returns (address)',
    ]);

    await manager.mock['getImplementation()'].returns(
      await implementationInstance.getAddress(),
    );

    const { selector } = manager.interface.getFunction('getImplementation()');

    instance = await new ManagedProxyMock__factory(deployer).deploy(
      manager.address,
      selector,
    );
  });

  describeBehaviorOfManagedProxy(async () => instance, {
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('__internal', function () {
    describe('#_getImplementation()', function () {
      it('returns implementation address', async function () {
        expect(await instance.__getImplementation.staticCall()).to.be
          .properAddress;
      });

      describe('reverts if', function () {
        it('manager is non-contract address', async function () {
          await instance.setManager(ethers.ZeroAddress);

          await expect(instance.__getImplementation.staticCall()).to.be
            .reverted;
        });

        it('manager fails to return implementation', async function () {
          await manager.mock['getImplementation()'].revertsWithReason('ERROR');

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
