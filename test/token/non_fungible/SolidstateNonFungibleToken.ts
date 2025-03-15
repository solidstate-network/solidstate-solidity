import { describeBehaviorOfSolidstateNonFungibleToken } from '@solidstate/spec';
import {
  $SolidstateNonFungibleToken,
  $SolidstateNonFungibleToken__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

const name = 'NonFungibleTokenMetadata.name';
const symbol = 'NonFungibleTokenMetadata.symbol';
const baseURI = 'NonFungibleTokenMetadata.baseURI';

describe('SolidstateNonFungibleToken', () => {
  let instance: $SolidstateNonFungibleToken;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $SolidstateNonFungibleToken__factory(
      deployer,
    ).deploy();

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
    await instance.$_setBaseURI(baseURI);

    await instance.$_setSupportsInterface('0x01ffc9a7', true);
    await instance.$_setSupportsInterface('0x80ac58cd', true);
  });

  describeBehaviorOfSolidstateNonFungibleToken(async () => instance, {
    supply: 0n,
    mint: async (recipient, tokenId) => instance.$_mint(recipient, tokenId),
    burn: async (tokenId) => instance.$_burn(tokenId),
    name,
    symbol,
    baseURI,
  });
});
