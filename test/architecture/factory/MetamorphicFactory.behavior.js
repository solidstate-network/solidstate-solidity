const { expect } = require('chai');

const { assertBehaviorOfFactory } = require('./Factory.behavior.js');

const assertBehaviorOfMetamorphicFactory = function (deploy, skips) {
  let instance;

  // eslint-disable-next-line mocha/no-top-level-hooks
  beforeEach(async function () {
    instance = await deploy();
  });

  assertBehaviorOfFactory(instance, skips);

  describe('::MetamorphicFactory', function () {
    describe('#getMetamorphicImplementation', function () {
      // behavior changes during internal call but cannot be tested independently
      it('returns zero address', async function () {
        expect(
          await instance.callStatic.getMetamorphicImplementation()
        ).to.equal(ethers.constants.AddressZero);
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = { assertBehaviorOfMetamorphicFactory };
