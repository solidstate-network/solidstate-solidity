const { expect } = require('chai');

const describeBehaviorOfERC1155Base = require('./ERC1155Base.behavior.js');

const { describeFilter } = require('@solidstate/library/mocha_describe_filter.js');

const describeBehaviorOfERC20Metadata = function ({ deploy }, skips) {
  const describe = describeFilter(skips);

  describe('::ERC1155Enumerable', function () {
    let instance;

    beforeEach(async function () {
      instance = await ethers.getContractAt('ERC20Metadata', (await deploy()).address);
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC1155Base({
      deploy: () => instance,
    }, skips);

    describe('#totalSupply', function () {
      it('returns supply of given token');
    });

    describe('#totalHolders', function () {
      it('returns number of holders of given token');
    });

    describe('#accountsByToken', function () {
      it('returns list of addresses holding given token');
    });

    describe('#tokensByAccount', function () {
      it('returns list of tokens held by given address');
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC20Metadata;
