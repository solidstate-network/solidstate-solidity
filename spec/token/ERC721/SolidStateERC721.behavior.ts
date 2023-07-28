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
import { SolidStateERC721 } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface SolidStateERC721BehaviorArgs
  extends ERC721BaseBehaviorArgs,
    ERC721EnumerableBehaviorArgs,
    ERC721MetadataBehaviorArgs {}

export function describeBehaviorOfSolidStateERC721(
  deploy: () => Promise<SolidStateERC721>,
  { supply, mint, burn, name, symbol, tokenURI }: SolidStateERC721BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidStateERC721', () => {
    let holder: SignerWithAddress;

    let instance: SolidStateERC721;

    before(async () => {
      [holder] = await ethers.getSigners();
    });

    beforeEach(async () => {
      instance = await deploy();
    });

    describeBehaviorOfERC721Base(
      deploy,
      {
        supply,
        mint,
        burn,
      },
      skips,
    );

    describeBehaviorOfERC721Enumerable(
      deploy,
      {
        supply,
        mint,
        burn,
      },
      skips,
    );

    describeBehaviorOfERC721Metadata(
      deploy,
      {
        name,
        symbol,
        tokenURI,
      },
      skips,
    );

    describe('#transferFrom(address,address,uint256)', () => {
      describe('reverts if', () => {
        it('value is included in transaction', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          await expect(
            instance
              .connect(holder)
              .transferFrom(holder.address, holder.address, tokenId, {
                value: 1,
              }),
          ).to.be.revertedWithCustomError(
            instance,
            'SolidStateERC721__PayableTransferNotSupported',
          );
        });
      });
    });

    describe('#safeTransferFrom(address,address,uint256)', () => {
      describe('reverts if', () => {
        it('value is included in transaction', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

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
            'SolidStateERC721__PayableTransferNotSupported',
          );
        });
      });
    });

    describe('#safeTransferFrom(address,address,uint256,bytes)', () => {
      describe('reverts if', () => {
        it('value is included in transaction', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

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
            'SolidStateERC721__PayableTransferNotSupported',
          );
        });
      });
    });

    describe('#approve(address,uint256)', () => {
      describe('reverts if', () => {
        it('value is included in transaction', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          await expect(
            instance.connect(holder).approve(ethers.ZeroAddress, tokenId, {
              value: 1,
            }),
          ).to.be.revertedWithCustomError(
            instance,
            'SolidStateERC721__PayableApproveNotSupported',
          );
        });
      });
    });
  });
}
