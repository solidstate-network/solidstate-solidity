import { describeBehaviorOfSolidStateERC721 } from '@solidstate/spec';
import {
  SolidStateERC721Mock,
  SolidStateERC721Mock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'ERC721Metadata.name';
const symbol = 'ERC721Metadata.symbol';
const tokenURI = 'ERC721Metadata.tokenURI';

describe('SolidStateERC721', () => {
  let instance: SolidStateERC721Mock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new SolidStateERC721Mock__factory(deployer).deploy(
      name,
      symbol,
      tokenURI,
    );
  });

  describeBehaviorOfSolidStateERC721(async () => instance, {
    supply: 0n,
    mint: async (recipient, tokenId) => instance.mint(recipient, tokenId),
    burn: async (tokenId) => instance.burn(tokenId),
    name,
    symbol,
    tokenURI,
  });
});
