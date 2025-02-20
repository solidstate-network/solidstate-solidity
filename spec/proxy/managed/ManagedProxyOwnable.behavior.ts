import { OwnableBehaviorArgs, describeBehaviorOfOwnable } from '../../access';
import {
  ManagedProxyBehaviorArgs,
  describeBehaviorOfManagedProxy,
} from './ManagedProxy.behavior';
import { describeFilter } from '@solidstate/library';
import { IManagedProxyOwnable } from '@solidstate/typechain-types';

export interface ManagedProxyOwnableBehaviorArgs
  extends ManagedProxyBehaviorArgs,
    OwnableBehaviorArgs {}

export function describeBehaviorOfManagedProxyOwnable(
  deploy: () => Promise<IManagedProxyOwnable>,
  args: ManagedProxyOwnableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ManagedProxyOwnable', () => {
    describeBehaviorOfManagedProxy(deploy, args, skips);

    describeBehaviorOfOwnable(deploy, args, skips);
  });
}
