import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfFungibleToken,
  FungibleTokenBehaviorArgs,
  describeBehaviorOfFungibleTokenExtended,
  FungibleTokenExtendedBehaviorArgs,
  describeBehaviorOfFungibleTokenMetadata,
  FungibleTokenMetadataBehaviorArgs,
  describeBehaviorOfFungibleTokenPermit,
  FungibleTokenPermitBehaviorArgs,
} from '@solidstate/spec';
import { ISolidstateFungibleToken } from '@solidstate/typechain-types';
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
