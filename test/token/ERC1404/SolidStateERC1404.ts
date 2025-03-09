import { describeBehaviorOfSolidStateERC1404 } from '@solidstate/spec';
import {
  __hh_exposed_SolidStateERC1404,
  __hh_exposed_SolidStateERC1404__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

let restrictions = [
  { code: 1n, message: 'one' },
  { code: 3n, message: 'three' },
];

describe('SolidStateERC1404', () => {
  let instance: __hh_exposed_SolidStateERC1404;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_SolidStateERC1404__factory(
      deployer,
    ).deploy();
    await instance.__hh_exposed__setRestrictions(
      restrictions.map((r) => r.code),
      restrictions.map((r) => r.message),
    );
  });

  describeBehaviorOfSolidStateERC1404(async () => instance, {
    mint: (recipient, amount) => instance.__hh_exposed__mint(recipient, amount),
    burn: (recipient, amount) => instance.__hh_exposed__burn(recipient, amount),
    allowance: (holder, spender) =>
      instance.allowance.staticCall(holder, spender),
    restrictions,
    name: '',
    symbol: '',
    decimals: 0n,
    supply: 0n,
  });
});
