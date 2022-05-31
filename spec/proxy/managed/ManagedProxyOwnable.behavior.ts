import { describeBehaviorOfManagedProxy } from './ManagedProxy.behavior';
import { describeFilter } from '@solidstate/library';
import { IManagedProxyOwnable } from '@solidstate/typechain-types';

export interface ManagedProxyOwnableBehaviorArgs {
  deploy: () => Promise<IManagedProxyOwnable>;
  implementationFunction: string;
  implementationFunctionArgs: any[];
}

export function describeBehaviorOfManagedProxyOwnable(
  {
    deploy,
    implementationFunction,
    implementationFunctionArgs,
  }: ManagedProxyOwnableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ManagedProxyOwnable', function () {
    describeBehaviorOfManagedProxy(
      {
        deploy,
        implementationFunction,
        implementationFunctionArgs,
      },
      [],
    );
  });
}
