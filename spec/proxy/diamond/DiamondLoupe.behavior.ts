import { DiamondLoupe } from '../../../typechain';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeFilter } from '@solidstate/library/mocha_describe_filter';
import { describeBehaviorOfERC165 } from '../../introspection/ERC165.behavior';

interface DiamondLoupeBehaviorArgs {
  deploy: () => Promise<DiamondLoupe>;
  facetCuts: any[];
}

export function describeBehaviorOfDiamondLoupe(
  { deploy, facetCuts }: DiamondLoupeBehaviorArgs,
  skips: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondLoupe', function () {
    let instance: DiamondLoupe;

    before(async function () {
      expect(facetCuts).to.have.lengthOf.at.least(1);
    });

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#facets', function () {
      it('returns facet cuts', async function () {
        expect(await instance.callStatic.facets()).to.have.deep.members(
          facetCuts.map((fc) => [fc.target, fc.selectors]),
        );
      });
    });

    describe('#facetAddresses', function () {
      it('returns facets', async function () {
        expect(await instance.callStatic.facetAddresses()).to.have.members(
          facetCuts.map((fc) => fc.target),
        );
      });
    });

    describe('#facetFunctionSelectors', function () {
      it('returns selectors for given facet', async function () {
        for (let facet of facetCuts) {
          expect(
            await instance.callStatic.facetFunctionSelectors(facet.target),
          ).to.have.members(facet.selectors);
        }
      });

      it('returns empty array for unrecognized facet', async function () {
        expect(
          await instance.callStatic.facetFunctionSelectors(
            ethers.constants.AddressZero,
          ),
        ).to.have.lengthOf(0);
      });
    });

    describe('#facetAddress', function () {
      it('returns facet for given selector', async function () {
        for (let facet of facetCuts) {
          for (let selector of facet.selectors) {
            expect(await instance.callStatic.facetAddresses(selector)).to.equal(
              facet.target,
            );
          }
        }
      });

      it('returns zero address for unrecognized selector', async function () {
        expect(await instance.callStatic.facetAddress('0x00000000')).to.equal(
          ethers.constants.AddressZero,
        );
      });
    });
  });
}
