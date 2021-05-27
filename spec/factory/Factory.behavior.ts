import { describeFilter } from '@solidstate/library';

export function describeBehaviorOfFactory({}, skips?: string[]) {
  const describe = describeFilter(skips);

  describe('::Factory', function () {
    // no behavior
  });
}
