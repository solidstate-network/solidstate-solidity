import { describeBehaviorOfSolidstateFungibleToken } from '@solidstate/spec';
import {
  $SolidstateFungibleToken,
  $SolidstateFungibleToken__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'FungibleTokenMetadata.name';
const symbol = 'FungibleTokenMetadata.symbol';
const decimals = 18n;
const supply = ethers.parseEther('1');

describe('SolidstateFungibleToken', () => {
  let instance: $SolidstateFungibleToken;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $SolidstateFungibleToken__factory(deployer).deploy();

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
    await instance.$_setDecimals(decimals);

    await instance.$_mint(await deployer.getAddress(), supply);
  });

  describeBehaviorOfSolidstateFungibleToken(async () => instance, {
    mint: async (recipient, amount) => instance.$_mint(recipient, amount),
    burn: async (recipient, amount) => instance.$_burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.allowance.staticCall(holder, spender),
    name,
    symbol,
    decimals,
    supply,
  });
});
