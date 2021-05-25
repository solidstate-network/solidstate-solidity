import { describeFilter } from '@solidstate/library/mocha_describe_filter';

export function describeBehaviorOfFactory({}, skips: string[]) {
  const describe = describeFilter(skips);

  describe('::Factory', function () {
    // no behavior
  });
}
