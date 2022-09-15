import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfERC20Permit } from '@solidstate/spec';
import {
  ERC20PermitMock,
  ERC20PermitMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC20Permit', function () {
  const name = 'ERC20Metadata.name';

  let deployer: SignerWithAddress;
  let instance: ERC20PermitMock;

  before(async function () {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await new ERC20PermitMock__factory(deployer).deploy(name);
  });

  describeBehaviorOfERC20Permit(async () => instance, {
    allowance: (holder, spender) =>
      instance.callStatic.allowance(holder, spender),
  });
});
