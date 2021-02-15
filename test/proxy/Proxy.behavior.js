const { expect } = require('chai');

const { describeFilter } = require('../../lib/mocha_describe_filter.js');

const describeBehaviorOfProxy = function ({ deploy, implementationFunction, implementationFunctionArgs }, skips = []) {
  const describe = describeFilter(skips);

  describe('::Proxy', function () {
    let instance;

    beforeEach(async function () {
      instance = await ethers.getContractAt('Proxy', (await deploy()).address);
    });

    describe('fallback', function () {
      it('forwards data to implementation', async function () {
        expect(instance[implementationFunction]).to.be.undefined;

        let contract = new ethers.Contract(
          instance.address,
          [`function ${ implementationFunction }`],
          (await ethers.getSigners())[0]
        );

        await expect(
          contract.callStatic[implementationFunction](...implementationFunctionArgs)
        ).not.to.be.reverted;
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfProxy;
