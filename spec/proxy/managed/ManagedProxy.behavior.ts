import { describeBehaviorOfProxy, ProxyBehaviorArgs } from '../Proxy.behavior';
import { describeFilter } from '@solidstate/library';
import { IManagedProxy } from '@solidstate/typechain-types';

export interface ManagedProxyBehaviorArgs extends ProxyBehaviorArgs {}

export function describeBehaviorOfManagedProxy(
  deploy: () => Promise<IManagedProxy>,
  {
    implementationFunction,
    implementationFunctionArgs,
  }: ManagedProxyBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ManagedProxy', function () {
    describeBehaviorOfProxy(
      deploy,
      {
        implementationFunction,
        implementationFunctionArgs,
      },
      [],
    );
  });
}
