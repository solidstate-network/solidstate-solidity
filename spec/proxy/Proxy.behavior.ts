import { expect } from 'chai';
import { describeFilter } from '@solidstate/library/mocha_describe_filter';
import { Proxy } from '../../typechain';
import { ethers } from 'hardhat';

interface ProxyBehaviorArgs {
  deploy: () => Promise<Proxy>;
  implementationFunction: string;
  implementationFunctionArgs: string[];
}

export function describeBehaviorOfProxy(
  {
    deploy,
    implementationFunction,
    implementationFunctionArgs,
  }: ProxyBehaviorArgs,
  skips: string[],
) {
  const describe = describeFilter(skips);

  describe('::Proxy', function () {
    let instance: Proxy;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('fallback', function () {
      it('forwards data to implementation', async function () {
        expect((instance as any)[implementationFunction]).to.be.undefined;

        let contract = new ethers.Contract(
          instance.address,
          [`function ${implementationFunction}`],
          (await ethers.getSigners())[0],
        );

        await expect(
          contract.callStatic[implementationFunction](
            ...implementationFunctionArgs,
          ),
        ).not.to.be.reverted;
      });
    });
  });
}
