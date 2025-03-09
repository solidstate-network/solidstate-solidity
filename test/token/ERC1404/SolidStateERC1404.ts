import { describeBehaviorOfSolidStateERC1404 } from '@solidstate/spec';
import {
  $SolidStateERC1404,
  $SolidStateERC1404__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

let restrictions = [
  { code: 1n, message: 'one' },
  { code: 3n, message: 'three' },
];

describe('SolidStateERC1404', () => {
  let instance: $SolidStateERC1404;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $SolidStateERC1404__factory(deployer).deploy();
    await instance.$_setRestrictions(
      restrictions.map((r) => r.code),
      restrictions.map((r) => r.message),
    );
  });

  describeBehaviorOfSolidStateERC1404(async () => instance, {
    mint: (recipient, amount) => instance.$_mint(recipient, amount),
    burn: (recipient, amount) => instance.$_burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.allowance.staticCall(holder, spender),
    restrictions,
    name: '',
    symbol: '',
    decimals: 0n,
    supply: 0n,
  });
});
