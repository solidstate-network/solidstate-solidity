import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfFactory } from './Factory.behavior';

export function describeBehaviorOfMinimalProxyFactory({}, skips: string[]) {
  const describe = describeFilter(skips);

  describe('::MinimalProxyFactory', function () {
    describeBehaviorOfFactory({}, skips);
  });
}
