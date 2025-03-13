import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfFungibleVaultTokenBase } from '@solidstate/spec';
import {
  $FungibleVaultTokenBase,
  $FungibleVaultTokenBase__factory,
  $SolidstateFungibleToken,
  $SolidstateFungibleToken__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'FungibleTokenMetadata.name';
const symbol = 'FungibleTokenMetadata.symbol';
const decimals = 18n;

describe('FungibleVaultTokenBase', () => {
  let deployer: SignerWithAddress;
  let depositor: SignerWithAddress;
  let instance: $FungibleVaultTokenBase;
  let assetInstance: $SolidstateFungibleToken;

  before(async () => {
    [deployer, depositor] = await ethers.getSigners();
  });

  beforeEach(async () => {
    assetInstance = await new $SolidstateFungibleToken__factory(
      deployer,
    ).deploy();

    instance = await new $FungibleVaultTokenBase__factory(deployer).deploy();

    await instance.$_setAsset(await assetInstance.getAddress());

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
    await instance.$_setDecimals(decimals);
  });

  describeBehaviorOfFungibleVaultTokenBase(async () => instance, {
    getAsset: async () => assetInstance,
    supply: 0n,
    mint: (recipient: string, amount: bigint) =>
      instance['$_mint(address,uint256)'](recipient, amount),
    burn: (recipient: string, amount: bigint) =>
      instance.$_burn(recipient, amount),
    mintAsset: (recipient: string, amount: bigint) =>
      assetInstance.$_mint(recipient, amount),
    name,
    symbol,
    decimals,
  });
});
