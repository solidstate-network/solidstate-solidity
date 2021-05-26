import { describeBehaviorOfERC20Extended } from '@solidstate/spec/token/ERC20/ERC20Extended.behavior';
import {
  ERC20ExtendedMock,
  ERC20ExtendedMock__factory,
} from '../../../typechain';
import { ethers } from 'hardhat';

let deploy = async function () {
  const [deployer] = await ethers.getSigners();
  return new ERC20ExtendedMock__factory(deployer).deploy();
};

describe('ERC20Extended', function () {
  let instance: ERC20ExtendedMock;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20Extended(
    {
      deploy: async () => instance,
      supply: ethers.constants.Zero,
      mint: (recipient, amount) =>
        instance['mint(address,uint256)'](recipient, amount),
      burn: (recipient, amount) =>
        instance['burn(address,uint256)'](recipient, amount),
    },
    [],
  );
});
