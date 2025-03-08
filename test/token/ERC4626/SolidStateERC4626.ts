import { describeBehaviorOfSolidStateERC4626 } from '@solidstate/spec';
import {
  __hh_exposed_SolidStateERC20,
  __hh_exposed_SolidStateERC20__factory,
  SolidStateERC4626Mock,
  SolidStateERC4626Mock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'ERC20Metadata.name';
const symbol = 'ERC20Metadata.symbol';
const decimals = 18n;

describe('SolidStateERC4626', () => {
  let assetInstance: __hh_exposed_SolidStateERC20;
  let instance: SolidStateERC4626Mock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    assetInstance = await new __hh_exposed_SolidStateERC20__factory(
      deployer,
    ).deploy();

    instance = await new SolidStateERC4626Mock__factory(deployer).deploy(
      await assetInstance.getAddress(),
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
      instance.allowance.staticCall(holder, spender),
    mintAsset: (recipient: string, amount: bigint) =>
      assetInstance.__hh_exposed__mint(recipient, amount),
    name,
    symbol,
    decimals,
    supply: 0n,
  });
});
