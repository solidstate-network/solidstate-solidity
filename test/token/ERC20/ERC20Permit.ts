import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfERC20Permit } from '@solidstate/spec';
import {
  ERC20PermitMock,
  ERC20PermitMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

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

  describeBehaviorOfERC20Permit(async () => instance, {
    supply: ethers.constants.Zero,
    mint: (recipient, amount) => instance.__mint(recipient, amount),
    burn: (recipient, amount) => instance.__burn(recipient, amount),
    name,
    symbol,
    decimals,
  });
});
