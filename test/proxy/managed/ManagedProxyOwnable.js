const { expect } = require('chai');
const { deployMockContract } = require('@ethereum-waffle/mock-contract');

const describeBehaviorOfManagedProxyOwnable = require('@solidstate/spec/proxy/managed/ManagedProxyOwnable.behavior.js');

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

  const factory = await ethers.getContractFactory('ManagedProxyOwnableMock');
  const instance = await factory.deploy(manager.address, selector);
  return await instance.deployed();
};

describe('ManagedProxyOwnable', function () {
  let instance;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfManagedProxyOwnable({
    deploy: () => instance,
    implementationFunction: 'owner()',
    implementationFunctionArgs: [],
  });

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
