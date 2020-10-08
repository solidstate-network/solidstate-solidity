const { expect } = require('chai');

const { assertBehaviorOfFactory } = require('./Factory.js');

const assertBehaviorOfMetamorphicFactory = function (deploy, skips) {
  let instance;

  // eslint-disable-next-line mocha/no-top-level-hooks
  beforeEach(async function () {
    instance = await deploy();
  });

  assertBehaviorOfFactory(instance, skips);

  describe('::MetamorphicFactory', function () {
    describe('#getMetamorphicImplementation', function () {
      // behavior changes during internal call but cannot be tested independently
      it('returns zero address', async function () {
        expect(
          await instance.callStatic.getMetamorphicImplementation()
        ).to.equal(ethers.constants.AddressZero);
      });
    });
  });
};

module.exports = { assertBehaviorOfMetamorphicFactory };

let deploy = async function () {
  let factory = await ethers.getContractFactory('MetamorphicFactoryMock');
  let instance = await factory.deploy();
  await instance.deployed();
  return instance;
};

describe('MetamorphicFactory', function () {
  let instance;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  assertBehaviorOfMetamorphicFactory(deploy);

  describe('__internal', function () {
    describe('#_deployMetamorphicContract', function () {
      it('deploys metamorphic contract and returns deployment address', async function () {
        let salt = ethers.utils.randomBytes(32);

        let address = await instance.callStatic.deployMetamorphicContract(instance.address, salt);
        expect(address).to.be.properAddress;

        // await instance.callStatic.deployMetamorphicContract(instance.address, salt);
        // let deployed = await ethers.getContractAt('MetamorphicFactoryMock', address);
        // TODO: assert code at address is correct
      });

      describe('reverts if', function () {
        it('salt has already been used', async function () {
          let salt = ethers.utils.randomBytes(32);

          await instance.deployMetamorphicContract(instance.address, salt);

          await expect(
            instance.deployMetamorphicContract(instance.address, salt)
          ).to.be.revertedWith(
            'Factory: failed deployment'
          );
        });
      });
    });

    describe('#_calculateMetamorphicDeploymentAddress', function () {
      it('returns address of not-yet-deployed contract', async function () {
        let initCode = '0x5860208158601c335a639c2236038752fa158151803b80938091923cf3';
        let initCodeHash = ethers.utils.keccak256(initCode);
        let salt = ethers.utils.randomBytes(32);

        expect(
          await instance.callStatic.calculateMetamorphicDeploymentAddress(salt)
        ).to.equal(
          ethers.utils.getCreate2Address(instance.address, salt, initCodeHash)
        );
      });
    });
  });
});
