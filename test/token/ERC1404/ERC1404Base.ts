import { describeBehaviorOfERC1404Base } from '@solidstate/spec';
import {
  ERC1404BaseMock,
  ERC1404BaseMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

let restrictions = [
  { code: 1, message: 'one' },
  { code: 3, message: 'three' },
];

describe('ERC1404Base', () => {
  let instance: ERC1404BaseMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC1404BaseMock__factory(deployer).deploy(
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
    describe('#_detectTransferRestriction(address,address,uint256)', () => {
      it('todo');
    });

    describe('#_messageForTransferRestriction(uint8)', () => {
      it('todo');
    });
  });
});
