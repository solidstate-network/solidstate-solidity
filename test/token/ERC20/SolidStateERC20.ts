import { describeBehaviorOfSolidStateERC20 } from '@solidstate/spec';
import {
  SolidStateERC20Mock,
  SolidStateERC20Mock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18;
const supply = ethers.parseEther('1');

describe('SolidStateERC20', () => {
  let instance: SolidStateERC20Mock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new SolidStateERC20Mock__factory(deployer).deploy(
      name,
      symbol,
      decimals,
      supply,
    );
  });

  describeBehaviorOfSolidStateERC20(async () => instance, {
    mint: async (recipient, amount) => instance.__mint(recipient, amount),
    burn: async (recipient, amount) => instance.__burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.allowance.staticCall(holder, spender),
    name,
    symbol,
    decimals,
    supply,
  });
});
