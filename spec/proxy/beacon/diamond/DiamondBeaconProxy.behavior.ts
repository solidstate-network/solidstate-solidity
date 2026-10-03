import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfBeaconProxy,
  BeaconProxyBehaviorArgs,
} from '@solidstate/spec';
import { IDiamondBeaconProxy } from '@solidstate/typechain-types';
import type { NetworkConnection } from 'hardhat/types/network';

export interface DiamondBeaconProxyBehaviorArgs extends BeaconProxyBehaviorArgs {}

export function describeBehaviorOfDiamondBeaconProxy(
  connection: NetworkConnection,
  deploy: () => Promise<IDiamondBeaconProxy>,
  args: DiamondBeaconProxyBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::DiamondBeaconProxy', () => {
    describeBehaviorOfBeaconProxy(connection, deploy, args, skips);
  });
}
