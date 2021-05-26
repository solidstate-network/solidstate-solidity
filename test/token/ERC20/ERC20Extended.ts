import { describeBehaviorOfERC20Extended } from '@solidstate/spec/token/ERC20/ERC20Extended.behavior';
import {
  ERC20ExtendedMock,
  ERC20ExtendedMock__factory,
} from '../../../typechain';
import { ethers } from 'hardhat';

let deploy = async function () {
  return new ERC20ExtendedMock__factory().deploy();
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
      mint: (recipient, amount) => instance.mint(recipient, amount),
      burn: (recipient, amount) => instance.burn(recipient, amount),
    },
    [],
  );
});
