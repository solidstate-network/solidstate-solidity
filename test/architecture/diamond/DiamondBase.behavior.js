const { expect } = require('chai');

const { describeFilter } = require('../../../lib/mocha_describe_filter.js');

const describeBehaviorOfDiamondBase = function ({ deploy, facetFunction, facetFunctionArgs }, skips = []) {
  const describe = describeFilter(skips);

  describe('::DiamondBase', function () {
    let instance;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('fallback', function () {
      it('forwards data with matching selector call to facet', async function () {
        expect(instance[facetFunction]).to.be.undefined;

        let contract = new ethers.Contract(
          instance.address,
          [`function ${ facetFunction }`],
          (await ethers.getSigners())[0]
        );

        await expect(
          contract.callStatic[facetFunction](...facetFunctionArgs)
        ).not.to.be.reverted;
      });

      it('forwards data without matching selector to fallback contract');

      describe('reverts if', function () {
        it('no selector matches data and fallback contract is not defined', async function () {
          let contract = new ethers.Contract(
            instance.address,
            ['function function()'],
            (await ethers.getSigners())[0]
          );

          await expect(
            contract.callStatic['function()']()
          ).to.be.revertedWith(
            'DiamondBase: no facet found for function signature'
          );
        });
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = { describeBehaviorOfDiamondBase };
