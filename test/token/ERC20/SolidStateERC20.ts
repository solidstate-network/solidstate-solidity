import { describeBehaviorOfSolidStateERC20 } from '@solidstate/spec';
import {
  SolidStateERC20Mock,
  SolidStateERC20Mock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18;
const supply = ethers.utils.parseEther('1');

describe('SolidStateERC20', function () {
  let instance: SolidStateERC20Mock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new SolidStateERC20Mock__factory(deployer).deploy(
      name,
      symbol,
      decimals,
      supply,
    );
  });

  describeBehaviorOfSolidStateERC20({
    deploy: async () => instance as any,
    mint: async (recipient, amount) => instance.__mint(recipient, amount),
    burn: async (recipient, amount) => instance.__burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.callStatic.allowance(holder, spender),
    name,
    symbol,
    decimals,
    supply,
  });
});
