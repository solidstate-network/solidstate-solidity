import { describeBehaviorOfERC20Extended } from '@solidstate/spec';
import {
  ERC20ExtendedMock,
  ERC20ExtendedMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC20Extended', function () {
  let instance: ERC20ExtendedMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC20ExtendedMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC20Extended({
    deploy: async () => instance as any,
    supply: ethers.constants.Zero,
    mint: (recipient, amount) => instance.__mint(recipient, amount),
    burn: (recipient, amount) => instance.__burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.callStatic.allowance(holder, spender),
  });
});
