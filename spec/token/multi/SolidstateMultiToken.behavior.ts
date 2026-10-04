import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfMultiToken,
  type MultiTokenBehaviorArgs,
  describeBehaviorOfMultiTokenEnumerable,
  type MultiTokenEnumerableBehaviorArgs,
  describeBehaviorOfMultiTokenMetadata,
  type MultiTokenMetadataBehaviorArgs,
} from '@solidstate/spec';
import type { ISolidstateMultiToken } from '@solidstate/typechain-types';
import type { NetworkConnection } from 'hardhat/types/network';

export interface SolidstateMultiTokenBehaviorArgs
  extends
    MultiTokenBehaviorArgs,
    MultiTokenEnumerableBehaviorArgs,
    MultiTokenMetadataBehaviorArgs {}

export function describeBehaviorOfSolidstateMultiToken(
  connection: NetworkConnection,
  deploy: () => Promise<ISolidstateMultiToken>,
  args: SolidstateMultiTokenBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidstateMultiToken', () => {
    describeBehaviorOfMultiToken(connection, deploy, args, skips);

    describeBehaviorOfMultiTokenEnumerable(connection, deploy, args, skips);

    describeBehaviorOfMultiTokenMetadata(connection, deploy, args, skips);
  });
}
