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

const invalidTransfer = {
  sender: ethers.ZeroAddress,
  receiver: ethers.ZeroAddress,
  amount: 1n,
  code: 3n,
};

describe('ERC1404Base', () => {
  let instance: ERC1404BaseMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC1404BaseMock__factory(deployer).deploy();
    await instance.setRestrictions(
      restrictions.map((e) => e.code),
      restrictions.map((e) => e.message),
    );
    invalidTransfer.sender = await deployer.getAddress();
    invalidTransfer.receiver = await deployer.getAddress();
    await instance.setInvalidTransfer(
      invalidTransfer.sender,
      invalidTransfer.receiver,
      invalidTransfer.amount,
      invalidTransfer.code,
    );
  });

  describeBehaviorOfERC1404Base(async () => instance, {
    restrictions,
    invalidTransfer,
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
  });
});
