import { ERC1404BaseMock, ERC1404BaseMock__factory } from '../../../typechain';
import { ethers } from 'hardhat';
import { describeBehaviorOfERC1404Base } from '../../../spec/token/ERC1404/ERC1404Base.behavior';
import { BigNumber } from 'ethers';

let restrictions = [
  { code: ethers.BigNumber.from(1), message: 'one' },
  { code: ethers.BigNumber.from(3), message: 'three' },
];

let deploy = async function () {
  const [deployer] = await ethers.getSigners();
  return new ERC1404BaseMock__factory(deployer).deploy(
    restrictions.map((e) => e.code),
    restrictions.map((e) => e.message),
  );
};

describe('ERC1404Base', function () {
  let instance: ERC1404BaseMock;

  beforeEach(async function () {
    instance = await deploy();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1404Base(
    {
      deploy: async () => instance,
      restrictions,
      supply: ethers.constants.Zero,
      mint: (recipient: string, amount: BigNumber) =>
        instance.mint(recipient, amount),
      burn: (recipient: string, amount: BigNumber) =>
        instance.burn(recipient, amount),
    },
    [],
  );
});
