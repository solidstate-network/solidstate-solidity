import { describeBehaviorOfFactory } from './Factory.behavior';
import { describeFilter } from '@solidstate/library';
import { BaseContract } from 'ethers';

export interface MinimalProxyFactoryBehaviorArgs {}

export function describeBehaviorOfMinimalProxyFactory(
  deploy: () => Promise<BaseContract>,
  {}: MinimalProxyFactoryBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::MinimalProxyFactory', function () {
    describeBehaviorOfFactory(deploy, {}, skips);
  });
}
