import { describeBehaviorOfERC1155Enumerable } from '@solidstate/spec';
import {
  __hh_exposed_ERC1155Enumerable,
  __hh_exposed_ERC1155Enumerable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC1155Enumerable', () => {
  let instance: __hh_exposed_ERC1155Enumerable;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_ERC1155Enumerable__factory(
      deployer,
    ).deploy();
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
      instance.__hh_exposed__mint(recipient, tokenId, amount, '0x'),
    burn: (recipient, tokenId, amount) =>
      instance.__hh_exposed__burn(recipient, tokenId, amount),
  });
});
