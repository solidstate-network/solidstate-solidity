import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfNonFungibleToken,
  NonFungibleTokenBehaviorArgs,
  describeBehaviorOfNonFungibleTokenEnumerable,
  NonFungibleTokenEnumerableBehaviorArgs,
  describeBehaviorOfNonFungibleTokenMetadata,
  NonFungibleTokenMetadataBehaviorArgs,
} from '@solidstate/spec';
import { SolidstateNonFungibleToken } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface SolidstateNonFungibleTokenBehaviorArgs
  extends NonFungibleTokenBehaviorArgs,
    NonFungibleTokenEnumerableBehaviorArgs,
    NonFungibleTokenMetadataBehaviorArgs {}

export function describeBehaviorOfSolidstateNonFungibleToken(
  deploy: () => Promise<SolidstateNonFungibleToken>,
  args: SolidstateNonFungibleTokenBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidstateNonFungibleToken', () => {
    let holder: SignerWithAddress;

    let instance: SolidstateNonFungibleToken;

    before(async () => {
      [holder] = await ethers.getSigners();
    });

    beforeEach(async () => {
      instance = await deploy();
    });

    describeBehaviorOfNonFungibleToken(deploy, args, skips);

    describeBehaviorOfNonFungibleTokenEnumerable(deploy, args, skips);

    describeBehaviorOfNonFungibleTokenMetadata(deploy, args, skips);

    describe('#transferFrom(address,address,uint256)', () => {
      describe('reverts if', () => {
        it('value is included in transaction', async () => {
          const tokenId = 2n;
          await args.mint(holder.address, tokenId);

          await expect(
            instance
              .connect(holder)
              .transferFrom(holder.address, holder.address, tokenId, {
                value: 1,
              }),
          ).to.be.revertedWithCustomError(
            instance,
            'SolidstateNonFungibleToken__PayableTransferNotSupported',
          );
        });
      });
    });

    describe('#safeTransferFrom(address,address,uint256)', () => {
      describe('reverts if', () => {
        it('value is included in transaction', async () => {
          const tokenId = 2n;
          await args.mint(holder.address, tokenId);

          await expect(
            instance
              .connect(holder)
              [
                'safeTransferFrom(address,address,uint256)'
              ](holder.address, holder.address, tokenId, { value: 1 }),
          ).to.be.revertedWithCustomError(
            instance,
            'SolidstateNonFungibleToken__PayableTransferNotSupported',
          );
        });
      });
    });

    describe('#safeTransferFrom(address,address,uint256,bytes)', () => {
      describe('reverts if', () => {
        it('value is included in transaction', async () => {
          const tokenId = 2n;
          await args.mint(holder.address, tokenId);

          await expect(
            instance
              .connect(holder)
              [
                'safeTransferFrom(address,address,uint256,bytes)'
              ](holder.address, holder.address, tokenId, '0x', { value: 1 }),
          ).to.be.revertedWithCustomError(
            instance,
            'SolidstateNonFungibleToken__PayableTransferNotSupported',
          );
        });
      });
    });

    describe('#approve(address,uint256)', () => {
      describe('reverts if', () => {
        it('value is included in transaction', async () => {
          const tokenId = 2n;
          await args.mint(holder.address, tokenId);

          await expect(
            instance.connect(holder).approve(ethers.ZeroAddress, tokenId, {
              value: 1,
            }),
          ).to.be.revertedWithCustomError(
            instance,
            'SolidstateNonFungibleToken__PayableApproveNotSupported',
          );
        });
      });
    });
  });
}
