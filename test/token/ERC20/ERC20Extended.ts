import { ethers } from 'hardhat';
import { describeBehaviorOfERC20Extended } from '@solidstate/spec';
import {
  ERC20ExtendedMock,
  ERC20ExtendedMock__factory,
} from '../../../typechain';

describe('ERC20Extended', function () {
  let instance: ERC20ExtendedMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC20ExtendedMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC20Extended({
    deploy: async () => instance as any,
    supply: ethers.constants.Zero,
    mint: (recipient, amount) =>
      instance['mint(address,uint256)'](recipient, amount),
    burn: (recipient, amount) =>
      instance['burn(address,uint256)'](recipient, amount),
  });
});
