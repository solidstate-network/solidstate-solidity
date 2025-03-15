import { describeBehaviorOfMultiTokenEnumerable } from '@solidstate/spec';
import {
  $MultiTokenEnumerable,
  $MultiTokenEnumerable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('MultiTokenEnumerable', () => {
  let instance: $MultiTokenEnumerable;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $MultiTokenEnumerable__factory(deployer).deploy();
  });

  describeBehaviorOfMultiTokenEnumerable(async () => instance, {
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
