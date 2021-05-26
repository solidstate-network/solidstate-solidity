import { ERC1404BaseMock, ERC1404BaseMock__factory } from '../../../typechain';
import { ethers } from 'hardhat';

const describeBehaviorOfERC1404Base = require('@solidstate/spec/token/ERC1404/ERC1404Base.behavior.ts');

let restrictions = [
  { code: ethers.BigNumber.from(1), message: 'one' },
  { code: ethers.BigNumber.from(3), message: 'three' },
];

let deploy = async function () {
  return new ERC1404BaseMock__factory().deploy(
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
      mint: (recipient: string, amount: ethers.BigNumber) =>
        instance.mint(recipient, amount),
      burn: (recipient: string, amount: ethers.BigNumber) =>
        instance.burn(recipient, amount),
    },
    [],
  );
});
