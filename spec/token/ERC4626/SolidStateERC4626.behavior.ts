import {
  describeBehaviorOfSolidStateERC20,
  SolidStateERC20BehaviorArgs,
} from '../ERC20';
import {
  describeBehaviorOfERC4626Base,
  ERC4626BaseBehaviorArgs,
} from './ERC4626Base.behavior';
import { describeFilter } from '@solidstate/library';
import { ISolidStateERC4626 } from '@solidstate/typechain-types';

export interface SolidStateERC4626BehaviorArgs
  extends SolidStateERC20BehaviorArgs,
    ERC4626BaseBehaviorArgs {}

export function describeBehaviorOfSolidStateERC4626(
  deploy: () => Promise<ISolidStateERC4626>,
  args: SolidStateERC4626BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidStateERC4626', function () {
    describeBehaviorOfSolidStateERC20(deploy, args, skips);

    describeBehaviorOfERC4626Base(deploy, args, [
      '::ERC20Base',
      ...(skips ?? []),
    ]);
  });
}
