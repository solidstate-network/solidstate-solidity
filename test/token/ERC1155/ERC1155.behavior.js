const { describeFilter } = require('@solidstate/library/mocha_describe_filter.js');

const describeBehaviorOfERC1155Base = require('./ERC1155Base.behavior.js');

const describeBehaviorOfERC1155 = function ({ deploy }, skips) {
  const describe = describeFilter(skips);

  describe('::ERC1155', function () {
    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC1155Base({ deploy }, skips);
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC1155;
