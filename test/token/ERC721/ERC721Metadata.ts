import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfERC721Metadata } from '@solidstate/spec';
import {
  $ERC721Metadata,
  $ERC721Metadata__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC721Metadata', () => {
  const name = 'ERC721Metadata.name';
  const symbol = 'ERC721Metadata.symbol';
  const baseURI = 'ERC721Metadata.baseURI';

  let deployer: SignerWithAddress;
  let instance: $ERC721Metadata;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $ERC721Metadata__factory(deployer).deploy();

    await instance.$_setName(name);
    await instance.$_setSymbol(symbol);
  });

  describeBehaviorOfERC721Metadata(async () => instance, {
    name,
    symbol,
    baseURI,
  });

  // TODO: test that metadata is cleared on burn

  describe('__internal', () => {
    describe('#_tokenURI(uint256)', () => {
      it('returns empty string if neither base URI nor token URI is set', async () => {
        const tokenId = 0n;

        await instance.$_mint(await deployer.getAddress(), tokenId);

        expect(await instance.$_tokenURI.staticCall(tokenId)).to.eq('');
      });

      it('returns stored token URI if base URI is not set', async () => {
        const tokenId = 0n;
        const tokenURI = 'ERC721Metadata.tokenURI';

        await instance.$_mint(await deployer.getAddress(), tokenId);

        await instance.$_setTokenURI(tokenId, tokenURI);

        expect(await instance.$_tokenURI(tokenId)).to.eq(tokenURI);
      });

      it('returns concatenation of base URI and token ID if only base URI is set', async () => {
        const tokenId = 0n;

        await instance.$_mint(await deployer.getAddress(), tokenId);

        await instance.$_setBaseURI(baseURI);

        expect(await instance.$_tokenURI(tokenId)).to.eq(
          `${baseURI}${tokenId}`,
        );
      });

      it('returns concatenation of base URI and token URI if both are set', async () => {
        const tokenId = 0n;
        const tokenURI = 'ERC721Metadata.tokenURI';

        await instance.$_mint(await deployer.getAddress(), tokenId);

        await instance.$_setBaseURI(baseURI);
        await instance.$_setTokenURI(tokenId, tokenURI);

        expect(await instance.$_tokenURI(tokenId)).to.eq(
          `${baseURI}${tokenURI}`,
        );
      });

      describe('reverts if', () => {
        it('token does not exist', async () => {
          await expect(
            instance.$_tokenURI.staticCall(0n),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Metadata__NonExistentToken',
          );
        });
      });
    });
  });
});
