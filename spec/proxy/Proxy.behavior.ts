import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { IProxy } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface ProxyBehaviorArgs {
  getProxyAdmin: () => Promise<SignerWithAddress>;
  getNonProxyAdmin: () => Promise<SignerWithAddress>;
  implementationFunction: string;
  implementationFunctionArgs: any[];
}

export function describeBehaviorOfProxy(
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
          (await ethers.getSigners())[0],
        );

        await expect(
          contract[args.implementationFunction].staticCall(
            ...args.implementationFunctionArgs,
          ),
        ).not.to.be.reverted;
      });
    });

    describe('receive()', () => {
      it('forwards value to implementation via delegatecall', async () => {
        // TODO: receive tests pass because hardhat-exposed functions used as implementations are payable
        const [signer] = await ethers.getSigners();

        await expect(
          signer.sendTransaction({
            to: await instance.getAddress(),
            value: 1n,
          }),
        ).not.to.be.reverted;
      });
    });
  });
}
