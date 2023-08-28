import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfERC20Permit } from '@solidstate/spec';
import {
  ERC20PermitMock,
  ERC20PermitMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC20Permit', () => {
  const name = 'ERC20Metadata.name';

  let deployer: SignerWithAddress;
  let instance: ERC20PermitMock;

  before(async () => {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new ERC20PermitMock__factory(deployer).deploy(name);
  });

  describeBehaviorOfERC20Permit(async () => instance, {
    allowance: (holder, spender) =>
      instance.allowance.staticCall(holder, spender),
  });

  describe('__internal', () => {
    describe('#_setName(string)', () => {
      it('invalidates cached domain separator', async () => {
        const oldDomainSeparator = await instance.DOMAIN_SEPARATOR.staticCall();
        await instance.setName(`new ${name}`);
        const newDomainSeparator = await instance.DOMAIN_SEPARATOR.staticCall();
        expect(newDomainSeparator).not.to.eq(oldDomainSeparator);
      });
    });
  });
});
