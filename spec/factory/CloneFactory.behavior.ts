import { describeBehaviorOfFactory } from './Factory.behavior';
import { describeFilter } from '@solidstate/library';

export function describeBehaviorOfCloneFactory({}, skips?: string[]) {
  const describe = describeFilter(skips);

  describe('::CloneFactory', function () {
    describeBehaviorOfFactory({}, skips);
  });
}
