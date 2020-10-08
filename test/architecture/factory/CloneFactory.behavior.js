const { assertBehaviorOfFactory } = require('./Factory.behavior.js');

const assertBehaviorOfCloneFactory = function (instance, skips) {
  assertBehaviorOfFactory(instance, skips);
};

module.exports = { assertBehaviorOfCloneFactory };
