const describeBehaviorOfProxy = require('../Proxy.behavior.js');

const { describeFilter } = require('@solidstate/library/mocha_describe_filter.js');

const describeBehaviorOfManagedProxy = function ({ deploy, implementationFunction, implementationFunctionArgs }, skips) {
  const describe = describeFilter(skips);

  describe('::ManagedProxy', function () {
    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfProxy({
      deploy,
      implementationFunction,
      implementationFunctionArgs,
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfManagedProxy;
