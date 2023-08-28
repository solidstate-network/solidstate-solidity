import { describeBehaviorOfERC165Base } from '../../introspection';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeFilter } from '@solidstate/library';
import { ERC721Base } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

export interface ERC721BaseBehaviorArgs {
  supply: bigint;
  mint: (address: string, tokenId: bigint) => Promise<ContractTransaction>;
  burn: (tokenId: bigint) => Promise<ContractTransaction>;
}

export function describeBehaviorOfERC721Base(
  deploy: () => Promise<ERC721Base>,
  { mint, burn }: ERC721BaseBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC721Base', () => {
    let holder: SignerWithAddress;
    let spender: SignerWithAddress;
    let receiver: SignerWithAddress;
    let sender: SignerWithAddress;
    let instance: ERC721Base;

    before(async () => {
      // TODO: move to behavior args
      [holder, spender, receiver, sender] = await ethers.getSigners();
    });

    beforeEach(async () => {
      instance = await deploy();
    });

    // TODO: nonstandard usage
    describeBehaviorOfERC165Base(
      deploy,
      {
        interfaceIds: ['0x80ac58cd'],
      },
      skips,
    );

    describe('#balanceOf(address)', () => {
      it('returns the token balance of given address', async () => {
        expect(await instance.balanceOf.staticCall(holder.address)).to.equal(0);

        const tokenId = 2n;

        await expect(() => mint(holder.address, tokenId)).to.changeTokenBalance(
          instance,
          holder,
          1,
        );

        await expect(() => burn(tokenId)).to.changeTokenBalance(
          instance,
          holder,
          -1,
        );
      });

      describe('reverts if', () => {
        it('queried address is the zero address', async () => {
          await expect(
            instance.balanceOf.staticCall(ethers.ZeroAddress),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__BalanceQueryZeroAddress',
          );
        });
      });
    });

    describe('#ownerOf(uint256)', () => {
      it('returns the owner of given token', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          holder.address,
        );
      });

      describe('reverts if', () => {
        it('token does not exist', async () => {
          await expect(
            instance.ownerOf.staticCall(2),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
        });

        it('owner is zero address');
      });
    });

    describe('#getApproved(uint256)', () => {
      it('returns approved spender of given token', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        expect(await instance.getApproved.staticCall(tokenId)).to.equal(
          ethers.ZeroAddress,
        );

        await instance
          .connect(holder)
          .approve(await instance.getAddress(), tokenId);
        expect(await instance.getApproved.staticCall(tokenId)).to.equal(
          await instance.getAddress(),
        );

        await instance.connect(holder).approve(ethers.ZeroAddress, tokenId);
        expect(await instance.getApproved.staticCall(tokenId)).to.equal(
          ethers.ZeroAddress,
        );
      });

      describe('reverts if', () => {
        it('token does not exist', async () => {
          await expect(
            instance.getApproved.staticCall(2),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__NonExistentToken',
          );
        });
      });
    });

    describe('#isApprovedForAll(address,address)', () => {
      it('returns whether given operator is approved to spend all tokens of given holder', async () => {
        expect(
          await instance.isApprovedForAll.staticCall(
            holder.address,
            spender.address,
          ),
        ).to.be.false;

        await instance.connect(holder).setApprovalForAll(spender.address, true);
        expect(
          await instance.isApprovedForAll.staticCall(
            holder.address,
            spender.address,
          ),
        ).to.be.true;

        await instance
          .connect(holder)
          .setApprovalForAll(spender.address, false);
        expect(
          await instance.isApprovedForAll.staticCall(
            holder.address,
            spender.address,
          ),
        ).to.be.false;
      });
    });

    describe('#transferFrom(address,address,uint256)', () => {
      it('transfers token on behalf of holder', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        await expect(() =>
          instance
            .connect(spender)
            .transferFrom(holder.address, receiver.address, tokenId),
        ).to.changeTokenBalances(instance, [holder, receiver], [-1, 1]);
      });

      it('updates owner of token', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          holder.address,
        );

        await instance
          .connect(spender)
          .transferFrom(holder.address, receiver.address, tokenId);

        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          receiver.address,
        );
      });

      it('emits Transfer event', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        await expect(
          instance
            .connect(spender)
            .transferFrom(holder.address, receiver.address, tokenId),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(holder.address, receiver.address, tokenId);
      });

      it('does not revert if recipient is not ERC721Receiver implementer', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        // TODO: test against contract other than self

        await expect(
          instance
            .connect(holder)
            .transferFrom(holder.address, await instance.getAddress(), tokenId),
        ).not.to.be.reverted;
      });

      it('does not revert if recipient is ERC721Receiver implementer but does not accept transfer', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        const receiverContract = await deployMockContract(sender, [
          'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
        ]);

        await receiverContract.mock.onERC721Received.returns(
          ethers.randomBytes(4),
        );

        await expect(
          instance
            .connect(holder)
            .transferFrom(holder.address, receiverContract.address, tokenId),
        ).not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('caller is neither owner of token nor authorized to spend it', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          await expect(
            instance
              .connect(spender)
              .transferFrom(holder.address, ethers.ZeroAddress, tokenId),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__NotOwnerOrApproved',
          );
        });

        it('receiver is the zero address', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          await instance.connect(holder).approve(spender.address, tokenId);

          await expect(
            instance
              .connect(spender)
              .transferFrom(holder.address, ethers.ZeroAddress, tokenId),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__TransferToZeroAddress',
          );
        });
      });
    });

    describe('#safeTransferFrom(address,address,uint256)', () => {
      it('transfers token on behalf of holder', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        await expect(() =>
          instance
            .connect(spender)
            ['safeTransferFrom(address,address,uint256)'](
              holder.address,
              receiver.address,
              tokenId,
            ),
        ).to.changeTokenBalances(instance, [holder, receiver], [-1, 1]);
      });

      it('updates owner of token', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          holder.address,
        );

        await instance
          .connect(spender)
          ['safeTransferFrom(address,address,uint256)'](
            holder.address,
            receiver.address,
            tokenId,
          );

        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          receiver.address,
        );
      });

      it('emits Transfer event', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        await expect(
          instance
            .connect(spender)
            ['safeTransferFrom(address,address,uint256)'](
              holder.address,
              receiver.address,
              tokenId,
            ),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(holder.address, receiver.address, tokenId);
      });

      describe('reverts if', () => {
        it('caller is neither owner of token nor authorized to spend it', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          await expect(
            instance
              .connect(spender)
              ['safeTransferFrom(address,address,uint256)'](
                holder.address,
                ethers.ZeroAddress,
                tokenId,
              ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__NotOwnerOrApproved',
          );
        });

        it('receiver is the zero address', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          await instance.connect(holder).approve(spender.address, tokenId);

          await expect(
            instance
              .connect(spender)
              ['safeTransferFrom(address,address,uint256)'](
                holder.address,
                ethers.ZeroAddress,
                tokenId,
              ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__TransferToZeroAddress',
          );
        });

        it('recipient is not ERC721Receiver implementer', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          // TODO: test against contract other than self

          await expect(
            instance
              .connect(holder)
              ['safeTransferFrom(address,address,uint256)'](
                holder.address,
                await instance.getAddress(),
                tokenId,
              ),
          ).to.be.revertedWith(
            'ERC721: transfer to non ERC721Receiver implementer',
          );
        });

        it('recipient is ERC721Receiver implementer but does not accept transfer', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          const receiverContract = await deployMockContract(sender, [
            'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
          ]);

          await receiverContract.mock.onERC721Received.returns(
            ethers.randomBytes(4),
          );

          await expect(
            instance
              .connect(holder)
              ['safeTransferFrom(address,address,uint256)'](
                holder.address,
                receiverContract.address,
                tokenId,
              ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__ERC721ReceiverNotImplemented',
          );
        });
      });
    });

    describe('#safeTransferFrom(address,address,uint256,bytes)', () => {
      it('transfers token on behalf of holder', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        await expect(() =>
          instance
            .connect(spender)
            ['safeTransferFrom(address,address,uint256,bytes)'](
              holder.address,
              receiver.address,
              tokenId,
              '0x',
            ),
        ).to.changeTokenBalances(instance, [holder, receiver], [-1, 1]);
      });

      it('updates owner of token', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          holder.address,
        );

        await instance
          .connect(spender)
          ['safeTransferFrom(address,address,uint256,bytes)'](
            holder.address,
            receiver.address,
            tokenId,
            '0x',
          );

        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          receiver.address,
        );
      });

      it('emits Transfer event', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        await expect(
          instance
            .connect(spender)
            ['safeTransferFrom(address,address,uint256,bytes)'](
              holder.address,
              receiver.address,
              tokenId,
              '0x',
            ),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(holder.address, receiver.address, tokenId);
      });

      describe('reverts if', () => {
        it('caller is neither owner of token nor authorized to spend it', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          await expect(
            instance
              .connect(spender)
              ['safeTransferFrom(address,address,uint256,bytes)'](
                holder.address,
                ethers.ZeroAddress,
                tokenId,
                '0x',
              ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__NotOwnerOrApproved',
          );
        });

        it('receiver is the zero address', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          await instance.connect(holder).approve(spender.address, tokenId);

          await expect(
            instance
              .connect(spender)
              ['safeTransferFrom(address,address,uint256,bytes)'](
                holder.address,
                ethers.ZeroAddress,
                tokenId,
                '0x',
              ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__TransferToZeroAddress',
          );
        });

        it('recipient is not ERC721Receiver implementer', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          // TODO: test against contract other than self

          await expect(
            instance
              .connect(holder)
              ['safeTransferFrom(address,address,uint256,bytes)'](
                holder.address,
                await instance.getAddress(),
                tokenId,
                '0x',
              ),
          ).to.be.revertedWith(
            'ERC721: transfer to non ERC721Receiver implementer',
          );
        });

        it('recipient is ERC721Receiver implementer but does not accept transfer', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          const receiverContract = await deployMockContract(sender, [
            'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
          ]);

          await receiverContract.mock.onERC721Received.returns(
            ethers.randomBytes(4),
          );

          await expect(
            instance
              .connect(holder)
              ['safeTransferFrom(address,address,uint256,bytes)'](
                holder.address,
                receiverContract.address,
                tokenId,
                '0x',
              ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__ERC721ReceiverNotImplemented',
          );
        });
      });
    });

    describe('#approve(address,uint256)', () => {
      it('grants approval to spend given token on behalf of holder', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        expect(await instance.getApproved.staticCall(tokenId)).to.equal(
          ethers.ZeroAddress,
        );

        await instance.connect(holder).approve(spender.address, tokenId);

        expect(await instance.getApproved.staticCall(tokenId)).to.equal(
          spender.address,
        );

        await expect(
          instance
            .connect(spender)
            .transferFrom.staticCall(holder.address, spender.address, tokenId),
        ).not.to.be.reverted;

        await instance.connect(holder).approve(ethers.ZeroAddress, tokenId);

        await expect(
          instance
            .connect(spender)
            .transferFrom.staticCall(holder.address, spender.address, tokenId),
        ).to.be.reverted;
      });

      it('emits Approval event', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        await expect(instance.connect(holder).approve(spender.address, tokenId))
          .to.emit(instance, 'Approval')
          .withArgs(holder.address, spender.address, tokenId);
      });

      it('does not revert if sender is approved to spend all tokens held by owner', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        await instance
          .connect(holder)
          .setApprovalForAll(receiver.address, true);

        await expect(
          instance.connect(receiver).approve(receiver.address, tokenId),
        ).not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('spender is current owner of given token', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          await expect(
            instance.connect(holder).approve(holder.address, tokenId),
          ).to.be.revertedWithCustomError(instance, 'ERC721Base__SelfApproval');
        });

        it('sender is not owner of given token', async () => {
          const tokenId = 2n;
          await mint(holder.address, tokenId);

          await expect(
            instance.connect(receiver).approve(receiver.address, tokenId),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__NotOwnerOrApproved',
          );
        });
      });
    });

    describe('#setApprovalForAll(address,bool)', () => {
      it('grants and revokes approval to spend tokens on behalf of holder', async () => {
        const tokenId = 2n;
        await mint(holder.address, tokenId);

        await instance.connect(holder).setApprovalForAll(spender.address, true);

        await expect(
          instance
            .connect(spender)
            .transferFrom.staticCall(holder.address, spender.address, tokenId),
        ).not.to.be.reverted;

        await instance
          .connect(holder)
          .setApprovalForAll(spender.address, false);

        await expect(
          instance
            .connect(spender)
            .transferFrom.staticCall(holder.address, spender.address, tokenId),
        ).to.be.reverted;
      });

      it('emits ApprovalForAll event', async () => {
        await expect(
          instance.connect(holder).setApprovalForAll(spender.address, true),
        )
          .to.emit(instance, 'ApprovalForAll')
          .withArgs(holder.address, spender.address, true);

        await expect(
          instance.connect(holder).setApprovalForAll(spender.address, true),
        )
          .to.emit(instance, 'ApprovalForAll')
          .withArgs(holder.address, spender.address, true);
      });

      describe('reverts if', () => {
        it('given operator is sender', async () => {
          await expect(
            instance.connect(holder).setApprovalForAll(holder.address, true),
          ).to.be.revertedWithCustomError(instance, 'ERC721Base__SelfApproval');
        });
      });
    });
  });
}
