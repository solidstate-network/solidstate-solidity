import { expect } from 'chai';
import { ethers } from 'hardhat';
import { deployMockContract } from 'ethereum-waffle';
import { describeBehaviorOfManagedProxyOwnable } from '../../../spec/proxy/managed/ManagedProxyOwnable.behavior';
import {
  ManagedProxyOwnableMock,
  ManagedProxyOwnableMock__factory,
} from '../../../typechain';

const deploy = async function () {
  const implementationFactory = await ethers.getContractFactory('Ownable');
  const implementationInstance = await implementationFactory.deploy();
  await implementationInstance.deployed();

  const manager = await deployMockContract((await ethers.getSigners())[0], [
    'function getImplementation () external view returns (address)',
  ]);

  await manager.mock['getImplementation()'].returns(
    implementationInstance.address,
  );

  const selector = manager.interface.getSighash('getImplementation()');

  return new ManagedProxyOwnableMock__factory().deploy(
    manager.address,
    selector,
  );
};

describe('ManagedProxyOwnable', function () {
  let instance: ManagedProxyOwnableMock;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfManagedProxyOwnable(
    {
      deploy: async () => instance,
      implementationFunction: 'owner()',
      implementationFunctionArgs: [],
    },
    [],
  );

  describe('__internal', function () {
    describe('#_getImplementation', function () {
      it('returns implementation address');

      describe('reverts if', function () {
        it('manager is non-contract address', async function () {
          await instance.setOwner(ethers.constants.AddressZero);

          await expect(instance.callStatic['getImplementation()']()).to.be
            .reverted;
        });

        it('manager fails to return implementation', async function () {
          await instance.setOwner(instance.address);

          await expect(
            instance.callStatic['getImplementation()'](),
          ).to.be.revertedWith('ManagedProxy: failed to fetch implementation');
        });
      });
    });

    describe('#_getManager', function () {
      it('returns address of ERC173 owner', async function () {
        expect(await instance.callStatic.getManager()).to.equal(
          await instance.callStatic.owner(),
        );
      });
    });
  });
});
