const { describeFilter } = require('../../lib/mocha_describe_filter.js');

// eslint-disable-next-line no-empty-pattern
const describeBehaviorOfFactory = function ({}, skips = []) {
  const describe = describeFilter(skips);

  describe('::Factory', function () {
    // no behavior
  });
};

module.exports = describeBehaviorOfFactory;
