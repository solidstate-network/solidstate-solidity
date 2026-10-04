import { describeBehaviorOfNonFungibleTokenEnumerable } from '@solidstate/spec';
import {
  type $NonFungibleTokenEnumerable,
  $NonFungibleTokenEnumerable__factory,
} from '@solidstate/typechain-types';
import { network } from 'hardhat';

const connection = await network.create();

describe('NonFungibleTokenEnumerable', () => {
  let instance: $NonFungibleTokenEnumerable;

  beforeEach(async () => {
    const [deployer] = await connection.ethers.getSigners();
    instance = await new $NonFungibleTokenEnumerable__factory(
      deployer,
    ).deploy();
  });

  describeBehaviorOfNonFungibleTokenEnumerable(
    connection,
    async () => instance,
    {
      mint: (recipient, tokenId) => instance.$_mint(recipient, tokenId),
      burn: (tokenId) => instance.$_burn(tokenId),
      supply: 0n,
    },
  );
});
