import {
  ERC1155EnumerableMock,
  ERC1155EnumerableMock__factory,
} from '../../../typechain';
import { describeBehaviorOfERC1155Enumerable } from '@solidstate/spec';
import { ethers } from 'hardhat';

describe('ERC1155Enumerable', function () {
  let instance: ERC1155EnumerableMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC1155EnumerableMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC1155Enumerable({
    deploy: async () => instance as any,
    mint: (recipient, tokenId, amount) =>
      instance.__mint(recipient, tokenId, amount),
    burn: (recipient, tokenId, amount) =>
      instance.__burn(recipient, tokenId, amount),
  });
});
