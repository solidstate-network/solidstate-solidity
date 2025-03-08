import { describeBehaviorOfERC721Metadata } from '@solidstate/spec';
import {
  __hh_exposed_ERC721Metadata,
  __hh_exposed_ERC721Metadata__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('ERC721Metadata', () => {
  const name = 'ERC721Metadata.name';
  const symbol = 'ERC721Metadata.symbol';
  const baseURI = 'ERC721Metadata.baseURI';
  let instance: __hh_exposed_ERC721Metadata;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_ERC721Metadata__factory(
      deployer,
    ).deploy();

    await instance.__hh_exposed__setName(name);
    await instance.__hh_exposed__setSymbol(symbol);
    await instance.__hh_exposed__setBaseURI(baseURI);
  });

  describeBehaviorOfERC721Metadata(async () => instance, {
    name,
    symbol,
    baseURI,
  });

  // TODO: test that metadata is cleared on burn
});
