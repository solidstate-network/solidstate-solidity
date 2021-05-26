import { describeBehaviorOfERC1155Enumerable } from '@solidstate/spec/token/ERC1155/ERC1155Enumerable.behavior';
import {
  ERC1155EnumerableMock,
  ERC1155EnumerableMock__factory,
} from '../../../typechain';
import { ethers } from 'hardhat';

const deploy = async () => {
  const [deployer] = await ethers.getSigners();
  return new ERC1155EnumerableMock__factory(deployer).deploy();
};

describe('ERC1155Enumerable', function () {
  let instance: ERC1155EnumerableMock;

  beforeEach(async function () {
    instance = await deploy();
  });
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1155Enumerable(
    {
      deploy: async () => instance,
      mint: (recipient, tokenId, amount) =>
        instance.mint(recipient, tokenId, amount),
      burn: (recipient, tokenId, amount) =>
        instance.burn(recipient, tokenId, amount),
    },
    [],
  );
});
