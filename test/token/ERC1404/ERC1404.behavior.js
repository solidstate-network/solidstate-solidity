const describeBehaviorOfERC20 = require('../ERC20/ERC20.behavior.js');
const describeBehaviorOfERC1404Base = require('./ERC1404Base.behavior.js');

const { describeFilter } = require('../../../lib/mocha_describe_filter.js');

const describeBehaviorOfERC1404 = function ({ deploy, restrictions, name, symbol, decimals, supply }, skips) {
  const describe = describeFilter(skips);

  describe('::ERC1404', function () {
    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC20({
      deploy,
      name,
      symbol,
      decimals,
      supply,
    }, skips);

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC1404Base({
      deploy,
      restrictions,
      supply,
    }, ['::ERC20Base', ...skips]);
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC1404;
