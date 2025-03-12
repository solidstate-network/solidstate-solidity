import {
  describeBehaviorOfERC721Base,
  ERC721BaseBehaviorArgs,
} from './ERC721Base.behavior';
import {
  describeBehaviorOfERC721Enumerable,
  ERC721EnumerableBehaviorArgs,
} from './ERC721Enumerable.behavior';
import {
  describeBehaviorOfERC721Metadata,
  ERC721MetadataBehaviorArgs,
} from './ERC721Metadata.behavior';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { SolidstateERC721 } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface SolidstateERC721BehaviorArgs
  extends ERC721BaseBehaviorArgs,
    ERC721EnumerableBehaviorArgs,
    ERC721MetadataBehaviorArgs {}

export function describeBehaviorOfSolidstateERC721(
  deploy: () => Promise<SolidstateERC721>,
  args: SolidstateERC721BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidstateERC721', () => {
    let holder: SignerWithAddress;

    let instance: SolidstateERC721;

    before(async () => {
      [holder] = await ethers.getSigners();
    });

    beforeEach(async () => {
      instance = await deploy();
    });

    describeBehaviorOfERC721Base(deploy, args, skips);

    describeBehaviorOfERC721Enumerable(deploy, args, skips);

    describeBehaviorOfERC721Metadata(deploy, args, skips);

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
            'SolidstateERC721__PayableTransferNotSupported',
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
            'SolidstateERC721__PayableTransferNotSupported',
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
            'SolidstateERC721__PayableTransferNotSupported',
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
            'SolidstateERC721__PayableApproveNotSupported',
          );
        });
      });
    });
  });
}
