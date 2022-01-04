import { UpgradeableOwnableProxy } from '../../../typechain';
import { describeBehaviorOfProxy } from '../Proxy.behavior';
import { describeFilter } from '@solidstate/library';

interface UpgradeableOwnableProxyArgs {
  deploy: () => Promise<UpgradeableOwnableProxy>;
  implementationFunction: string;
  implementationFunctionArgs: any[];
}

export function describeBehaviorOfUpgradeableOwnableProxy(
  {
    deploy,
    implementationFunction,
    implementationFunctionArgs,
  }: UpgradeableOwnableProxyArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::UpgradeableOwnableProxy', () => {
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
