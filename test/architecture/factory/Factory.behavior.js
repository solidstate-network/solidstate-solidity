const { describeFilter } = require('../../../lib/mocha_describe_filter.js');

const describeBehaviorOfFactory = function (deploy, skips = []) {
  const describe = describeFilter(skips);

  describe('::Factory', function () {
    // no behavior
  });
};

module.exports = { describeBehaviorOfFactory };
