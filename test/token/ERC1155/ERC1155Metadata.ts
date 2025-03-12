import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfERC1155Metadata } from '@solidstate/spec';
import {
  $ERC1155Metadata,
  $ERC1155Metadata__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC1155Metadata', () => {
  const baseURI = 'ERC1155Metadata.baseURI';

  let deployer: SignerWithAddress;
  let instance: $ERC1155Metadata;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $ERC1155Metadata__factory(deployer).deploy();
  });

  describeBehaviorOfERC1155Metadata(async () => instance, {
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
        const tokenURI = 'ERC1155Metadata.tokenURI';

        await instance.$_setTokenURI(tokenId, tokenURI);

        expect(await instance.$_uri(tokenId)).to.eq(tokenURI);
      });

      it('returns concatenation of base URI and token ID if only base URI is set', async () => {
        const tokenId = 0n;

        await instance.$_setBaseURI(baseURI);

        expect(await instance.$_uri(tokenId)).to.eq(`${baseURI}${tokenId}`);
      });

      it('returns concatenation of base URI and token URI if both are set', async () => {
        const tokenId = 0n;
        const tokenURI = 'ERC1155Metadata.tokenURI';

        await instance.$_setBaseURI(baseURI);
        await instance.$_setTokenURI(tokenId, tokenURI);

        expect(await instance.$_uri(tokenId)).to.eq(`${baseURI}${tokenURI}`);
      });
    });
  });
});
