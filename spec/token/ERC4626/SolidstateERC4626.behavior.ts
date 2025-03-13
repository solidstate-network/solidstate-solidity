import {
  describeBehaviorOfSolidstateFungibleToken,
  SolidstateFungibleTokenBehaviorArgs,
} from '../fungible';
import {
  describeBehaviorOfERC4626Base,
  ERC4626BaseBehaviorArgs,
} from './ERC4626Base.behavior';
import { describeFilter } from '@solidstate/library';
import { ISolidstateERC4626 } from '@solidstate/typechain-types';

export interface SolidstateERC4626BehaviorArgs
  extends SolidstateFungibleTokenBehaviorArgs,
    ERC4626BaseBehaviorArgs {}

export function describeBehaviorOfSolidstateERC4626(
  deploy: () => Promise<ISolidstateERC4626>,
  args: SolidstateERC4626BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidstateERC4626', () => {
    describeBehaviorOfSolidstateFungibleToken(deploy, args, skips);

    describeBehaviorOfERC4626Base(deploy, args, [
      '::FungibleTokenBase',
      '::FungibleTokenMetadata',
      ...(skips ?? []),
    ]);
  });
}
