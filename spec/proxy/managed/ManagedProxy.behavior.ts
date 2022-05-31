import { describeBehaviorOfProxy } from '../Proxy.behavior';
import { describeFilter } from '@solidstate/library';
import { IManagedProxy } from '@solidstate/typechain-types';

export interface ManagedProxyBehaviorArgs {
  deploy: () => Promise<IManagedProxy>;
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
