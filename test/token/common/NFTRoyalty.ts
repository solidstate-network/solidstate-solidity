import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfNFTRoyalty } from '@solidstate/spec';
import {
  NFTRoyaltyMock,
  NFTRoyaltyMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('NFTRoyalty', () => {
  let royalty = 10000; // 10000 / 10000 = 100%
  let royalties = [
    0, // 0 / 10000 = 0%
    100, // 100 / 10000 = 1%
    1000, // 1000 / 10000 = 10%
    10000, // 1000 / 10000 = 10%
  ];

  let deployer: SignerWithAddress;
  let receiver: SignerWithAddress;
  let instance: NFTRoyaltyMock;

  before(async () => {
    [deployer, receiver] = await ethers.getSigners();

    instance = await new NFTRoyaltyMock__factory(deployer).deploy(
      royalty,
      royalties,
      await receiver.getAddress(),
    );
  });

  describeBehaviorOfNFTRoyalty(async () => instance);

  describe('__internal', () => {
    describe('#_setRoyaltyBPS(uint256,uint16)', () => {
      it('sets royalty for single token', async () => {
        const tokenId = 99n;
        const royalty = 9001n;

        await instance.setRoyaltyBPS(tokenId, royalty);

        const [, royaltyAmount] = await instance.royaltyInfo(tokenId, 10000n);

        expect(royaltyAmount).to.eq(royalty);

        const [, otherRoyaltyAmount] = await instance.royaltyInfo(0n, 10000n);

        expect(otherRoyaltyAmount).not.to.eq(royalty);
      });

      describe('reverts if', () => {
        it('royalty exceeds 10000 BPS', async () => {
          await expect(
            instance.setRoyaltyBPS(0n, 10001n),
          ).to.be.revertedWithCustomError(
            instance,
            'NFTRoyalty__RoyaltyTooHigh',
          );
        });
      });
    });

    describe('#_setDefaultRoyaltyBPS(uint256)', () => {
      it('sets fallback royalty', async () => {
        const tokenId = 99n;
        const defaultRoyalty = 9001n;

        await instance.setDefaultRoyaltyBPS(defaultRoyalty);

        const [, royaltyAmount] = await instance.royaltyInfo(tokenId, 10000n);

        expect(royaltyAmount).to.eq(defaultRoyalty);
      });

      describe('reverts if', () => {
        it('royalty exceeds 10000 BPS', async () => {
          await expect(
            instance.setDefaultRoyaltyBPS(10001n),
          ).to.be.revertedWithCustomError(
            instance,
            'NFTRoyalty__RoyaltyTooHigh',
          );
        });
      });
    });
  });
});
