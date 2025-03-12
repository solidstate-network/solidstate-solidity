import { describeBehaviorOfSolidStateERC4626 } from '@solidstate/spec';
import {
  $SolidStateERC20,
  $SolidStateERC20__factory,
  $SolidStateERC4626,
  $SolidStateERC4626__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18n;

describe('SolidStateERC4626', () => {
  let assetInstance: $SolidStateERC20;
  let instance: $SolidStateERC4626;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    assetInstance = await new $SolidStateERC20__factory(deployer).deploy();

    instance = await new $SolidStateERC4626__factory(deployer).deploy();

    await instance.$_setAsset(await assetInstance.getAddress());

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
    await instance.$_setDecimals(decimals);
  });

  describeBehaviorOfSolidStateERC4626(async () => instance, {
    getAsset: async () => assetInstance,
    mint: (recipient, amount) =>
      instance['$_mint(address,uint256)'](recipient, amount),
    burn: (recipient, amount) => instance.$_burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.allowance.staticCall(holder, spender),
    mintAsset: (recipient: string, amount: bigint) =>
      assetInstance.$_mint(recipient, amount),
    name,
    symbol,
    decimals,
    supply: 0n,
  });
});
