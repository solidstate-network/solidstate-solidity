const describeBehaviorOfManagedProxy = require('./ManagedProxy.behavior.js');

const { describeFilter } = require('@solidstate/library/mocha_describe_filter.js');

const describeBehaviorOfManagedProxyOwnable = function ({ deploy, implementationFunction, implementationFunctionArgs }, skips) {
  const describe = describeFilter(skips);

  describe('::ManagedProxyOwnable', function () {
    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfManagedProxy({
      deploy,
      implementationFunction,
      implementationFunctionArgs,
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfManagedProxyOwnable;
