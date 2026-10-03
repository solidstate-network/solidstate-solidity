import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeBehaviorOfFungibleVaultToken } from '@solidstate/spec';
import {
  type $FungibleVaultToken,
  $FungibleVaultToken__factory,
  type $SolidstateFungibleToken,
  $SolidstateFungibleToken__factory,
} from '@solidstate/typechain-types';
import { network } from 'hardhat';

const connection = await network.create();

const name = 'FungibleTokenMetadata.name';
const symbol = 'FungibleTokenMetadata.symbol';
const decimals = 18n;

describe('FungibleVaultToken', () => {
  let deployer: HardhatEthersSigner;
  let depositor: HardhatEthersSigner;
  let instance: $FungibleVaultToken;
  let assetInstance: $SolidstateFungibleToken;

  before(async () => {
    [deployer, depositor] = await connection.ethers.getSigners();
  });

  beforeEach(async () => {
    assetInstance = await new $SolidstateFungibleToken__factory(
      deployer,
    ).deploy();

    instance = await new $FungibleVaultToken__factory(deployer).deploy();

    await instance.$_setAsset(await assetInstance.getAddress());

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
    await instance.$_setDecimals(decimals);
  });

  describeBehaviorOfFungibleVaultToken(connection, async () => instance, {
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
