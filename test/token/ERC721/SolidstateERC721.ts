import { describeBehaviorOfSolidstateERC721 } from '@solidstate/spec';
import {
  $SolidstateERC721,
  $SolidstateERC721__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'ERC721Metadata.name';
const symbol = 'ERC721Metadata.symbol';
const baseURI = 'ERC721Metadata.baseURI';

describe('SolidstateERC721', () => {
  let instance: $SolidstateERC721;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $SolidstateERC721__factory(deployer).deploy();

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
    await instance.$_setBaseURI(baseURI);

    await instance.$_setSupportsInterface('0x01ffc9a7', true);
    await instance.$_setSupportsInterface('0x80ac58cd', true);
  });

  describeBehaviorOfSolidstateERC721(async () => instance, {
    supply: 0n,
    mint: async (recipient, tokenId) => instance.$_mint(recipient, tokenId),
    burn: async (tokenId) => instance.$_burn(tokenId),
    name,
    symbol,
    baseURI,
  });
});
