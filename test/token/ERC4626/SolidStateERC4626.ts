import { describeBehaviorOfSolidStateERC4626 } from '@solidstate/spec';
import {
  SolidStateERC20Mock,
  SolidStateERC20Mock__factory,
  SolidStateERC4626Mock,
  SolidStateERC4626Mock__factory,
} from '@solidstate/typechain-types';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18;

describe('SolidStateERC4626', function () {
  let assetInstance: SolidStateERC20Mock;
  let instance: SolidStateERC4626Mock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();

    assetInstance = await new SolidStateERC20Mock__factory(deployer).deploy(
      name,
      symbol,
      decimals,
      ethers.constants.Zero,
    );

    instance = await new SolidStateERC4626Mock__factory(deployer).deploy(
      assetInstance.address,
      name,
      symbol,
      decimals,
    );
  });

  describeBehaviorOfSolidStateERC4626(async () => instance, {
    getAsset: async () => assetInstance,
    mint: (recipient, amount) => instance.__mint(recipient, amount),
    burn: (recipient, amount) => instance.__burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.callStatic.allowance(holder, spender),
    mintAsset: (recipient: string, amount: BigNumber) =>
      assetInstance.__mint(recipient, amount),
    name,
    symbol,
    decimals,
    supply: ethers.constants.Zero,
  });
});
