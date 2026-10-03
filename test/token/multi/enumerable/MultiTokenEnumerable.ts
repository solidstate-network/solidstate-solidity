import { describeBehaviorOfMultiTokenEnumerable } from '@solidstate/spec';
import {
  type $MultiTokenEnumerable,
  $MultiTokenEnumerable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'ethers';
import { network } from 'hardhat';

const connection = await network.create();

describe('MultiTokenEnumerable', () => {
  let instance: $MultiTokenEnumerable;

  beforeEach(async () => {
    const [deployer] = await connection.ethers.getSigners();
    instance = await new $MultiTokenEnumerable__factory(deployer).deploy();
  });

  describeBehaviorOfMultiTokenEnumerable(connection, async () => instance, {
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
