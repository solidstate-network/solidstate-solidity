const { expect } = require('chai');

const { describeFilter } = require('@solidstate/library/mocha_describe_filter.js');

const describeBehaviorOfDiamondLoupe = function ({ deploy, facetCuts }, skips) {
  const describe = describeFilter(skips);

  describe('::DiamondLoupe', function () {
    let instance;

    before(async function () {
      expect(facetCuts).to.have.lengthOf.at.least(1);
    });

    beforeEach(async function () {
      instance = await ethers.getContractAt('DiamondLoupe', (await deploy()).address);
    });

    describe('#readFacetCuts', function () {
      it('returns facet cuts', async function () {
        expect(
          await instance.callStatic['readFacetCuts()']()
        ).to.deep.include.members(
          facetCuts
        );
      });
    });

    describe('#readFacets', function () {
      it('returns facets', async function () {
        expect(
          await instance.callStatic['readFacets()']()
        ).to.have.members(
          Array.from(new Set(facetCuts.map(fc => fc[0])))
        );
      });
    });

    describe('#readFacetSelectors', function () {
      it('returns selectors for given facet', async function () {
        let facetSelectors = facetCuts.reduce(function (acc, el) {
          acc[el[0]] = acc[el[0]] || [];
          acc[el[0]].push(el[1]);
          return acc;
        }, new Object());

        for (let facet in facetSelectors) {
          expect(
            await instance.callStatic['readFacetSelectors(address)'](facet)
          ).to.have.members(
            facetSelectors[facet]
          );
        }
      });

      it('returns empty array for unrecognized facet', async function () {
        expect(
          await instance.callStatic['readFacetSelectors(address)'](ethers.constants.AddressZero)
        ).to.have.lengthOf(0);
      });
    });

    describe('#readSelectorFacet', function () {
      it('returns facet for given selector', async function () {
        for (let facetCut of facetCuts) {
          expect(
            await instance.callStatic['readSelectorFacet(bytes4)'](facetCut[1])
          ).to.equal(
            facetCut[0]
          );
        }
      });

      it('returns zero address for unrecognized selector', async function () {
        expect(
          await instance.callStatic['readSelectorFacet(bytes4)']('0x00000000')
        ).to.equal(
          ethers.constants.AddressZero
        );
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfDiamondLoupe;
