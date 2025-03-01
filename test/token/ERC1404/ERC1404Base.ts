import { describeBehaviorOfERC1404Base } from '@solidstate/spec';
import {
  ERC1404BaseMock,
  ERC1404BaseMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const restrictions = [
  { code: 1n, message: 'one' },
  { code: 3n, message: 'three' },
];

describe('ERC1404Base', () => {
  let instance: ERC1404BaseMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC1404BaseMock__factory(deployer).deploy();
    await instance.setRestrictions(
      restrictions.map((e) => e.code),
      restrictions.map((e) => e.message),
    );
  });

  describeBehaviorOfERC1404Base(async () => instance, {
    restrictions,
    supply: 0n,
    mint: (recipient: string, amount: bigint) =>
      instance.__mint(recipient, amount),
    burn: (recipient: string, amount: bigint) =>
      instance.__burn(recipient, amount),
  });

  describe('__internal', () => {
    describe('#_setRestrictions', () => {
      it('sets messages for restriction codes', async () => {
        const code = 4n;
        const message = 'err';

        await instance.setRestrictions([code], [message]);

        expect(
          await instance.messageForTransferRestriction.staticCall(code),
        ).to.eq(message);
      });
    });

    describe('#_detectTransferRestriction(address,address,uint256)', () => {
      it('todo');
    });

    describe('#_messageForTransferRestriction(uint8)', () => {
      it('todo');
    });
  });
});
