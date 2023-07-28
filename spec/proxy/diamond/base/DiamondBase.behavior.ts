import { describeFilter } from '@solidstate/library';
import { IDiamondBase } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface DiamondBaseBehaviorArgs {
  facetFunction: string;
  facetFunctionArgs: string[];
}

export function describeBehaviorOfDiamondBase(
  deploy: () => Promise<IDiamondBase>,
  { facetFunction, facetFunctionArgs }: DiamondBaseBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondBase', function () {
    let instance: IDiamondBase;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('fallback()', function () {
      it('forwards data with matching selector call to facet', async function () {
        expect(instance.interface.hasFunction(facetFunction)).to.be.false;

        let contract = new ethers.Contract(
          await instance.getAddress(),
          [`function ${facetFunction}`],
          ethers.provider,
        );

        await expect(contract[facetFunction].staticCall(...facetFunctionArgs))
          .not.to.be.reverted;
      });

      it('forwards data without matching selector to fallback contract');

      describe('reverts if', function () {
        it('no selector matches data', async function () {
          let contract = new ethers.Contract(
            await instance.getAddress(),
            ['function __function()'],
            ethers.provider,
          );

          await expect(
            contract.__function.staticCall(),
          ).to.be.revertedWithCustomError(
            instance,
            'Proxy__ImplementationIsNotContract',
          );
        });
      });
    });
  });
}
