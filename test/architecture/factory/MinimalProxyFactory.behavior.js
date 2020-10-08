const { assertBehaviorOfFactory } = require('./Factory.behavior.js');

const assertBehaviorOfMinimalProxyFactory = function (instance, skips) {
  assertBehaviorOfFactory(instance, skips);
};

module.exports = { assertBehaviorOfMinimalProxyFactory };
