import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfProxy, ProxyBehaviorArgs } from '@solidstate/spec';
import { IDiamondBase } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface DiamondBaseBehaviorArgs extends ProxyBehaviorArgs {}

export function describeBehaviorOfDiamondBase(
  deploy: () => Promise<IDiamondBase>,
  args: DiamondBaseBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondBase', function () {
    let instance: IDiamondBase;

    beforeEach(async function () {
      instance = await deploy();
    });

    describeBehaviorOfProxy(deploy, args, skips);

    describe('fallback()', function () {
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
