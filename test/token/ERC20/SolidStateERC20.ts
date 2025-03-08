import { describeBehaviorOfSolidStateERC20 } from '@solidstate/spec';
import {
  __hh_exposed_SolidStateERC20,
  __hh_exposed_SolidStateERC20__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18n;
const supply = ethers.parseEther('1');

describe('SolidStateERC20', () => {
  let instance: __hh_exposed_SolidStateERC20;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_SolidStateERC20__factory(
      deployer,
    ).deploy();

    await instance.__hh_exposed__setName(name);
    await instance.__hh_exposed__setSymbol(symbol);
    await instance.__hh_exposed__setDecimals(decimals);

    await instance.__hh_exposed__mint(await deployer.getAddress(), supply);
  });

  describeBehaviorOfSolidStateERC20(async () => instance, {
    mint: async (recipient, amount) =>
      instance.__hh_exposed__mint(recipient, amount),
    burn: async (recipient, amount) =>
      instance.__hh_exposed__burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.allowance.staticCall(holder, spender),
    name,
    symbol,
    decimals,
    supply,
  });
});
