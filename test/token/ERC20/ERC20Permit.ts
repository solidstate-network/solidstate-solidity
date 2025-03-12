import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfERC20Permit } from '@solidstate/spec';
import {
  $ERC20Permit,
  $ERC20Permit__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC20Permit', () => {
  const name = 'ERC20Metadata.name';

  let deployer: SignerWithAddress;
  let instance: $ERC20Permit;

  before(async () => {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new $ERC20Permit__factory(deployer).deploy();

    await instance.$_setName(name);
  });

  describeBehaviorOfERC20Permit(async () => instance, {
    allowance: (holder, spender) =>
      instance.$_allowance.staticCall(holder, spender),
  });

  describe('__internal', () => {
    describe('#_DOMAIN_SEPARATOR()', () => {
      it('changes is token name is changed', async () => {
        const oldDomainSeparator = await instance.DOMAIN_SEPARATOR.staticCall();
        await instance.$_setName(`new ${name}`);
        const newDomainSeparator = await instance.DOMAIN_SEPARATOR.staticCall();
        expect(newDomainSeparator).not.to.eq(oldDomainSeparator);
      });
    });
  });
});
