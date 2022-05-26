import { describeBehaviorOfERC721Enumerable } from '@solidstate/spec';
import {
  ERC721EnumerableMock,
  ERC721EnumerableMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC721Enumerable', function () {
  let instance: ERC721EnumerableMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC721EnumerableMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC721Enumerable({
    deploy: async () => instance,
    mint: (recipient, tokenId) =>
      instance['mint(address,uint256)'](recipient, tokenId),
    burn: (tokenId) => instance['burn(uint256)'](tokenId),
    supply: ethers.constants.Zero,
  });
});
