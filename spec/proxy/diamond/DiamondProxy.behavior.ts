import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfProxy,
  type ProxyBehaviorArgs,
} from '@solidstate/spec';
import type { IDiamondProxy } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import type { NetworkConnection } from 'hardhat/types/network';

export interface DiamondProxyBehaviorArgs extends ProxyBehaviorArgs {}

export function describeBehaviorOfDiamondProxy(
  connection: NetworkConnection,
  deploy: () => Promise<IDiamondProxy>,
  args: DiamondProxyBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondProxy', () => {
    let instance: IDiamondProxy;

    beforeEach(async () => {
      instance = await deploy();
    });

    describeBehaviorOfProxy(connection, deploy, args, skips);

    describe('fallback()', () => {
      it('forwards data with matching selector call to facet', async () => {
        expect(instance.interface.hasFunction(args.implementationFunction)).to
          .be.false;

        let contract = new ethers.Contract(
          await instance.getAddress(),
          [`function ${args.implementationFunction}`],
          connection.ethers.provider,
        );

        await expect(
          contract[args.implementationFunction].staticCall(
            ...args.implementationFunctionArgs,
          ),
        ).not.to.revert(connection.ethers);
      });

      describe('reverts if', () => {
        it('no selector matches data', async () => {
          let contract = new ethers.Contract(
            await instance.getAddress(),
            ['function __function()'],
            connection.ethers.provider,
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

    describe('receive()', () => {
      it('todo');
    });
  });
}
