const { describeFilter } = require('../../../lib/mocha_describe_filter.js');

const describeBehaviorOfERC20Base = require('./ERC20Base.behavior.js');
const describeBehaviorOfERC20Extended = require('./ERC20Extended.behavior.js');
const describeBehaviorOfERC20Metadata = require('./ERC20Metadata.behavior.js');

const describeBehaviorOfERC20 = function ({ deploy, name, symbol, decimals, supply }, skips = []) {
  const describe = describeFilter(skips);

  describe('::ERC20', function () {
    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC20Base({ deploy, supply }, skips);
    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC20Extended({ deploy }, ['::ERC20Base', ...skips]);
    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC20Metadata({ deploy, name, symbol, decimals, supply }, ['::ERC20Base', ...skips]);
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC20;
