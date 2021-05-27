import { ethers } from 'hardhat';
import { describeBehaviorOfERC1155Enumerable } from '@solidstate/spec';
import {
  ERC1155EnumerableMock,
  ERC1155EnumerableMock__factory,
} from '@solidstate/typechain';

describe('ERC1155Enumerable', function () {
  let instance: ERC1155EnumerableMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC1155EnumerableMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC1155Enumerable({
    deploy: async () => instance,
    mint: (recipient, tokenId, amount) =>
      instance['mint(address,uint256,uint256)'](recipient, tokenId, amount),
    burn: (recipient, tokenId, amount) =>
      instance['burn(address,uint256,uint256)'](recipient, tokenId, amount),
  });
});
