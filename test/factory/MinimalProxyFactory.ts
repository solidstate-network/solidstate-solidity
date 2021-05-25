import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeBehaviorOfMinimalProxyFactory } from '../../spec/factory/MinimalProxyFactory.behavior';
import {
  MinimalProxyFactoryMock,
  MinimalProxyFactoryMock__factory,
} from '../../typechain';

describe('MinimalProxyFactory', function () {
  let instance: MinimalProxyFactoryMock;

  const deploy = async () => {
    return new MinimalProxyFactoryMock__factory().deploy();
  };

  beforeEach(async function () {
    await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfMinimalProxyFactory({ deploy }, []);

  describe('__internal', function () {
    describe('#_deployMinimalProxyContract', function () {
      describe('(address)', function () {
        it('deploys minimal proxy and returns deployment address', async function () {
          const target = instance.address;

          const address = await instance.callStatic[
            'deployMinimalProxy(address)'
          ](target);
          expect(address).to.be.properAddress;

          await instance['deployMinimalProxy(address)'](target);

          expect(await ethers.provider.getCode(address)).to.equal(
            '0x' +
              [
                '363d3d373d3d3d363d73',
                target.replace('0x', '').toLowerCase(),
                '5af43d82803e903d91602b57fd5bf3',
              ].join(''),
          );
        });
      });

      describe('(address,bytes32)', function () {
        it('deploys minimal proxy and returns deployment address', async function () {
          const target = instance.address;
          const salt = ethers.utils.randomBytes(32);

          const address = await instance.callStatic[
            'deployMinimalProxy(address,bytes32)'
          ](target, salt);
          expect(address).to.be.properAddress;

          await instance['deployMinimalProxy(address,bytes32)'](target, salt);

          expect(await ethers.provider.getCode(address)).to.equal(
            '0x' +
              [
                '363d3d373d3d3d363d73',
                target.replace('0x', '').toLowerCase(),
                '5af43d82803e903d91602b57fd5bf3',
              ].join(''),
          );
        });

        describe('reverts if', function () {
          it('salt has already been used', async function () {
            const target = instance.address;
            const salt = ethers.utils.randomBytes(32);

            await instance['deployMinimalProxy(address,bytes32)'](target, salt);

            await expect(
              instance['deployMinimalProxy(address,bytes32)'](target, salt),
            ).to.be.revertedWith('Factory: failed deployment');
          });
        });
      });
    });

    describe('#_calculateMinimalProxyDeploymentAddress', function () {
      it('returns address of not-yet-deployed contract', async function () {
        const target = instance.address;
        const initCode = await instance.callStatic.generateMinimalProxyInitCode(
          target,
        );
        const initCodeHash = ethers.utils.keccak256(initCode);
        const salt = ethers.utils.randomBytes(32);

        expect(
          await instance.callStatic.calculateMinimalProxyDeploymentAddress(
            target,
            salt,
          ),
        ).to.equal(ethers.utils.getCreate2Address(target, salt, initCodeHash));
      });
    });

    describe('#_generateMinimalProxyInitCode', function () {
      it('returns packed encoding of initialization code prefix, target address, and initialization code suffix', async function () {
        const target = instance.address;
        const initCode = await instance.callStatic.generateMinimalProxyInitCode(
          target,
        );

        expect(initCode).to.equal(
          '0x' +
            [
              '3d602d80600a3d3981f3363d3d373d3d3d363d73',
              target.replace('0x', '').toLowerCase(),
              '5af43d82803e903d91602b57fd5bf3',
            ].join(''),
        );
      });
    });
  });
});
