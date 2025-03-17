import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfFungibleTokenPermit } from '@solidstate/spec';
import {
  $FungibleTokenPermit,
  $FungibleTokenPermit__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('FungibleTokenPermit', () => {
  const name = 'FungibleTokenMetadata.name';

  let deployer: SignerWithAddress;
  let instance: $FungibleTokenPermit;

  before(async () => {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new $FungibleTokenPermit__factory(deployer).deploy();

    await instance.$_setName(name);
  });

  describeBehaviorOfFungibleTokenPermit(async () => instance, {
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
