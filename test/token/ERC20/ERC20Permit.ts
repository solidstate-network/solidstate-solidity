import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfERC20Permit } from '@solidstate/spec';
import {
  __hh_exposed_ERC20Permit,
  __hh_exposed_ERC20Permit__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC20Permit', () => {
  const name = 'ERC20Metadata.name';

  let deployer: SignerWithAddress;
  let instance: __hh_exposed_ERC20Permit;

  before(async () => {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new __hh_exposed_ERC20Permit__factory(deployer).deploy();

    await instance.__hh_exposed__setName(name);
  });

  describeBehaviorOfERC20Permit(async () => instance, {
    allowance: (holder, spender) =>
      instance.__hh_exposed__allowance.staticCall(holder, spender),
  });

  describe('__internal', () => {
    describe('#_setName(string)', () => {
      it('invalidates cached domain separator', async () => {
        const oldDomainSeparator = await instance.DOMAIN_SEPARATOR.staticCall();
        await instance.__hh_exposed__setName(`new ${name}`);
        const newDomainSeparator = await instance.DOMAIN_SEPARATOR.staticCall();
        expect(newDomainSeparator).not.to.eq(oldDomainSeparator);
      });
    });
  });
});
