import { describeBehaviorOfSolidStateERC1404 } from '@solidstate/spec';
import {
  SolidStateERC1404Mock,
  SolidStateERC1404Mock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

let restrictions = [
  { code: 1, message: 'one' },
  { code: 3, message: 'three' },
];

describe('SolidStateERC1404', () => {
  let instance: SolidStateERC1404Mock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new SolidStateERC1404Mock__factory(deployer).deploy(
      restrictions.map((r) => r.code),
      restrictions.map((r) => r.message),
    );
  });

  describeBehaviorOfSolidStateERC1404(async () => instance, {
    mint: (recipient, amount) => instance.__mint(recipient, amount),
    burn: (recipient, amount) => instance.__burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.allowance.staticCall(holder, spender),
    restrictions,
    name: '',
    symbol: '',
    decimals: 0,
    supply: 0n,
  });
});
