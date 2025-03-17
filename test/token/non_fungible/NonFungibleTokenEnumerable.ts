import { describeBehaviorOfNonFungibleTokenEnumerable } from '@solidstate/spec';
import {
  $NonFungibleTokenEnumerable,
  $NonFungibleTokenEnumerable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('NonFungibleTokenEnumerable', () => {
  let instance: $NonFungibleTokenEnumerable;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $NonFungibleTokenEnumerable__factory(
      deployer,
    ).deploy();
  });

  describeBehaviorOfNonFungibleTokenEnumerable(async () => instance, {
    mint: (recipient, tokenId) => instance.$_mint(recipient, tokenId),
    burn: (tokenId) => instance.$_burn(tokenId),
    supply: 0n,
  });
});
