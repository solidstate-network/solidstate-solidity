import {
  describeBehaviorOfManagedProxy,
  ManagedProxyBehaviorArgs,
} from './ManagedProxy.behavior';
import { describeFilter } from '@solidstate/library';
import { IManagedProxyOwnable } from '@solidstate/typechain-types';

export interface ManagedProxyOwnableBehaviorArgs
  extends ManagedProxyBehaviorArgs {}

export function describeBehaviorOfManagedProxyOwnable(
  deploy: () => Promise<IManagedProxyOwnable>,
  {
    implementationFunction,
    implementationFunctionArgs,
  }: ManagedProxyOwnableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ManagedProxyOwnable', function () {
    describeBehaviorOfManagedProxy(
      deploy,
      {
        implementationFunction,
        implementationFunctionArgs,
      },
      [],
    );
  });
}
