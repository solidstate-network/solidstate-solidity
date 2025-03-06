import {
  describeBehaviorOfBeaconProxy,
  BeaconProxyBehaviorArgs,
} from '../BeaconProxy.behavior';
import { describeFilter } from '@solidstate/library';
import { IDiamondBeaconProxy } from '@solidstate/typechain-types';

export interface DiamondBeaconProxyBehaviorArgs
  extends BeaconProxyBehaviorArgs {}

export function describeBehaviorOfDiamondBeaconProxy(
  deploy: () => Promise<IDiamondBeaconProxy>,
  args: DiamondBeaconProxyBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondBeaconProxy', () => {
    describeBehaviorOfBeaconProxy(deploy, args, skips);
  });
}
