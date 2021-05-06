const { expect } = require('chai');

const describeBehaviorOfMinimalProxyFactory = require('@solidstate/spec/factory/MinimalProxyFactory.behavior.js');

let deploy = async function () {
  let factory = await ethers.getContractFactory('MinimalProxyFactoryMock');
  let instance = await factory.deploy();
  return await instance.deployed();
};

describe('MinimalProxyFactory', function () {
  let instance;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfMinimalProxyFactory({ deploy: () => instance });

  describe('__internal', function () {
    describe('#_deployMinimalProxyContract', function () {
      describe('(address)', function () {
        it('deploys minimal proxy and returns deployment address', async function () {
          let address = await instance.callStatic['deployMinimalProxy(address)'](instance.address);
          expect(address).to.be.properAddress;

          // await instance.callStatic['deployMinimalProxy(address)'](instance.address);
          // let deployed = await ethers.getContractAt('MetamorphicFactory', address);
          // TODO: assert code at address is correct
        });
      });

      describe('(address,bytes32)', function () {
        it('deploys minimal proxy and returns deployment address', async function () {
          let salt = ethers.utils.randomBytes(32);

          let address = await instance.callStatic['deployMinimalProxy(address,bytes32)'](instance.address, salt);
          expect(address).to.be.properAddress;

          // await instance.callStatic['deployMinimalProxy(address,bytes32)'](instance.address, salt);
          // let deployed = await ethers.getContractAt('MetamorphicFactory', address);
          // TODO: assert code at address is correct
        });

        describe('reverts if', function () {
          it('salt has already been used', async function () {
            let salt = ethers.utils.randomBytes(32);

            await instance['deployMinimalProxy(address,bytes32)'](instance.address, salt);

            await expect(
              instance['deployMinimalProxy(address,bytes32)'](instance.address, salt)
            ).to.be.revertedWith(
              'Factory: failed deployment'
            );
          });
        });
      });
    });

    describe('#_calculateMinimalProxyDeploymentAddress', function () {
      it('returns address of not-yet-deployed contract', async function () {
        let target = instance.address;
        let initCode = await instance.callStatic.generateMinimalProxyInitCode(target);
        let initCodeHash = ethers.utils.keccak256(initCode);
        let salt = ethers.utils.randomBytes(32);

        expect(
          await instance.callStatic.calculateMinimalProxyDeploymentAddress(target, salt)
        ).to.equal(
          ethers.utils.getCreate2Address(instance.address, salt, initCodeHash)
        );
      });
    });

    describe('#_generateMinimalProxyInitCode', function () {
      it('returns packed encoding of initialization code prefix, target address, and initialization code suffix', async function () {
        let initCode = await instance.callStatic.generateMinimalProxyInitCode(instance.address);
        expect(
          initCode
        ).to.equal(
          '0x' + [
            '3d602d80600a3d3981f3363d3d373d3d3d363d73',
            instance.address.replace('0x', '').toLowerCase(),
            '5af43d82803e903d91602b57fd5bf3',
          ].join('')
        );
      });
    });
  });
});
