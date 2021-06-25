import { ethers } from 'hardhat';
import { describeBehaviorOfERC20Permit } from '@solidstate/spec';
import { ERC20PermitMock, ERC20PermitMock__factory } from '../../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('ERC20Permit', function () {
  const name = 'ERC20Metadata.name';
  const symbol = 'ERC20Metadata.symbol';
  const decimals = 18;

  let deployer: SignerWithAddress;
  let instance: ERC20PermitMock;

  before(async function () {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await new ERC20PermitMock__factory(deployer).deploy(
      name,
      symbol,
      decimals,
    );
  });

  describeBehaviorOfERC20Permit({
    deploy: async () => instance as any,
    supply: ethers.constants.Zero,
    mint: (recipient, amount) =>
      instance['mint(address,uint256)'](recipient, amount),
    burn: (recipient, amount) =>
      instance['burn(address,uint256)'](recipient, amount),
    name,
    symbol,
    decimals,
  });
});
