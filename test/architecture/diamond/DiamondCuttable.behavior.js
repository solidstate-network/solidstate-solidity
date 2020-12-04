const { expect } = require('chai');

const { describeFilter } = require('../../../lib/mocha_describe_filter.js');

const describeBehaviorOfDiamondCuttable = function ({ deploy, deployFacet, facetFunction, facetFunctionArgs }, skips = []) {
  const describe = describeFilter(skips);

  describe('::DiamondCuttable', function () {
    let instance;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#diamondCut', function () {
      it('adds facet', async function () {
        let facetInstance = await deployFacet();
        let selector = facetInstance.interface.getSighash(facetFunction);

        expect(instance[facetFunction]).to.be.undefined;
        expect(facetInstance[facetFunction]).not.to.be.undefined;

        let contract = new ethers.Contract(
          instance.address,
          [`function ${ facetFunction }`],
          (await ethers.getSigners())[0]
        );

        await expect(
          contract.callStatic[facetFunction](...facetFunctionArgs)
        ).to.be.reverted;

        await instance.diamondCut([{
          facet: facetInstance.address, selector },
        ]);

        await expect(
          contract.callStatic[facetFunction](...facetFunctionArgs)
        ).not.to.be.reverted;
      });

      it('removes facet', async function () {
        let facetInstance = await deployFacet();
        let selector = facetInstance.interface.getSighash(facetFunction);

        expect(instance[facetFunction]).to.be.undefined;
        expect(facetInstance[facetFunction]).not.to.be.undefined;

        let contract = new ethers.Contract(
          instance.address,
          [`function ${ facetFunction }`],
          (await ethers.getSigners())[0]
        );

        await instance.diamondCut([{
          facet: facetInstance.address, selector },
        ]);

        await expect(
          contract.callStatic[facetFunction](...facetFunctionArgs)
        ).not.to.be.reverted;

        await instance.diamondCut([{
          facet: ethers.constants.AddressZero, selector },
        ]);

        await expect(
          contract.callStatic[facetFunction](...facetFunctionArgs)
        ).to.be.reverted;
      });

      it('replaces facet', async function () {
        let facetInstance = await deployFacet();
        let selector = facetInstance.interface.getSighash(facetFunction);

        expect(instance[facetFunction]).to.be.undefined;
        expect(facetInstance[facetFunction]).not.to.be.undefined;

        let contract = new ethers.Contract(
          instance.address,
          [`function ${ facetFunction }`],
          (await ethers.getSigners())[0]
        );

        await instance.diamondCut([
          { facet: facetInstance.address, selector },
        ]);

        await expect(
          contract.callStatic[facetFunction](...facetFunctionArgs)
        ).not.to.be.reverted;

        // deploy new facet instance
        let facetInstanceReplacement = await deployFacet();

        expect(facetInstanceReplacement[facetFunction]).not.to.be.undefined;

        await instance.diamondCut([{
          facet: facetInstanceReplacement.address, selector },
        ]);

        await expect(
          contract.callStatic[facetFunction](...facetFunctionArgs)
        ).not.to.be.reverted;
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = { describeBehaviorOfDiamondCuttable };
