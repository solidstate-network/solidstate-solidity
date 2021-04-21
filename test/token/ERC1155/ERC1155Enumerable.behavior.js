const { expect } = require('chai');

const describeBehaviorOfERC1155Base = require('./ERC1155Base.behavior.js');

const { describeFilter } = require('@solidstate/library/mocha_describe_filter.js');

const describeBehaviorOfERC1155Enumerable = function ({ deploy }, skips) {
  const describe = describeFilter(skips);

  describe('::ERC1155Enumerable', function () {
    let instance;

    beforeEach(async function () {
      instance = await ethers.getContractAt('ERC1155Enumerable', (await deploy()).address);
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC1155Base({
      deploy: () => instance,
    }, skips);

    describe('#totalSupply', function () {
      it.only('returns supply of given token', async function(){
        let id = ethers.constants.Zero;
        expect(await instance.callStatic.totalSupply(id)).to.equal(0);
      });
    });

    describe('#totalHolders', function () {
      it.only('returns number of holders of given token', async function(){
        let id = ethers.constants.Zero;
        expect(await instance.callStatic.totalHolders(id)).to.equal(0);
      });
    });

    describe('#accountsByToken', function () {
      it.only('returns list of addresses holding given token', async function(){
        let id = ethers.constants.Zero;
        expect(await instance.callStatic.accountsByToken(id)).to.eql([]);
      });
    });

    describe('#tokensByAccount', function () {
      it.only('returns list of tokens held by given address', async function(){
        let [account] = await ethers.getSigners();
        expect(await instance.callStatic.tokensByAccount(account.address)).to.eql([])
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC1155Enumerable;
