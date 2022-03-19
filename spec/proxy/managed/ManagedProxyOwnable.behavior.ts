import { ManagedProxyOwnable } from '../../../typechain';
import { describeBehaviorOfManagedProxy } from './ManagedProxy.behavior';
import { describeFilter } from '@solidstate/library';

interface ManagedProxyOwnableBehaviorArgs {
  deploy: () => Promise<ManagedProxyOwnable>;
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
