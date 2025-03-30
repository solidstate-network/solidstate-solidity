import { describeBehaviorOfFungibleTokenExtended } from '@solidstate/spec';
import {
  $FungibleTokenExtended,
  $FungibleTokenExtended__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('FungibleTokenExtended', () => {
  let instance: $FungibleTokenExtended;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $FungibleTokenExtended__factory(deployer).deploy();
  });

  describeBehaviorOfFungibleTokenExtended(async () => instance, {
    supply: 0n,
    mint: (recipient, amount) => instance.$_mint(recipient, amount),
    burn: (recipient, amount) => instance.$_burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.$_allowance.staticCall(holder, spender),
  });
});
