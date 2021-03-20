const { expect } = require('chai');

const { describeFilter } = require('@solidstate/library/mocha_describe_filter.js');

const describeBehaviorOfDiamondCuttable = require('./DiamondCuttable.behavior.js');
const describeBehaviorOfDiamondLoupe = require('./DiamondLoupe.behavior.js');
const describeBehaviorOfERC165 = require('../../introspection/ERC165.behavior.js');
const describeBehaviorOfSafeOwnable = require('../../access/SafeOwnable.behavior.js');

const describeBehaviorOfDiamond = function ({ deploy, getOwner, getNomineeOwner, getNonOwner, facetCuts }, skips) {
  const describe = describeFilter(skips);

  describe('::Diamond', function () {
    let instance;

    beforeEach(async function () {
      instance = await ethers.getContractAt('Diamond', (await deploy()).address);
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfDiamondCuttable({
      deploy: () => instance,
      getOwner,
      getNonOwner,
    }, skips);

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfDiamondLoupe({
      deploy: () => instance,
      facetCuts,
    }, skips);

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC165({
      deploy: () => instance,
      interfaceIds: ['0x7f5828d0'],
    }, skips);

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfSafeOwnable({
      deploy: () => instance,
      getOwner,
      getNomineeOwner,
      getNonOwner,
    }, skips);

    describe('receive', function () {
      it('accepts ether transfer', async function () {
        let [signer] = await ethers.getSigners();
        let value = ethers.constants.One;

        await expect(
          () => signer.sendTransaction({ to: instance.address, value })
        ).to.changeEtherBalance(instance, value);
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfDiamond;
