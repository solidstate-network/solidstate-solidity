import { describeBehaviorOfERC721Metadata } from '@solidstate/spec';
import {
  ERC721MetadataMock,
  ERC721MetadataMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC721Metadata', () => {
  const name = 'ERC721Metadata.name';
  const symbol = 'ERC721Metadata.symbol';
  const tokenURI = 'ERC721Metadata.tokenURI';
  let instance: ERC721MetadataMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC721MetadataMock__factory(deployer).deploy(
      name,
      symbol,
      tokenURI,
    );
  });

  describeBehaviorOfERC721Metadata(async () => instance, {
    name,
    symbol,
    tokenURI,
  });

  // TODO: test that metadata is cleared on burn
});
