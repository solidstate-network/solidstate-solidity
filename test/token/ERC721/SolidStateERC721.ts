import { describeBehaviorOfSolidStateERC721 } from '@solidstate/spec';
import {
  __hh_exposed_SolidStateERC721,
  __hh_exposed_SolidStateERC721__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'ERC721Metadata.name';
const symbol = 'ERC721Metadata.symbol';
const baseURI = 'ERC721Metadata.baseURI';

describe('SolidStateERC721', () => {
  let instance: __hh_exposed_SolidStateERC721;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_SolidStateERC721__factory(
      deployer,
    ).deploy();

    await instance.__hh_exposed__setName(name);
    await instance.__hh_exposed__setSymbol(symbol);
    await instance.__hh_exposed__setBaseURI(baseURI);

    await instance.__hh_exposed__setSupportsInterface('0x01ffc9a7', true);
    await instance.__hh_exposed__setSupportsInterface('0x80ac58cd', true);
  });

  describeBehaviorOfSolidStateERC721(async () => instance, {
    supply: 0n,
    mint: async (recipient, tokenId) =>
      instance.__hh_exposed__mint(recipient, tokenId),
    burn: async (tokenId) => instance.__hh_exposed__burn(tokenId),
    name,
    symbol,
    baseURI,
  });
});
