import { describeBehaviorOfFungibleTokenMetadata } from '@solidstate/spec';
import {
  type $FungibleTokenMetadata,
  $FungibleTokenMetadata__factory,
} from '@solidstate/typechain-types';
import { network } from 'hardhat';

const connection = await network.create();

describe('FungibleTokenMetadata', () => {
  const name = 'FungibleTokenMetadata.name';
  const symbol = 'FungibleTokenMetadata.symbol';
  const decimals = 18n;
  let instance: $FungibleTokenMetadata;

  beforeEach(async () => {
    const [deployer] = await connection.ethers.getSigners();
    instance = await new $FungibleTokenMetadata__factory(deployer).deploy();

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
    await instance.$_setDecimals(decimals);
  });

  describeBehaviorOfFungibleTokenMetadata(connection, async () => instance, {
    name,
    symbol,
    decimals,
  });
});
