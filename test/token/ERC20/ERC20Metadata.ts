import { describeBehaviorOfERC20Metadata } from '@solidstate/spec';
import {
  $ERC20Metadata,
  $ERC20Metadata__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC20Metadata', () => {
  const name = 'ERC20Metadata.name';
  const symbol = 'ERC20Metadata.symbol';
  const decimals = 18n;
  let instance: $ERC20Metadata;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ERC20Metadata__factory(deployer).deploy();

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
    await instance.$_setDecimals(decimals);
  });

  describeBehaviorOfERC20Metadata(async () => instance, {
    name,
    symbol,
    decimals,
  });
});
