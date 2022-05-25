import { describeBehaviorOfERC20 } from '@solidstate/spec';
import { ERC20Mock, ERC20Mock__factory } from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

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

  describeBehaviorOfERC20({
    deploy: async () => instance as any,
    mint: async (recipient, amount) => instance.__mint(recipient, amount),
    burn: async (recipient, amount) => instance.__burn(recipient, amount),
    name,
    symbol,
    decimals,
    supply,
  });
});
