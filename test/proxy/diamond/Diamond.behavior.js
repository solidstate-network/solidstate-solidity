const { expect } = require('chai');
const { deployMockContract } = require('@ethereum-waffle/mock-contract');

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

    describe('#diamondCut', function () {
      let owner;

      const functions = [];
      const selectors = [];
      let abi;
      let facet;

      before(async function () {
        owner = await getOwner();

        for (let i = 0; i < 24; i++) {
          const fn = `fn${ i }()`;
          functions.push(fn);
          selectors.push(ethers.utils.hexDataSlice(
            ethers.utils.solidityKeccak256(['string'], [fn]), 0, 4
          ));
        }

        abi = functions.map(fn => `function ${ fn }`);

        facet = await deployMockContract(owner, abi);
      });

      it('adds selectors one-by-one', async function () {
        const expectedSelectors = [];

        for (let i = 0; i < selectors.length; i++) {
          await instance.connect(owner).diamondCut(
            [
              { target: facet.address, action: 0, selectors: [selectors[i]] },
            ],
            ethers.constants.AddressZero,
            '0x'
          );

          expectedSelectors.push(selectors[i]);

          expect(
            await instance.callStatic['facets()']()
          ).to.deep.have.members(
            [
              ...facetCuts.map(fc => [fc.target, fc.selectors]),
              [
                facet.address,
                expectedSelectors,
              ],
            ]
          );

          expect(
            await instance.callStatic['facetFunctionSelectors(address)'](facet.address)
          ).to.deep.have.members(
            expectedSelectors
          );

          expect(
            await instance.callStatic['facetAddress(bytes4)'](selectors[i])
          ).to.equal(
            facet.address
          );

          const contract = new ethers.Contract(
            instance.address,
            abi,
            ethers.provider
          );

          // call reverts, but with mock-specific message
          await expect(
            contract.callStatic[functions[i]]()
          ).to.be.revertedWith(
            'Mock on the method is not initialized'
          );
        }
      });

      it('removes selectors one-by-one', async function () {
        await instance.connect(owner).diamondCut(
          [
            { target: facet.address, action: 0, selectors },
          ],
          ethers.constants.AddressZero,
          '0x'
        );

        let expectedSelectors = [...selectors];

        for (let i = 0; i < selectors.length; i++) {
          await instance.connect(owner).diamondCut(
            [
              { target: ethers.constants.AddressZero, action: 2, selectors: [selectors[i]] },
            ],
            ethers.constants.AddressZero,
            '0x'
          );

          const last = expectedSelectors.pop();

          if (last !== selectors[i]) {
            expectedSelectors.splice(expectedSelectors.indexOf(selectors[i]), 1, last);
          }

          expect(
            await instance.callStatic['facets()']()
          ).to.deep.have.members(
            [
              ...facetCuts.map(fc => [fc.target, fc.selectors]),
              [
                facet.address,
                expectedSelectors,
              ],
            ].filter(f => f[1].length)
          );

          expect(
            await instance.callStatic['facetFunctionSelectors(address)'](facet.address)
          ).to.deep.have.members(
            expectedSelectors
          );

          expect(
            await instance.callStatic['facetAddress(bytes4)'](selectors[i])
          ).to.equal(
            ethers.constants.AddressZero
          );

          const contract = new ethers.Contract(
            instance.address,
            abi,
            ethers.provider
          );

          await expect(
            contract.callStatic[functions[i]]()
          ).to.be.revertedWith(
            'DiamondBase: no facet found for function signature'
          );
        }
      });
    });
  });
};

// eslint-disable-next-line mocha/no-exports
module.exports = describeBehaviorOfDiamond;
