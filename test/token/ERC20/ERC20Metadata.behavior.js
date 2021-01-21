const { expect } = require('chai');

const describeBehaviorOfERC20Base = require('./ERC20Base.behavior.js');

const { describeFilter } = require('../../../lib/mocha_describe_filter.js');

const describeBehaviorOfERC20Metadata = function ({ deploy, name, symbol, decimals, supply }, skips = []) {
  const describe = describeFilter(skips);

  describe('::ERC20Metadata', function () {
    let instance;

    beforeEach(async function () {
      instance = await ethers.getContractAt('ERC20Metadata', (await deploy()).address);
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC20Base({ deploy: () => instance, supply }, skips);

    describe('#name', function () {
      it('returns token name', async function () {
        expect(await instance.callStatic.name()).to.equal(name);
      });
    });

    describe('#symbol', function () {
      it('returns token symbol', async function () {
        expect(await instance.callStatic.symbol()).to.equal(symbol);
      });
    });

    describe('#decimals', function () {
      it('returns token decimals', async function () {
        expect(await instance.callStatic.decimals()).to.equal(decimals);
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC20Metadata;
