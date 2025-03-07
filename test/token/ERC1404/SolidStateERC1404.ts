import { describeBehaviorOfSolidStateERC1404 } from '@solidstate/spec';
import { ethers } from 'hardhat';

let restrictions = [
  { code: 1n, message: 'one' },
  { code: 3n, message: 'three' },
];

const invalidTransfer = {
  sender: ethers.ZeroAddress,
  receiver: ethers.ZeroAddress,
  amount: 1n,
  code: 3n,
};

describe('SolidStateERC1404', () => {
  let instance: SolidStateERC1404Mock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new SolidStateERC1404Mock__factory(deployer).deploy();
    await instance.setRestrictions(
      restrictions.map((r) => r.code),
      restrictions.map((r) => r.message),
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

  describeBehaviorOfSolidStateERC1404(async () => instance, {
    mint: (recipient, amount) => instance.__mint(recipient, amount),
    burn: (recipient, amount) => instance.__burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.allowance.staticCall(holder, spender),
    restrictions,
    invalidTransfer,
    name: '',
    symbol: '',
    decimals: 0n,
    supply: 0n,
  });
});
