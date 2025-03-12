import { describeBehaviorOfSolidstateERC1404 } from '@solidstate/spec';
import {
  $SolidstateERC1404,
  $SolidstateERC1404__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

let restrictions = [
  { code: 1n, message: 'one' },
  { code: 3n, message: 'three' },
];

describe('SolidstateERC1404', () => {
  let instance: $SolidstateERC1404;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $SolidstateERC1404__factory(deployer).deploy();
    await instance.$_setRestrictions(
      restrictions.map((r) => r.code),
      restrictions.map((r) => r.message),
    );
  });

  describeBehaviorOfSolidstateERC1404(async () => instance, {
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
