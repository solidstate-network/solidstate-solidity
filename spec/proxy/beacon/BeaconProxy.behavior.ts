import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfProxy, ProxyBehaviorArgs } from '@solidstate/spec';
import { IBeaconProxy } from '@solidstate/typechain-types';
import type { NetworkConnection } from 'hardhat/types/network';

export interface BeaconProxyBehaviorArgs extends ProxyBehaviorArgs {}

export function describeBehaviorOfBeaconProxy(
  connection: NetworkConnection,
  deploy: () => Promise<IBeaconProxy>,
  args: BeaconProxyBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::BeaconProxy', () => {
    describeBehaviorOfProxy(connection, deploy, args, skips);
  });
}
