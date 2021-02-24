const describeBehaviorOfFactory = require('./Factory.behavior.js');

const { describeFilter } = require('@solidstate/library/mocha_describe_filter.js');

// eslint-disable-next-line no-empty-pattern
const describeBehaviorOfCloneFactory = function ({}, skips) {
  const describe = describeFilter(skips);

  describe('::CloneFactory', function () {
    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfFactory({}, skips);
  });
};

module.exports = describeBehaviorOfCloneFactory;
