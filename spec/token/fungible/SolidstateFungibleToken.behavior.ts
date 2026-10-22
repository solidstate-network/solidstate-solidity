import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfFungibleToken,
  type FungibleTokenBehaviorArgs,
  describeBehaviorOfFungibleTokenExtended,
  type FungibleTokenExtendedBehaviorArgs,
  describeBehaviorOfFungibleTokenMetadata,
  type FungibleTokenMetadataBehaviorArgs,
  describeBehaviorOfFungibleTokenPermit,
  type FungibleTokenPermitBehaviorArgs,
} from '@solidstate/spec';
import type { ISolidstateFungibleToken } from '@solidstate/typechain-types';
import type { NetworkConnection } from 'hardhat/types/network';

export interface SolidstateFungibleTokenBehaviorArgs
  extends
    FungibleTokenBehaviorArgs,
    FungibleTokenExtendedBehaviorArgs,
    FungibleTokenMetadataBehaviorArgs,
    FungibleTokenPermitBehaviorArgs {}

export function describeBehaviorOfSolidstateFungibleToken(
  connection: NetworkConnection,
  deploy: () => Promise<ISolidstateFungibleToken>,
  args: SolidstateFungibleTokenBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidstateFungibleToken', () => {
    describeBehaviorOfFungibleToken(connection, deploy, args, skips);

    describeBehaviorOfFungibleTokenExtended(connection, deploy, args, skips);

    describeBehaviorOfFungibleTokenMetadata(connection, deploy, args, skips);

    describeBehaviorOfFungibleTokenPermit(connection, deploy, args, skips);
  });
}
