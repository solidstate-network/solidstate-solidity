import { DiamondBase } from '../../../typechain';
import { describeFilter } from '@solidstate/library';
import { expect } from 'chai';
import { ethers } from 'hardhat';

interface DiamondBaseBehaviorArgs {
  deploy: () => Promise<DiamondBase>;
  facetFunction: string;
  facetFunctionArgs: string[];
}

export function describeBehaviorOfDiamondBase(
  { deploy, facetFunction, facetFunctionArgs }: DiamondBaseBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondBase', function () {
    let instance: DiamondBase;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('fallback()', function () {
      it('forwards data with matching selector call to facet', async function () {
        expect((instance as any)[facetFunction]).to.be.undefined;

        let contract = new ethers.Contract(
          instance.address,
          [`function ${facetFunction}`],
          ethers.provider,
        );

        await expect(contract.callStatic[facetFunction](...facetFunctionArgs))
          .not.to.be.reverted;
      });

      it('forwards data without matching selector to fallback contract');

      describe('reverts if', function () {
        it('no selector matches data and fallback contract is not defined', async function () {
          let contract = new ethers.Contract(
            instance.address,
            ['function function()'],
            ethers.provider,
          );

          await expect(contract.callStatic['function()']()).to.be.revertedWith(
            'DiamondBase: no facet found for function signature',
          );
        });
      });
    });
  });
}
