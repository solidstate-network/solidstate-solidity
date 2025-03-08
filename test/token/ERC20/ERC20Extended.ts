import { describeBehaviorOfERC20Extended } from '@solidstate/spec';
import {
  __hh_exposed_ERC20Extended,
  __hh_exposed_ERC20Extended__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC20Extended', () => {
  let instance: __hh_exposed_ERC20Extended;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_ERC20Extended__factory(deployer).deploy();
  });

  describeBehaviorOfERC20Extended(async () => instance, {
    supply: 0n,
    mint: (recipient, amount) => instance.__hh_exposed__mint(recipient, amount),
    burn: (recipient, amount) => instance.__hh_exposed__burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.__hh_exposed__allowance.staticCall(holder, spender),
  });
});
