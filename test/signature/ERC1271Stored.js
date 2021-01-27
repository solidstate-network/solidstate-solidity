const { expect } = require('chai');

const describeBehaviorOfERC1271Stored = require('./ERC1271Stored.behavior.js');

let validParams = [ethers.utils.randomBytes(32), ethers.utils.randomBytes(0)];

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC1271StoredMock');
  let instance = await factory.deploy(...validParams);
  return await instance.deployed();
};

describe('ERC1271Stored', function () {
  let instance;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1271Stored({
    deploy: () => instance,
    getValidParams: () => validParams,
  });

  describe('__internal', function () {
    describe('#_isValidSignature', function () {
      it('returns true if signature is stored', async function () {
        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            ...validParams
          )
        ).to.be.true;
      });

      it('returns false if signature is not stored', async function () {
        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            ethers.utils.randomBytes(32),
            ethers.utils.randomBytes(0)
          )
        ).to.be.false;
      });
    });

    describe('#_setValidSignature', function () {
      it('sets signature validity', async function () {
        let hash = ethers.utils.randomBytes(32);
        let signature = ethers.utils.randomBytes(0);

        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            hash,
            signature
          )
        ).to.be.false;

        await instance['__setValidSignature(bytes32,bool)'](hash, true);

        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            hash,
            signature
          )
        ).to.be.true;

        await instance['__setValidSignature(bytes32,bool)'](hash, false);

        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            hash,
            signature
          )
        ).to.be.false;
      });
    });
  });
});
