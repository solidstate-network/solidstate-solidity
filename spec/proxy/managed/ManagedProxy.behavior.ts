import { ManagedProxy } from '../../../typechain';
import { describeBehaviorOfProxy } from '../Proxy.behavior';
import { describeFilter } from '@solidstate/library';

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
