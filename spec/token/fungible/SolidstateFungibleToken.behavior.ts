import {
  describeBehaviorOfFungibleTokenBase,
  FungibleTokenBaseBehaviorArgs,
} from './FungibleTokenBase.behavior';
import {
  describeBehaviorOfFungibleTokenExtended,
  FungibleTokenExtendedBehaviorArgs,
} from './FungibleTokenExtended.behavior';
import {
  describeBehaviorOfFungibleTokenMetadata,
  FungibleTokenMetadataBehaviorArgs,
} from './FungibleTokenMetadata.behavior';
import {
  describeBehaviorOfFungibleTokenPermit,
  FungibleTokenPermitBehaviorArgs,
} from './FungibleTokenPermit.behavior';
import { describeFilter } from '@solidstate/library';
import { ISolidstateFungibleToken } from '@solidstate/typechain-types';
import { ContractTransaction } from 'ethers';

export interface SolidstateFungibleTokenBehaviorArgs
  extends FungibleTokenBaseBehaviorArgs,
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
    describeBehaviorOfFungibleTokenBase(deploy, args, skips);

    describeBehaviorOfFungibleTokenExtended(deploy, args, skips);

    describeBehaviorOfFungibleTokenMetadata(deploy, args, skips);

    describeBehaviorOfFungibleTokenPermit(deploy, args, skips);
  });
}
