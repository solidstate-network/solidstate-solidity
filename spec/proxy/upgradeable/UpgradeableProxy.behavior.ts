import { describeBehaviorOfProxy, ProxyBehaviorArgs } from '../Proxy.behavior';
import { describeFilter } from '@solidstate/library';

export interface UpgradeableProxyBehaviorArgs extends ProxyBehaviorArgs {}

export function describeBehaviorOfUpgradeableProxy(
  deploy: () => Promise<IUpgradeableProxy>,
  args: UpgradeableProxyBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::UpgradeableProxy', () => {
    describeBehaviorOfProxy(deploy, args, skips);
  });
}
