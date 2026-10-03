import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeFilter } from '@solidstate/library';
import {
  describeBehaviorOfNonFungibleToken,
  type NonFungibleTokenBehaviorArgs,
  describeBehaviorOfNonFungibleTokenEnumerable,
  type NonFungibleTokenEnumerableBehaviorArgs,
  describeBehaviorOfNonFungibleTokenMetadata,
  type NonFungibleTokenMetadataBehaviorArgs,
} from '@solidstate/spec';
import type { SolidstateNonFungibleToken } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import type { NetworkConnection } from 'hardhat/types/network';

export interface SolidstateNonFungibleTokenBehaviorArgs
  extends
    NonFungibleTokenBehaviorArgs,
    NonFungibleTokenEnumerableBehaviorArgs,
    NonFungibleTokenMetadataBehaviorArgs {}

export function describeBehaviorOfSolidstateNonFungibleToken(
  connection: NetworkConnection,
  deploy: () => Promise<SolidstateNonFungibleToken>,
  args: SolidstateNonFungibleTokenBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidstateNonFungibleToken', () => {
    let holder: HardhatEthersSigner;

    let instance: SolidstateNonFungibleToken;

    before(async () => {
      [holder] = await connection.ethers.getSigners();
    });

    beforeEach(async () => {
      instance = await deploy();
    });

    describeBehaviorOfNonFungibleToken(connection, deploy, args, skips);

    describeBehaviorOfNonFungibleTokenEnumerable(
      connection,
      deploy,
      args,
      skips,
    );

    describeBehaviorOfNonFungibleTokenMetadata(connection, deploy, args, skips);

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
              ['safeTransferFrom(address,address,uint256)'](
                holder.address,
                holder.address,
                tokenId,
                { value: 1 },
              ),
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
              ['safeTransferFrom(address,address,uint256,bytes)'](
                holder.address,
                holder.address,
                tokenId,
                '0x',
                { value: 1 },
              ),
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
