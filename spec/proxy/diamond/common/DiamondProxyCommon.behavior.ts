import { describeFilter } from '@solidstate/library';
import { ProxyBehaviorArgs } from '@solidstate/spec';
import { IDiamondProxyCommon } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface DiamondProxyCommonBehaviorArgs extends ProxyBehaviorArgs {}

export function describeBehaviorOfDiamondProxyCommon(
  deploy: () => Promise<IDiamondProxyCommon>,
  args: DiamondProxyCommonBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondProxyCommon', () => {
    let instance: IDiamondProxyCommon;

    beforeEach(async () => {
      instance = await deploy();
    });

    describe('fallback()', () => {
      it('forwards data with matching selector call to facet', async () => {
        expect(instance.interface.hasFunction(args.implementationFunction)).to
          .be.false;

        let contract = new ethers.Contract(
          await instance.getAddress(),
          [`function ${args.implementationFunction}`],
          ethers.provider,
        );

        await expect(
          contract[args.implementationFunction].staticCall(
            ...args.implementationFunctionArgs,
          ),
        ).not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('no selector matches data', async () => {
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
