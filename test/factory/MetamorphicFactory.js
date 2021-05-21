const { expect } = require('chai');

const describeBehaviorOfMetamorphicFactory = require('@solidstate/spec/factory/MetamorphicFactory.behavior.js');

describe('MetamorphicFactory', function () {
  let instance;

  beforeEach(async function () {
    const factory = await ethers.getContractFactory('MetamorphicFactoryMock');
    instance = await factory.deploy();
    await instance.deployed();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfMetamorphicFactory({ deploy: () => instance });

  describe('__internal', function () {
    describe('#_deployMetamorphicContract', function () {
      it('deploys metamorphic contract and returns deployment address', async function () {
        const target = instance.address;
        const salt = ethers.utils.randomBytes(32);

        const address = await instance.callStatic.deployMetamorphicContract(target, salt);
        expect(address).to.be.properAddress;

        await instance.deployMetamorphicContract(target, salt);

        expect(
          await ethers.provider.getCode(address)
        ).to.equal(
          await ethers.provider.getCode(target)
        );
      });

      describe('reverts if', function () {
        it('salt has already been used', async function () {
          const target = instance.address;
          const salt = ethers.utils.randomBytes(32);

          await instance.deployMetamorphicContract(target, salt);

          await expect(
            instance.deployMetamorphicContract(target, salt)
          ).to.be.revertedWith(
            'Factory: failed deployment'
          );
        });
      });
    });

    describe('#_calculateMetamorphicDeploymentAddress', function () {
      it('returns address of not-yet-deployed contract', async function () {
        const initCode = '0x5860208158601c335a639c2236038752fa158151803b80938091923cf3';
        const initCodeHash = ethers.utils.keccak256(initCode);
        const salt = ethers.utils.randomBytes(32);

        expect(
          await instance.callStatic.calculateMetamorphicDeploymentAddress(salt)
        ).to.equal(
          ethers.utils.getCreate2Address(instance.address, salt, initCodeHash)
        );
      });
    });
  });
});
