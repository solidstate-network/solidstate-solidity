import { describeBehaviorOfERC20Extended } from '@solidstate/spec';
import {
  $ERC20Extended,
  $ERC20Extended__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC20Extended', () => {
  let instance: $ERC20Extended;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ERC20Extended__factory(deployer).deploy();
  });

  describeBehaviorOfERC20Extended(async () => instance, {
    supply: 0n,
    mint: (recipient, amount) => instance.$_mint(recipient, amount),
    burn: (recipient, amount) => instance.$_burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.$_allowance.staticCall(holder, spender),
  });
});
