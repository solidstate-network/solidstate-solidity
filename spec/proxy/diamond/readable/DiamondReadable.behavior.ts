import { describeBehaviorOfERC165 } from '../../../introspection';
import { describeFilter } from '@solidstate/library';
import { DiamondReadable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

interface DiamondReadableBehaviorArgs {
  deploy: () => Promise<DiamondReadable>;
  facetCuts: any[];
}

export function describeBehaviorOfDiamondReadable(
  { deploy, facetCuts }: DiamondReadableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondReadable', function () {
    let instance: DiamondReadable;

    beforeEach(async function () {
      expect(facetCuts).to.have.lengthOf.at.least(1);
      instance = await deploy();
    });

    describeBehaviorOfERC165(
      {
        deploy: deploy as any,
        interfaceIds: ['0x48e2b093'],
      },
      skips,
    );

    describe('#facets()', function () {
      it('returns facet cuts', async function () {
        expect(await instance.callStatic['facets()']()).to.have.deep.members(
          facetCuts.map((fc) => [fc.target, fc.selectors]),
        );
      });
    });

    describe('#facetAddresses()', function () {
      it('returns facets', async function () {
        expect(await instance.callStatic['facetAddresses()']()).to.have.members(
          facetCuts.map((fc) => fc.target),
        );
      });
    });

    describe('#facetFunctionSelectors(address)', function () {
      it('returns selectors for given facet', async function () {
        for (let facet of facetCuts) {
          expect(
            await instance.callStatic['facetFunctionSelectors(address)'](
              facet.target,
            ),
          ).to.have.members(facet.selectors);
        }
      });

      it('returns empty array for unrecognized facet', async function () {
        expect(
          await instance.callStatic['facetFunctionSelectors(address)'](
            ethers.constants.AddressZero,
          ),
        ).to.have.lengthOf(0);
      });
    });

    describe('#facetAddress(bytes4)', function () {
      it('returns facet for given selector', async function () {
        for (let facet of facetCuts) {
          for (let selector of facet.selectors) {
            expect(
              await instance.callStatic['facetAddress(bytes4)'](selector),
            ).to.equal(facet.target);
          }
        }
      });

      it('returns zero address for unrecognized selector', async function () {
        expect(
          await instance.callStatic['facetAddress(bytes4)']('0x00000000'),
        ).to.equal(ethers.constants.AddressZero);
      });
    });
  });
}
