import { describeBehaviorOfManagedProxy } from './ManagedProxy.behavior';
import { describeFilter } from '@solidstate/library';
import { ManagedProxyOwnable } from '../../typechain';

interface ManagedProxyOwnableBehaviorArgs {
  deploy: () => Promise<ManagedProxyOwnable>;
  implementationFunction: string;
  implementationFunctionArgs: string[];
}

export function describeBehaviorOfManagedProxyOwnable(
  {
    deploy,
    implementationFunction,
    implementationFunctionArgs,
  }: ManagedProxyOwnableBehaviorArgs,
  skips: string[],
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
