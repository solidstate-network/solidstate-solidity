import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeFilter } from '@solidstate/library';
import { IProxy } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import type { NetworkConnection } from 'hardhat/types/network';

export interface ProxyBehaviorArgs {
  getProxyAdmin: () => Promise<HardhatEthersSigner>;
  getNonProxyAdmin: () => Promise<HardhatEthersSigner>;
  implementationFunction: string;
  implementationFunctionArgs: any[];
}

export function describeBehaviorOfProxy(
  connection: NetworkConnection,
  deploy: () => Promise<IProxy>,
  args: ProxyBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::Proxy', () => {
    let instance: IProxy;

    beforeEach(async () => {
      instance = await deploy();
    });

    describe('fallback()', () => {
      it('forwards data to implementation', async () => {
        let contract = new ethers.Contract(
          await instance.getAddress(),
          [`function ${args.implementationFunction}`],
          (await connection.ethers.getSigners())[0],
        );

        await expect(
          contract[args.implementationFunction].staticCall(
            ...args.implementationFunctionArgs,
          ),
        ).not.to.revert(connection.ethers);
      });
    });

    describe('receive()', () => {
      it('forwards value to implementation via delegatecall', async () => {
        // TODO: receive tests pass because hardhat-exposed functions used as implementations are payable
        const [signer] = await connection.ethers.getSigners();

        await expect(
          signer.sendTransaction({
            to: await instance.getAddress(),
            value: 1n,
          }),
        ).not.to.revert(connection.ethers);
      });
    });
  });
}
