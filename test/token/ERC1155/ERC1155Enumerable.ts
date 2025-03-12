import { describeBehaviorOfERC1155Enumerable } from '@solidstate/spec';
import {
  $ERC1155Enumerable,
  $ERC1155Enumerable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC1155Enumerable', () => {
  let instance: $ERC1155Enumerable;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ERC1155Enumerable__factory(deployer).deploy();
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
      instance.$_mint(recipient, tokenId, amount, '0x'),
    burn: (recipient, tokenId, amount) =>
      instance.$_burn(recipient, tokenId, amount),
  });
});
