const { expect } = require('chai');

const describeBehaviorOfERC1271Ownable = require('./ERC1271Ownable.behavior.js');

let getOwner = async function () {
  let [signer] = await ethers.getSigners();
  return signer;
};

let getNonOwner = async function () {
  let [, signer] = await ethers.getSigners();
  return signer;
};

let deploy = async function () {
  let factory = await ethers.getContractFactory('ERC1271OwnableMock');
  let instance = await factory.deploy((await getOwner()).address);
  return await instance.deployed();
};

describe('ERC1271Ownable', function () {
  let owner;
  let nonOwner;
  let instance;

  beforeEach(async function () {
    owner = await getOwner();
    nonOwner = await getNonOwner();
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1271Ownable({
    deploy: () => instance,
    getOwner: () => owner,
    getNonOwner: () => nonOwner,
  });

  describe('__internal', function () {
    describe('#_isValidSignature', function () {
      it('returns true for signature created by owner', async function () {
        let hash = ethers.utils.randomBytes(32);
        let signature = await owner.signMessage(ethers.utils.arrayify(hash));

        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            hash, signature
          )
        ).to.be.true;
      });

      it('returns false for signature created by non-owner', async function () {
        let hash = ethers.utils.randomBytes(32);
        let signature = await nonOwner.signMessage(ethers.utils.arrayify(hash));

        expect(
          await instance.callStatic['__isValidSignature(bytes32,bytes)'](
            hash, signature
          )
        ).to.be.false;
      });
    });
  });
});
