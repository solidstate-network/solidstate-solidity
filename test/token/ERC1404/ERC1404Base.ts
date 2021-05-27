import { ethers } from 'hardhat';
import { describeBehaviorOfERC1404Base } from '@solidstate/spec';
import {
  ERC1404BaseMock,
  ERC1404BaseMock__factory,
} from '@solidstate/typechain';
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
    deploy: async () => instance,
    restrictions,
    supply: ethers.constants.Zero,
    mint: (recipient: string, amount: BigNumber) =>
      instance['mint(address,uint256)'](recipient, amount),
    burn: (recipient: string, amount: BigNumber) =>
      instance['burn(address,uint256)'](recipient, amount),
  });
});
