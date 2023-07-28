import { describeBehaviorOfERC721Enumerable } from '@solidstate/spec';
import {
  ERC721EnumerableMock,
  ERC721EnumerableMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC721Enumerable', () => {
  let instance: ERC721EnumerableMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC721EnumerableMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC721Enumerable(async () => instance, {
    mint: (recipient, tokenId) => instance.mint(recipient, tokenId),
    burn: (tokenId) => instance.burn(tokenId),
    supply: 0n,
  });
});
