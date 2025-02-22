import {
  describeBehaviorOfSolidStateERC20,
  SolidStateERC20BehaviorArgs,
} from '../ERC20';
import {
  describeBehaviorOfERC1404Base,
  ERC1404BaseBehaviorArgs,
} from './ERC1404Base.behavior';
import { describeFilter } from '@solidstate/library';
import { ISolidStateERC1404 } from '@solidstate/typechain-types';

export interface SolidStateERC1404BehaviorArgs
  extends SolidStateERC20BehaviorArgs,
    ERC1404BaseBehaviorArgs {}

export function describeBehaviorOfSolidStateERC1404(
  deploy: () => Promise<ISolidStateERC1404>,
  args: SolidStateERC1404BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidStateERC1404', () => {
    describeBehaviorOfSolidStateERC20(deploy, args, skips);

    describeBehaviorOfERC1404Base(deploy, args, [
      '::ERC20Base',
      ...(skips ?? []),
    ]);
  });
}
