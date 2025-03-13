import { describeBehaviorOfSolidstateERC4626 } from '@solidstate/spec';
import {
  $SolidstateERC20,
  $SolidstateERC20__factory,
  $SolidstateERC4626,
  $SolidstateERC4626__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18n;

describe('SolidstateERC4626', () => {
  let assetInstance: $SolidstateERC20;
  let instance: $SolidstateERC4626;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    assetInstance = await new $SolidstateERC20__factory(deployer).deploy();

    instance = await new $SolidstateERC4626__factory(deployer).deploy();

    await instance.$_setAsset(await assetInstance.getAddress());

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
    await instance.$_setDecimals(decimals);
  });

  describeBehaviorOfSolidstateERC4626(async () => instance, {
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
