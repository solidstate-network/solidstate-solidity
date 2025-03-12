import { describeBehaviorOfSolidStateERC20 } from '@solidstate/spec';
import {
  $SolidStateERC20,
  $SolidStateERC20__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18n;
const supply = ethers.parseEther('1');

describe('SolidStateERC20', () => {
  let instance: $SolidStateERC20;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $SolidStateERC20__factory(deployer).deploy();

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
    await instance.$_setDecimals(decimals);

    await instance.$_mint(await deployer.getAddress(), supply);
  });

  describeBehaviorOfSolidStateERC20(async () => instance, {
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
