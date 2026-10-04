import { describeBehaviorOfFungibleTokenExtended } from '@solidstate/spec';
import {
  type $FungibleTokenExtended,
  $FungibleTokenExtended__factory,
} from '@solidstate/typechain-types';
import { network } from 'hardhat';

const connection = await network.create();

describe('FungibleTokenExtended', () => {
  let instance: $FungibleTokenExtended;

  beforeEach(async () => {
    const [deployer] = await connection.ethers.getSigners();
    instance = await new $FungibleTokenExtended__factory(deployer).deploy();
  });

  describeBehaviorOfFungibleTokenExtended(connection, async () => instance, {
    supply: 0n,
    mint: (recipient, amount) => instance.$_mint(recipient, amount),
    burn: (recipient, amount) => instance.$_burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.$_allowance.staticCall(holder, spender),
  });
});
