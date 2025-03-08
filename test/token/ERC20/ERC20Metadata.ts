import { describeBehaviorOfERC20Metadata } from '@solidstate/spec';
import {
  __hh_exposed_ERC20Metadata,
  __hh_exposed_ERC20Metadata__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC20Metadata', () => {
  const name = 'ERC20Metadata.name';
  const symbol = 'ERC20Metadata.symbol';
  const decimals = 18n;
  let instance: __hh_exposed_ERC20Metadata;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_ERC20Metadata__factory(deployer).deploy();

    await instance.__hh_exposed__setName(name);
    await instance.__hh_exposed__setSymbol(symbol);
    await instance.__hh_exposed__setDecimals(decimals);
  });

  describeBehaviorOfERC20Metadata(async () => instance, {
    name,
    symbol,
    decimals,
  });
});
