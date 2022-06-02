import { describeFilter } from '@solidstate/library';
import { BaseContract } from 'ethers';

export interface FactoryBehaviorArgs {}

export function describeBehaviorOfFactory(
  deploy: () => Promise<BaseContract>,
  {}: FactoryBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::Factory', function () {
    // no behavior
  });
}
