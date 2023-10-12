import {
  describeBehaviorOfBeaconProxy,
  BeaconProxyBehaviorArgs,
} from './BeaconProxy.behavior';
import { describeFilter } from '@solidstate/library';
import { IBeaconProxyOwnable } from '@solidstate/typechain-types';

export interface BeaconProxyOwnableBehaviorArgs
  extends BeaconProxyBehaviorArgs {}

export function describeBehaviorOfBeaconProxyOwnable(
  deploy: () => Promise<IBeaconProxyOwnable>,
  {
    implementationFunction,
    implementationFunctionArgs,
  }: BeaconProxyOwnableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::BeaconProxyOwnable', () => {
    describeBehaviorOfBeaconProxy(
      deploy,
      {
        implementationFunction,
        implementationFunctionArgs,
      },
      [],
    );
  });
}
