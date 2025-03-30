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

export interface SolidstateFungibleTokenBehaviorArgs
  extends FungibleTokenBehaviorArgs,
    FungibleTokenExtendedBehaviorArgs,
    FungibleTokenMetadataBehaviorArgs,
    FungibleTokenPermitBehaviorArgs {}

export function describeBehaviorOfSolidstateFungibleToken(
  deploy: () => Promise<ISolidstateFungibleToken>,
  args: SolidstateFungibleTokenBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidstateFungibleToken', () => {
    describeBehaviorOfFungibleToken(deploy, args, skips);

    describeBehaviorOfFungibleTokenExtended(deploy, args, skips);

    describeBehaviorOfFungibleTokenMetadata(deploy, args, skips);

    describeBehaviorOfFungibleTokenPermit(deploy, args, skips);
  });
}
