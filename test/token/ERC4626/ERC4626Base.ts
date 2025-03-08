import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfERC4626Base } from '@solidstate/spec';
import {
  __hh_exposed_ERC4626Base,
  __hh_exposed_ERC4626Base__factory,
  __hh_exposed_SolidStateERC20,
  __hh_exposed_SolidStateERC20__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18n;

describe('ERC4626Base', () => {
  let deployer: SignerWithAddress;
  let depositor: SignerWithAddress;
  let instance: __hh_exposed_ERC4626Base;
  let assetInstance: __hh_exposed_SolidStateERC20;

  before(async () => {
    [deployer, depositor] = await ethers.getSigners();
  });

  beforeEach(async () => {
    assetInstance = await new __hh_exposed_SolidStateERC20__factory(
      deployer,
    ).deploy();

    instance = await new __hh_exposed_ERC4626Base__factory(deployer).deploy();

    await instance.__hh_exposed__setAsset(await assetInstance.getAddress());

    await instance.__hh_exposed__setName(name);
    await instance.__hh_exposed__setSymbol(symbol);
    await instance.__hh_exposed__setDecimals(decimals);
  });

  describeBehaviorOfERC4626Base(async () => instance, {
    getAsset: async () => assetInstance,
    supply: 0n,
    mint: (recipient: string, amount: bigint) =>
      instance['__hh_exposed__mint(address,uint256)'](recipient, amount),
    burn: (recipient: string, amount: bigint) =>
      instance.__hh_exposed__burn(recipient, amount),
    mintAsset: (recipient: string, amount: bigint) =>
      assetInstance.__hh_exposed__mint(recipient, amount),
    name,
    symbol,
    decimals,
  });
});
