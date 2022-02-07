import { ethers } from 'hardhat';
import { describeBehaviorOfERC1404Base } from '@solidstate/spec';
import { ERC1404BaseMock, ERC1404BaseMock__factory } from '../../../typechain';
import { BigNumber } from 'ethers';

let restrictions = [
  { code: ethers.BigNumber.from(1), message: 'one' },
  { code: ethers.BigNumber.from(3), message: 'three' },
];

describe('ERC1404Base', function () {
  let instance: ERC1404BaseMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC1404BaseMock__factory(deployer).deploy(
      restrictions.map((e) => e.code),
      restrictions.map((e) => e.message),
    );
  });

  describeBehaviorOfERC1404Base({
    deploy: async () => instance as any,
    restrictions,
    supply: ethers.constants.Zero,
    mint: (recipient: string, amount: BigNumber) =>
      instance.__mint(recipient, amount),
    burn: (recipient: string, amount: BigNumber) =>
      instance.__burn(recipient, amount),
  });

  describe('__internal', function () {
    describe('#_detectTransferRestriction(address,address,uint256)', function () {
      it('todo');
    });

    describe('#_messageForTransferRestriction(uint8)', function () {
      it('todo');
    });
  });
});
