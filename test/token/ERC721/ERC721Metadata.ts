import { describeBehaviorOfERC721Metadata } from '@solidstate/spec';
import {
  $ERC721Metadata,
  $ERC721Metadata__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC721Metadata', () => {
  const name = 'ERC721Metadata.name';
  const symbol = 'ERC721Metadata.symbol';
  const baseURI = 'ERC721Metadata.baseURI';
  let instance: $ERC721Metadata;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $ERC721Metadata__factory(deployer).deploy();

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
    await instance.$_setBaseURI(baseURI);
  });

  describeBehaviorOfERC721Metadata(async () => instance, {
    name,
    symbol,
    baseURI,
  });

  // TODO: test that metadata is cleared on burn
});
