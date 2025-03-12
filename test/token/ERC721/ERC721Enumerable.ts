import { describeBehaviorOfERC721Enumerable } from '@solidstate/spec';
import {
  $ERC721Enumerable,
  $ERC721Enumerable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC721Enumerable', () => {
  let instance: $ERC721Enumerable;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ERC721Enumerable__factory(deployer).deploy();
  });

  describeBehaviorOfERC721Enumerable(async () => instance, {
    mint: (recipient, tokenId) => instance.$_mint(recipient, tokenId),
    burn: (tokenId) => instance.$_burn(tokenId),
    supply: 0n,
  });
});
