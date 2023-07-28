import { describeBehaviorOfERC20Extended } from '@solidstate/spec';
import {
  ERC20ExtendedMock,
  ERC20ExtendedMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC20Extended', () => {
  let instance: ERC20ExtendedMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC20ExtendedMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC20Extended(async () => instance, {
    supply: 0n,
    mint: (recipient, amount) => instance.__mint(recipient, amount),
    burn: (recipient, amount) => instance.__burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.allowance.staticCall(holder, spender),
  });
});
