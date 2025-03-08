import { describeBehaviorOfERC721Enumerable } from '@solidstate/spec';
import {
  __hh_exposed_ERC721Enumerable,
  __hh_exposed_ERC721Enumerable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC721Enumerable', () => {
  let instance: __hh_exposed_ERC721Enumerable;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_ERC721Enumerable__factory(
      deployer,
    ).deploy();
  });

  describeBehaviorOfERC721Enumerable(async () => instance, {
    mint: (recipient, tokenId) =>
      instance.__hh_exposed__mint(recipient, tokenId),
    burn: (tokenId) => instance.__hh_exposed__burn(tokenId),
    supply: 0n,
  });
});
