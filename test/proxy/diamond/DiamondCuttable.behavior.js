const { expect } = require('chai');

const { describeFilter } = require('@solidstate/library/mocha_describe_filter.js');

const describeBehaviorOfDiamondCuttable = function ({ deploy, deployFacet, getOwner, getNonOwner, facetFunction, facetFunctionArgs }, skips) {
  const describe = describeFilter(skips);

  describe('::DiamondCuttable', function () {
    let owner, nonOwner;

    let instance;

    before(async function () {
      owner = await getOwner();
      nonOwner = await getNonOwner();
    });

    beforeEach(async function () {
      instance = await ethers.getContractAt('DiamondCuttable', (await deploy()).address);
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

        await instance.connect(owner).diamondCut(
          [
            { target: facetInstance.address, action: 0, selectors: [selector] },
          ],
          ethers.constants.AddressZero,
          '0x'
        );

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

        await instance.connect(owner).diamondCut(
          [
            { target: facetInstance.address, action: 0, selectors: [selector] },
          ],
          ethers.constants.AddressZero,
          '0x'
        );

        await expect(
          contract.callStatic[facetFunction](...facetFunctionArgs)
        ).not.to.be.reverted;

        await instance.connect(owner).diamondCut(
          [
            { target: ethers.constants.AddressZero, action: 2, selectors: [selector] },
          ],
          ethers.constants.AddressZero,
          '0x'
        );

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

        await instance.connect(owner).diamondCut(
          [
            { target: facetInstance.address, action: 0, selectors: [selector] },
          ],
          ethers.constants.AddressZero,
          '0x'
        );

        await expect(
          contract.callStatic[facetFunction](...facetFunctionArgs)
        ).not.to.be.reverted;

        // deploy new facet instance
        let facetInstanceReplacement = await deployFacet();

        expect(facetInstanceReplacement[facetFunction]).not.to.be.undefined;

        await instance.connect(owner).diamondCut(
          [
            { target: facetInstanceReplacement.address, action: 1, selectors: [selector] },
          ],
          ethers.constants.AddressZero,
          '0x'
        );

        await expect(
          contract.callStatic[facetFunction](...facetFunctionArgs)
        ).not.to.be.reverted;
      });

      describe('reverts if', function () {
        it('sender is not owner', async function () {
          await expect(
            instance.connect(nonOwner).diamondCut([], ethers.constants.AddressZero, '0x')
          ).to.be.revertedWith(
            'Ownable: sender must be owner'
          );
        });
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfDiamondCuttable;
