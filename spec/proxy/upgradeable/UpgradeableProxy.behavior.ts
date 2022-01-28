import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfProxy } from '../Proxy.behavior';
import { UpgradeableProxy } from '../../../typechain';

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
