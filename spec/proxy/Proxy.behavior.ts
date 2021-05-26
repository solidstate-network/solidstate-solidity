import { expect } from 'chai';
import { describeFilter } from '@solidstate/library/mocha_describe_filter';
import { Proxy, Proxy__factory } from '../../typechain';
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
      const [deployer] = await ethers.getSigners();
      const i = await deploy();
      instance = Proxy__factory.connect(i.address, deployer);
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
