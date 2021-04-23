const { expect } = require('chai');

const describeBehaviorOfERC1155Base = require('./ERC1155Base.behavior.js');

const { describeFilter } = require('@solidstate/library/mocha_describe_filter.js');

const describeBehaviorOfERC1155Enumerable = function ({ deploy }, skips) {
  const describe = describeFilter(skips);

  describe('::ERC1155Enumerable', function () {
    let instance;

    beforeEach(async function () {
      instance = await ethers.getContractAt('ERC1155EnumerableMock', (await deploy()).address);
      const [signer] = await ethers.getSigners();
      const id = ethers.constants.Zero;
      const amount = ethers.constants.Two;
      instance.mint(signer.address, id, amount, ethers.utils.randomBytes(0));
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC1155Base({
      deploy: () => instance,
    }, skips);

    describe('#totalSupply', function () {
      it('returns supply of given token', async function(){
        let id = ethers.constants.Zero;
        expect(await instance.callStatic.totalSupply(id)).to.equal(2);
      });
    });

    describe('#totalHolders', function () {
      it('returns number of holders of given token', async function(){
        let id = ethers.constants.Zero;
        expect(await instance.callStatic.totalHolders(id)).to.equal(1);
      });
    });

    describe('#accountsByToken', function () {
      it('returns list of addresses holding given token', async function(){
        let id = ethers.constants.Zero;
        const [signer] = await ethers.getSigners();
        expect(await instance.callStatic.accountsByToken(id)).to.eql([signer.address]);
      });
    });

    describe('#tokensByAccount', function () {
      it('returns list of tokens held by given address', async function(){
        let [account] = await ethers.getSigners();
        const token = ethers.constants.Zero;
        expect(await instance.callStatic.tokensByAccount(account.address)).to.eql([token])
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC1155Enumerable;
