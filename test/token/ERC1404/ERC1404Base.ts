import { describeBehaviorOfERC1404Base } from '@solidstate/spec';
import {
  __hh_exposed_ERC1404Base,
  __hh_exposed_ERC1404Base__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const restrictions = [
  { code: 1n, message: 'one' },
  { code: 3n, message: 'three' },
];

describe('ERC1404Base', () => {
  let instance: __hh_exposed_ERC1404Base;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_ERC1404Base__factory(deployer).deploy();
    await instance.__hh_exposed__setRestrictions(
      restrictions.map((e) => e.code),
      restrictions.map((e) => e.message),
    );
  });

  describeBehaviorOfERC1404Base(async () => instance, {
    restrictions,
    supply: 0n,
    mint: (recipient: string, amount: bigint) =>
      instance.__hh_exposed__mint(recipient, amount),
    burn: (recipient: string, amount: bigint) =>
      instance.__hh_exposed__burn(recipient, amount),
  });

  describe('__internal', () => {
    describe('#_setRestrictions', () => {
      it('sets messages for restriction codes', async () => {
        const code = 4n;
        const message = 'err';

        await instance.__hh_exposed__setRestrictions([code], [message]);

        expect(
          await instance.messageForTransferRestriction.staticCall(code),
        ).to.eq(message);
      });

      describe('reverts if', () => {
        it('array lengts do not match', async () => {
          await expect(
            instance.__hh_exposed__setRestrictions([0n], []),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC1404Base__ArrayLengthMismatch',
          );
        });
      });
    });
  });
});
