import { describeBehaviorOfERC20 } from '@solidstate/spec';
import { ethers } from 'hardhat';
import { ERC20Mock, ERC20Mock__factory } from '@solidstate/typechain';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18;
const supply = ethers.utils.parseEther('1');

describe('ERC20', function () {
  let instance: ERC20Mock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC20Mock__factory(deployer).deploy(
      name,
      symbol,
      decimals,
      supply,
    );
  });

  describeBehaviorOfERC20(
    {
      deploy: async () => instance,
      mint: async (recipient, amount) =>
        instance['mint(address,uint256)'](recipient, amount),
      burn: async (recipient, amount) =>
        instance['burn(address,uint256)'](recipient, amount),
      name,
      symbol,
      decimals,
      supply,
    },
    [],
  );
});
