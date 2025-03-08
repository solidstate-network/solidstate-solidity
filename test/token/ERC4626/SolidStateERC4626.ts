import { describeBehaviorOfSolidStateERC4626 } from '@solidstate/spec';
import {
  __hh_exposed_SolidStateERC20,
  __hh_exposed_SolidStateERC20__factory,
  __hh_exposed_SolidStateERC4626,
  __hh_exposed_SolidStateERC4626__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18n;

describe('SolidStateERC4626', () => {
  let assetInstance: __hh_exposed_SolidStateERC20;
  let instance: __hh_exposed_SolidStateERC4626;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    assetInstance = await new __hh_exposed_SolidStateERC20__factory(
      deployer,
    ).deploy();

    instance = await new __hh_exposed_SolidStateERC4626__factory(
      deployer,
    ).deploy();

    await instance.__hh_exposed__setAsset(await assetInstance.getAddress());

    await instance.__hh_exposed__setName(name);
    await instance.__hh_exposed__setSymbol(symbol);
    await instance.__hh_exposed__setDecimals(decimals);
  });

  describeBehaviorOfSolidStateERC4626(async () => instance, {
    getAsset: async () => assetInstance,
    mint: (recipient, amount) =>
      instance['__hh_exposed__mint(address,uint256)'](recipient, amount),
    burn: (recipient, amount) => instance.__hh_exposed__burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.allowance.staticCall(holder, spender),
    mintAsset: (recipient: string, amount: bigint) =>
      assetInstance.__hh_exposed__mint(recipient, amount),
    name,
    symbol,
    decimals,
    supply: 0n,
  });
});
