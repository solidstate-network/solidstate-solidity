import { describeBehaviorOfFungibleTokenMetadata } from '@solidstate/spec';
import {
  $FungibleTokenMetadata,
  $FungibleTokenMetadata__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('FungibleTokenMetadata', () => {
  const name = 'FungibleTokenMetadata.name';
  const symbol = 'FungibleTokenMetadata.symbol';
  const decimals = 18n;
  let instance: $FungibleTokenMetadata;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $FungibleTokenMetadata__factory(deployer).deploy();

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
    await instance.$_setDecimals(decimals);
  });

  describeBehaviorOfFungibleTokenMetadata(async () => instance, {
    name,
    symbol,
    decimals,
  });
});
