import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfNonFungibleTokenMetadata } from '@solidstate/spec';
import {
  $NonFungibleTokenMetadata,
  $NonFungibleTokenMetadata__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('NonFungibleTokenMetadata', () => {
  const name = 'NonFungibleTokenMetadata.name';
  const symbol = 'NonFungibleTokenMetadata.symbol';
  const baseURI = 'NonFungibleTokenMetadata.baseURI';

  let deployer: SignerWithAddress;
  let instance: $NonFungibleTokenMetadata;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $NonFungibleTokenMetadata__factory(deployer).deploy();

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
  });

  describeBehaviorOfNonFungibleTokenMetadata(async () => instance, {
    name,
    symbol,
    baseURI,
  });

  // TODO: test that metadata is cleared on burn

  describe('#_tokenURI(uint256)', () => {
    it('returns empty string if neither base URI nor token URI is set', async () => {
      const tokenId = 0n;

      await instance.$_mint(await deployer.getAddress(), tokenId);

      expect(await instance.$_tokenURI.staticCall(tokenId)).to.eq('');
    });

    it('returns stored token URI if base URI is not set', async () => {
      const tokenId = 0n;
      const tokenURI = 'NonFungibleTokenMetadata.tokenURI';

      await instance.$_mint(await deployer.getAddress(), tokenId);

      await instance.$_setTokenURI(tokenId, tokenURI);

      expect(await instance.$_tokenURI(tokenId)).to.eq(tokenURI);
    });

    it('returns concatenation of base URI and token ID if only base URI is set', async () => {
      const tokenId = 0n;

      await instance.$_mint(await deployer.getAddress(), tokenId);

      await instance.$_setBaseURI(baseURI);

      expect(await instance.$_tokenURI(tokenId)).to.eq(
        `${baseURI}${ethers.toBeHex(tokenId, 32).replace('0x', '')}`,
      );
    });

    it('returns concatenation of base URI and token URI if both are set', async () => {
      const tokenId = 0n;
      const tokenURI = 'NonFungibleTokenMetadata.tokenURI';

      await instance.$_mint(await deployer.getAddress(), tokenId);

      await instance.$_setBaseURI(baseURI);
      await instance.$_setTokenURI(tokenId, tokenURI);

      expect(await instance.$_tokenURI(tokenId)).to.eq(`${baseURI}${tokenURI}`);
    });

    describe('reverts if', () => {
      it('token does not exist', async () => {
        await expect(
          instance.$_tokenURI.staticCall(0n),
        ).to.be.revertedWithCustomError(
          instance,
          'NonFungibleTokenMetadata__NonExistentToken',
        );
      });
    });
  });

  describe('#_generateDefaultTokenURI(uint256)', () => {
    it('returns padded hex representation of token id', async () => {
      const tokenId = 1n;

      expect(
        await instance.$_generateDefaultTokenURI.staticCall(tokenId),
      ).to.eq(ethers.toBeHex(tokenId, 32).replace('0x', ''));
    });
  });
});
