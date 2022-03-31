import {
  ERC20Mock,
  ERC20Mock__factory,
  ERC4626Mock,
  ERC4626Mock__factory,
} from '../../../typechain';
import { describeBehaviorOfERC4626 } from '@solidstate/spec';
import { ethers } from 'hardhat';

describe('ERC4626', function () {
  let assetInstance: ERC20Mock;
  let instance: ERC4626Mock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();

    assetInstance = await new ERC20Mock__factory(deployer).deploy(
      '',
      '',
      0,
      ethers.constants.Zero,
    );

    instance = await new ERC4626Mock__factory(deployer).deploy(
      assetInstance.address,
    );
  });

  describeBehaviorOfERC4626({
    deploy: async () => instance as any,
    getAsset: async () => assetInstance,
    mint: (recipient, amount) => instance.__mint(recipient, amount),
    burn: (recipient, amount) => instance.__burn(recipient, amount),
    name: '',
    symbol: '',
    decimals: 0,
    supply: ethers.constants.Zero,
  });
});
