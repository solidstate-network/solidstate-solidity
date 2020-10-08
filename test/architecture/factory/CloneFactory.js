const { expect } = require('chai');

const { assertBehaviorOfFactory } = require('./Factory.js');

const assertBehaviorOfCloneFactory = function (instance, skips) {
  assertBehaviorOfFactory(instance, skips);
};

module.exports = { assertBehaviorOfCloneFactory };

let deploy = async function () {
  let factory = await ethers.getContractFactory('CloneFactoryMock');
  let instance = await factory.deploy();
  await instance.deployed();
  return instance;
};

describe('CloneFactory', function () {
  let instance;

  beforeEach(async function () {
    instance = await deploy();
  });

  before(function () {
    assertBehaviorOfCloneFactory(deploy);
  });

  describe('__internal', function () {
    describe('#_clone', function () {
      describe('()', function () {
        it('deploys clone and returns deployment address', async function () {
          let address = await instance.callStatic['deployClone()']();
          expect(address).to.be.properAddress;

          // await instance.callStatic['deployClone(bytes32)'](salt);
          // let deployed = await ethers.getContractAt('MetamorphicFactoryMock', address);
          // TODO: assert code at address is correct
        });
      });

      describe('(bytes32)', function () {
        it('deploys clone and returns deployment address', async function () {
          let salt = ethers.utils.randomBytes(32);

          let address = await instance.callStatic['deployClone(bytes32)'](salt);
          expect(address).to.be.properAddress;

          // await instance.callStatic['deployClone(bytes32)'](salt);
          // let deployed = await ethers.getContractAt('MetamorphicFactoryMock', address);
          // TODO: assert code at address is correct
        });

        describe('reverts if', function () {
          it('salt has already been used', async function () {
            let salt = ethers.utils.randomBytes(32);

            await instance['deployClone(bytes32)'](salt);

            await expect(
              instance['deployClone(bytes32)'](salt)
            ).to.be.revertedWith(
              'Factory: failed deployment'
            );
          });
        });
      });
    });

    describe('#_calculateCloneDeploymentAddress', function () {
      it('returns address of not-yet-deployed contract', async function () {
        let initCode = '0x58333b90818180333cf3';
        let initCodeHash = ethers.utils.keccak256(initCode);
        let salt = ethers.utils.randomBytes(32);

        expect(
          await instance.callStatic.calculateCloneDeploymentAddress(salt)
        ).to.equal(
          ethers.utils.getCreate2Address(instance.address, salt, initCodeHash)
        );
      });
    });
  });
});
