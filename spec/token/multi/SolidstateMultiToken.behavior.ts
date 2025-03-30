import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfMultiToken,
  MultiTokenBehaviorArgs,
  describeBehaviorOfMultiTokenEnumerable,
  MultiTokenEnumerableBehaviorArgs,
  describeBehaviorOfMultiTokenMetadata,
  MultiTokenMetadataBehaviorArgs,
} from '@solidstate/spec';
import { ISolidstateMultiToken } from '@solidstate/typechain-types';

export interface SolidstateMultiTokenBehaviorArgs
  extends MultiTokenBehaviorArgs,
    MultiTokenEnumerableBehaviorArgs,
    MultiTokenMetadataBehaviorArgs {}

export function describeBehaviorOfSolidstateMultiToken(
  deploy: () => Promise<ISolidstateMultiToken>,
  args: SolidstateMultiTokenBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidstateMultiToken', () => {
    describeBehaviorOfMultiToken(deploy, args, skips);

    describeBehaviorOfMultiTokenEnumerable(deploy, args, skips);

    describeBehaviorOfMultiTokenMetadata(deploy, args, skips);
  });
}
