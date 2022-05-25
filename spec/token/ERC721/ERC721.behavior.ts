import { describeBehaviorOfERC721Base } from './ERC721Base.behavior';
import { describeBehaviorOfERC721Enumerable } from './ERC721Enumerable.behavior';
import { describeBehaviorOfERC721Metadata } from './ERC721Metadata.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { ERC721 } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber, ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

interface ERC721BehaviorArgs {
  deploy: () => Promise<ERC721>;
  mint: (address: string, tokenId: BigNumber) => Promise<ContractTransaction>;
  burn: (tokenId: BigNumber) => Promise<ContractTransaction>;
  supply: BigNumber;
  name: string;
  symbol: string;
  tokenURI: string;
}

export function describeBehaviorOfERC721(
  { deploy, supply, mint, burn, name, symbol, tokenURI }: ERC721BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC721', function () {
    let holder: SignerWithAddress;

    let instance: ERC721;

    before(async function () {
      [holder] = await ethers.getSigners();
    });

    beforeEach(async function () {
      instance = await deploy();
    });

    describeBehaviorOfERC721Base(
      {
        deploy,
        supply,
        mint,
        burn,
      },
      skips,
    );

    describeBehaviorOfERC721Enumerable(
      {
        deploy,
        supply,
        mint,
        burn,
      },
      ['::ERC721Base', ...(skips ?? [])],
    );

    describeBehaviorOfERC721Metadata(
      {
        deploy,
        name,
        symbol,
        tokenURI,
      },
      skips,
    );

    describe('#transferFrom(address,address,uint256)', function () {
      describe('reverts if', function () {
        it('value is included in transaction', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await expect(
            instance
              .connect(holder)
              .transferFrom(holder.address, holder.address, tokenId, {
                value: ethers.constants.One,
              }),
          ).to.be.revertedWith('ERC721: payable transfer calls not supported');
        });
      });
    });

    describe('#safeTransferFrom(address,address,uint256)', function () {
      describe('reverts if', function () {
        it('value is included in transaction', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await expect(
            instance
              .connect(holder)
              ['safeTransferFrom(address,address,uint256)'](
                holder.address,
                holder.address,
                tokenId,
                { value: ethers.constants.One },
              ),
          ).to.be.revertedWith('ERC721: payable transfer calls not supported');
        });
      });
    });

    describe('#safeTransferFrom(address,address,uint256,bytes)', function () {
      describe('reverts if', function () {
        it('value is included in transaction', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await expect(
            instance
              .connect(holder)
              ['safeTransferFrom(address,address,uint256,bytes)'](
                holder.address,
                holder.address,
                tokenId,
                '0x',
                { value: ethers.constants.One },
              ),
          ).to.be.revertedWith('ERC721: payable transfer calls not supported');
        });
      });
    });

    describe('#approve(address,uint256)', function () {
      describe('reverts if', function () {
        it('value is included in transaction', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await expect(
            instance
              .connect(holder)
              .approve(ethers.constants.AddressZero, tokenId, {
                value: ethers.constants.One,
              }),
          ).to.be.revertedWith('ERC721: payable approve calls not supported');
        });
      });
    });
  });
}
