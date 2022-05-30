import { describeBehaviorOfProxy } from '../Proxy.behavior';
import { describeFilter } from '@solidstate/library';
import { UpgradeableProxy } from '@solidstate/typechain-types';

interface UpgradeableProxyBehaviorArgs {
  deploy: () => Promise<UpgradeableProxy>;
  implementationFunction: string;
  implementationFunctionArgs: any[];
}

export function describeBehaviorOfUpgradeableProxy(
  {
    deploy,
    implementationFunction,
    implementationFunctionArgs,
  }: UpgradeableProxyBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::UpgradeableProxy', function () {
    describeBehaviorOfProxy(
      {
        deploy,
        implementationFunction,
        implementationFunctionArgs,
      },
      [],
    );
  });
}
