const describeBehaviorOfERC1271Base = require('./ERC1271Base.behavior.js');

const { describeFilter } = require('../../lib/mocha_describe_filter.js');

const describeBehaviorOfERC1271Stored = function ({ deploy, getValidParams }, skips) {
  const describe = describeFilter(skips);

  describe('::ERC1271Stored', function () {
    let instance;

    beforeEach(async function () {
      instance = await ethers.getContractAt('ERC1271Stored', (await deploy()).address);
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC1271Base({
      deploy: () => instance,
      getValidParams,
      getInvalidParams: () => [ethers.utils.randomBytes(32), ethers.utils.randomBytes(0)],
    }, skips);
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC1271Stored;
