import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfNFTRoyalty } from '@solidstate/spec';
import { $NFTRoyalty, $NFTRoyalty__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('NFTRoyalty', () => {
  let royalty = 10000n; // 10000 / 10000 = 100%
  let royalties = [
    0n, // 0 / 10000 = 0%
    100n, // 100 / 10000 = 1%
    1000n, // 1000 / 10000 = 10%
    10000n, // 1000 / 10000 = 10%
  ];

  let deployer: SignerWithAddress;
  let receiver: SignerWithAddress;
  let instance: $NFTRoyalty;

  beforeEach(async () => {
    [deployer, receiver] = await ethers.getSigners();

    instance = await new $NFTRoyalty__factory(deployer).deploy();

    await instance.$_setDefaultRoyaltyBPS(royalty);

    for (let i = 0; i < royalties.length; i++) {
      await instance.$_setRoyaltyBPS(i, royalties[i]);
    }

    await instance.$_setDefaultRoyaltyReceiver(await receiver.getAddress());

    await instance.$_setSupportsInterface('0x01ffc9a7', true);
    await instance.$_setSupportsInterface('0x2a55205a', true);
  });

  describeBehaviorOfNFTRoyalty(async () => instance, {});

  describe('__internal', () => {
    describe('#_getRoyaltyBPS(uint256)', () => {
      it('returns royalty for single token', async () => {
        const tokenId = 99n;
        const defaultRoyalty = 6000n;
        const royalty = 9001n;

        await instance.$_setDefaultRoyaltyBPS(defaultRoyalty);

        expect(await instance.$_getRoyaltyBPS.staticCall(tokenId)).to.eq(
          defaultRoyalty,
        );

        await instance.$_setRoyaltyBPS(tokenId, royalty);
        expect(await instance.$_getRoyaltyBPS.staticCall(tokenId)).to.eq(
          royalty,
        );
      });
    });

    describe('#_getRoyaltyReceiver(uint256)', () => {
      it('returns royalty for single token', async () => {
        const tokenId = 99n;
        const defaultRoyaltyReceiver = await instance.getAddress();
        const royaltyReceiver = await deployer.getAddress();

        await instance.$_setDefaultRoyaltyReceiver(defaultRoyaltyReceiver);

        expect(await instance.$_getRoyaltyReceiver.staticCall(tokenId)).to.eq(
          defaultRoyaltyReceiver,
        );

        await instance.$_setRoyaltyReceiver(tokenId, royaltyReceiver);
        expect(await instance.$_getRoyaltyReceiver.staticCall(tokenId)).to.eq(
          royaltyReceiver,
        );
      });
    });

    describe('#_setRoyaltyBPS(uint256,uint16)', () => {
      it('sets royalty for single token', async () => {
        const tokenId = 99n;
        const otherTokenId = 100n;
        const royalty = 9001n;

        await instance.$_setRoyaltyBPS(tokenId, royalty);

        expect(await instance.$_getRoyaltyBPS.staticCall(tokenId)).to.eq(
          royalty,
        );

        expect(
          await instance.$_getRoyaltyBPS.staticCall(otherTokenId),
        ).not.to.eq(royalty);
      });

      describe('reverts if', () => {
        it('royalty exceeds 10000 BPS', async () => {
          await expect(
            instance.$_setRoyaltyBPS(0n, 10001n),
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

        await instance.$_setDefaultRoyaltyBPS(defaultRoyalty);

        expect(await instance.$_getRoyaltyBPS.staticCall(tokenId)).to.eq(
          defaultRoyalty,
        );
      });

      describe('reverts if', () => {
        it('royalty exceeds 10000 BPS', async () => {
          await expect(
            instance.$_setDefaultRoyaltyBPS(10001n),
          ).to.be.revertedWithCustomError(
            instance,
            'NFTRoyalty__RoyaltyTooHigh',
          );
        });
      });
    });

    describe('#_setRoyaltyReceiver(uint256,uint16)', () => {
      it('sets royalty for single token', async () => {
        const tokenId = 99n;
        const otherTokenId = 100n;
        const receiverAddress = await instance.getAddress();

        await instance.$_setRoyaltyReceiver(tokenId, receiverAddress);

        expect(await instance.$_getRoyaltyReceiver.staticCall(tokenId)).to.eq(
          receiverAddress,
        );

        expect(
          await instance.$_getRoyaltyReceiver.staticCall(otherTokenId),
        ).not.to.eq(receiverAddress);
      });
    });

    describe('#_setDefaultRoyaltyReceiver(uint256)', () => {
      it('sets fallback royalty', async () => {
        const tokenId = 99n;
        const defaultReceiverAddress = await instance.getAddress();

        await instance.$_setDefaultRoyaltyReceiver(defaultReceiverAddress);

        expect(await instance.$_getRoyaltyReceiver.staticCall(tokenId)).to.eq(
          defaultReceiverAddress,
        );
      });
    });
  });
});
