const describeBehaviorOfERC1271Base = require('./ERC1271Base.behavior.js');

const { describeFilter } = require('../../lib/mocha_describe_filter.js');

const describeBehaviorOfERC1271Ownable = function ({ deploy, getOwner, getNonOwner }, skips) {
  const describe = describeFilter(skips);

  describe('::ERC1271Ownable', function () {
    let owner;
    let nonOwner;
    let instance;

    beforeEach(async function () {
      owner = await getOwner();
      nonOwner = await getNonOwner();
      instance = await ethers.getContractAt('ERC1271Ownable', (await deploy()).address);
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC1271Base({
      deploy: () => instance,
      getValidParams: async function () {
        let hash = ethers.utils.randomBytes(32);
        let signature = await owner.signMessage(ethers.utils.arrayify(hash));
        return [hash, ethers.utils.arrayify(signature)];
      },
      getInvalidParams: async function () {
        let hash = ethers.utils.randomBytes(32);
        let signature = await nonOwner.signMessage(ethers.utils.arrayify(hash));
        return [hash, ethers.utils.arrayify(signature)];
      },
    }, skips);
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfERC1271Ownable;
