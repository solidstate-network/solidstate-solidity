const { expect } = require('chai');

const describeBehaviorOfMetamorphicFactory = require('./MetamorphicFactory.behavior.js');

let deploy = async function () {
  let factory = await ethers.getContractFactory('MetamorphicFactoryMock');
  let instance = await factory.deploy();
  return await instance.deployed();
};

describe('MetamorphicFactory', function () {
  let instance;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfMetamorphicFactory({ deploy: () => instance });

  describe('__internal', function () {
    describe('#_deployMetamorphicContract', function () {
      it('deploys metamorphic contract and returns deployment address', async function () {
        let salt = ethers.utils.randomBytes(32);

        let address = await instance.callStatic.deployMetamorphicContract(instance.address, salt);
        expect(address).to.be.properAddress;

        // await instance.callStatic.deployMetamorphicContract(instance.address, salt);
        // let deployed = await ethers.getContractAt('MetamorphicFactory', address);
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
