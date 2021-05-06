const { expect } = require('chai');
const { deployMockContract } = require('@ethereum-waffle/mock-contract');

const describeBehaviorOfManagedProxy = require('@solidstate/spec/proxy/managed/ManagedProxy.behavior.js');

const deploy = async function () {
  const implementationFactory = await ethers.getContractFactory('Ownable');
  const implementationInstance = await implementationFactory.deploy();
  await implementationInstance.deployed();

  const manager = await deployMockContract(
    (await ethers.getSigners())[0],
    ['function getImplementation () external view returns (address)']
  );

  await manager.mock['getImplementation()'].returns(implementationInstance.address);

  const selector = manager.interface.getSighash('getImplementation()');

  const factory = await ethers.getContractFactory('ManagedProxyMock');
  const instance = await factory.deploy(
    manager.address,
    selector
  );
  return await instance.deployed();
};

describe('ManagedProxy', function () {
  let instance;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfManagedProxy({
    deploy: () => instance,
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

  describe('__internal', function () {
    describe('#_getImplementation', function () {
      it('returns implementation address', async function () {
        expect(
          await instance.callStatic['getImplementation()']()
        ).to.be.properAddress;
      });

      describe('reverts if', function () {
        it('manager is non-contract address', async function () {
          await instance.setManager(ethers.constants.AddressZero);

          await expect(
            instance.callStatic['getImplementation()']()
          ).to.be.reverted;
        });

        it('manager fails to return implementation', async function () {
          await instance.setManager(instance.address);

          await expect(
            instance.callStatic['getImplementation()']()
          ).to.be.revertedWith(
            'ManagedProxy: failed to fetch implementation'
          );
        });
      });
    });
  });
});
