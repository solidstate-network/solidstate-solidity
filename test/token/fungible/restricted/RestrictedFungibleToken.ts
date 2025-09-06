import { describeBehaviorOfRestrictedFungibleToken } from '@solidstate/spec';
import {
  $RestrictedFungibleToken,
  $RestrictedFungibleToken__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const restrictions = [
  { code: 1n, message: 'one' },
  { code: 3n, message: 'three' },
];

describe('RestrictedFungibleToken', () => {
  let instance: $RestrictedFungibleToken;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $RestrictedFungibleToken__factory(deployer).deploy();
    await instance.$_setRestrictions(
      restrictions.map((e) => e.code),
      restrictions.map((e) => e.message),
    );
  });

  describeBehaviorOfRestrictedFungibleToken(async () => instance, {
    restrictions,
    supply: 0n,
    mint: (recipient: string, amount: bigint) =>
      instance.$_mint(recipient, amount),
    burn: (recipient: string, amount: bigint) =>
      instance.$_burn(recipient, amount),
  });

  describe('#_setRestrictions', () => {
    it('sets messages for restriction codes', async () => {
      const code = 4n;
      const message = 'err';

      await instance.$_setRestrictions([code], [message]);

      expect(
        await instance.messageForTransferRestriction.staticCall(code),
      ).to.eq(message);
    });

    describe('reverts if', () => {
      it('array lengts do not match', async () => {
        await expect(
          instance.$_setRestrictions([0n], []),
        ).to.be.revertedWithCustomError(
          instance,
          'RestrictedFungibleToken__ArrayLengthMismatch',
        );
      });
    });
  });
});
