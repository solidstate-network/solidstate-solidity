import { UpgradeableProxy } from '../../../typechain';
import { describeBehaviorOfProxy } from '../Proxy.behavior';
import { describeFilter } from '@solidstate/library';

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
