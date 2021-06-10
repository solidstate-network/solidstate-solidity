import { ethers } from 'hardhat';
import { describeBehaviorOfERC721Metadata } from '@solidstate/spec';
import {
  ERC721MetadataMock,
  ERC721MetadataMock__factory,
} from '../../../typechain';

describe('ERC721Metadata', function () {
  const name = 'ERC721Metadata.name';
  const symbol = 'ERC721Metadata.symbol';
  const tokenURI = 'ERC721Metadata.tokenURI';
  let instance: ERC721MetadataMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC721MetadataMock__factory(deployer).deploy(
      name,
      symbol,
      tokenURI,
    );
  });

  describeBehaviorOfERC721Metadata({
    deploy: async () => instance,
    name,
    symbol,
    tokenURI,
  });
});
