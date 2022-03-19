import { describeBehaviorOfFactory } from './Factory.behavior';
import { describeFilter } from '@solidstate/library';

export function describeBehaviorOfMinimalProxyFactory({}, skips?: string[]) {
  const describe = describeFilter(skips);

  describe('::MinimalProxyFactory', function () {
    describeBehaviorOfFactory({}, skips);
  });
}
