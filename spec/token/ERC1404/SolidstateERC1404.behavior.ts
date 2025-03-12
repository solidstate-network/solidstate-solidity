import {
  describeBehaviorOfSolidstateERC20,
  SolidstateERC20BehaviorArgs,
} from '../ERC20';
import {
  describeBehaviorOfERC1404Base,
  ERC1404BaseBehaviorArgs,
} from './ERC1404Base.behavior';
import { describeFilter } from '@solidstate/library';
import { ISolidstateERC1404 } from '@solidstate/typechain-types';

export interface SolidstateERC1404BehaviorArgs
  extends SolidstateERC20BehaviorArgs,
    ERC1404BaseBehaviorArgs {}

export function describeBehaviorOfSolidstateERC1404(
  deploy: () => Promise<ISolidstateERC1404>,
  args: SolidstateERC1404BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidstateERC1404', () => {
    describeBehaviorOfSolidstateERC20(deploy, args, skips);

    describeBehaviorOfERC1404Base(deploy, args, [
      '::ERC20Base',
      ...(skips ?? []),
    ]);
  });
}
