import {
  describeBehaviorOfMultiTokenBase,
  MultiTokenBaseBehaviorArgs,
} from './MultiTokenBase.behavior';
import {
  describeBehaviorOfMultiTokenEnumerable,
  MultiTokenEnumerableBehaviorArgs,
} from './MultiTokenEnumerable.behavior';
import {
  describeBehaviorOfMultiTokenMetadata,
  MultiTokenMetadataBehaviorArgs,
} from './MultiTokenMetadata.behavior';
import { describeFilter } from '@solidstate/library';
import { ISolidstateMultiToken } from '@solidstate/typechain-types';

export interface SolidstateMultiTokenBehaviorArgs
  extends MultiTokenBaseBehaviorArgs,
    MultiTokenEnumerableBehaviorArgs,
    MultiTokenMetadataBehaviorArgs {}

export function describeBehaviorOfSolidstateMultiToken(
  deploy: () => Promise<ISolidstateMultiToken>,
  args: SolidstateMultiTokenBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidstateMultiToken', () => {
    describeBehaviorOfMultiTokenBase(deploy, args, skips);

    describeBehaviorOfMultiTokenEnumerable(deploy, args, skips);

    describeBehaviorOfMultiTokenMetadata(deploy, args, skips);
  });
}
