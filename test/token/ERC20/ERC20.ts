import { describeBehaviorOfERC20 } from '@solidstate/spec/token/ERC20/ERC20.behavior';
import { ethers } from 'hardhat';
import { ERC20Mock, ERC20Mock__factory } from '../../../typechain';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18;
const supply = ethers.utils.parseEther('1');

const deploy = async () => {
  const [deployer] = await ethers.getSigners();
  return new ERC20Mock__factory(deployer).deploy(
    name,
    symbol,
    decimals,
    supply,
  );
};

describe('ERC20', function () {
  let instance: ERC20Mock;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC20(
    {
      deploy: async () => instance,
      mint: async (recipient, amount) => instance.mint(recipient, amount),
      burn: async (recipient, amount) => instance.burn(recipient, amount),
      name,
      symbol,
      decimals,
      supply,
    },
    [],
  );
});
