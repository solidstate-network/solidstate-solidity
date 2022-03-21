import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfProxy } from '../Proxy.behavior';
import { ManagedProxy } from '../../../typechain';

interface ManagedProxyBehaviorArgs {
  deploy: () => Promise<ManagedProxy>;
  implementationFunction: string;
  implementationFunctionArgs: any[];
}

export function describeBehaviorOfManagedProxy(
  {
    deploy,
    implementationFunction,
    implementationFunctionArgs,
  }: ManagedProxyBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ManagedProxy', function () {
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
