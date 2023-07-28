import { describeBehaviorOfERC1155Enumerable } from '@solidstate/spec';
import {
  ERC1155EnumerableMock,
  ERC1155EnumerableMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC1155Enumerable', () => {
  let instance: ERC1155EnumerableMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC1155EnumerableMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC1155Enumerable(async () => instance, {
    transfer: (from, to, tokenId, amount) =>
      instance
        .connect(from)
        .safeTransferFrom(
          from.address,
          to.address,
          tokenId,
          amount,
          ethers.randomBytes(0),
        ),
    mint: (recipient, tokenId, amount) =>
      instance.__mint(recipient, tokenId, amount),
    burn: (recipient, tokenId, amount) =>
      instance.__burn(recipient, tokenId, amount),
  });
});
