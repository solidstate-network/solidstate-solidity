const { describeBehaviorOfFactory } = require('./Factory.behavior.js');

const { describeFilter } = require('../../../lib/mocha_describe_filter.js');

const describeBehaviorOfCloneFactory = function (deploy, skips = []) {
  const describe = describeFilter(skips);

  describe('::CloneFactory', function () {
    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfFactory(deploy, skips);
  });
};

module.exports = { describeBehaviorOfCloneFactory };
