import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfMultiTokenMetadata } from '@solidstate/spec';
import {
  $MultiTokenMetadata,
  $MultiTokenMetadata__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MultiTokenMetadata', () => {
  const baseURI = 'MultiTokenMetadata.baseURI';

  let deployer: SignerWithAddress;
  let instance: $MultiTokenMetadata;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $MultiTokenMetadata__factory(deployer).deploy();
  });

  describeBehaviorOfMultiTokenMetadata(async () => instance, {
    baseURI,
  });

  describe('__internal', () => {
    describe('#_uri(uint256)', () => {
      it('returns empty string if neither base URI nor token URI is set', async () => {
        const tokenId = 0n;

        expect(await instance.$_uri.staticCall(tokenId)).to.eq('');
      });

      it('returns stored token URI if base URI is not set', async () => {
        const tokenId = 0n;
        const tokenURI = 'MultiTokenMetadata.tokenURI';

        await instance.$_setTokenURI(tokenId, tokenURI);

        expect(await instance.$_uri(tokenId)).to.eq(tokenURI);
      });

      it('returns concatenation of base URI and token ID if only base URI is set', async () => {
        const tokenId = 0n;

        await instance.$_setBaseURI(baseURI);

        expect(await instance.$_uri(tokenId)).to.eq(
          `${baseURI}${ethers.toBeHex(tokenId, 32).replace('0x', '')}`,
        );
      });

      it('returns concatenation of base URI and token URI if both are set', async () => {
        const tokenId = 0n;
        const tokenURI = 'MultiTokenMetadata.tokenURI';

        await instance.$_setBaseURI(baseURI);
        await instance.$_setTokenURI(tokenId, tokenURI);

        expect(await instance.$_uri(tokenId)).to.eq(`${baseURI}${tokenURI}`);
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
});
