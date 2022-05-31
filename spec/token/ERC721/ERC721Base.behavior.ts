import { describeBehaviorOfERC165 } from '../../introspection';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { ERC721Base } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { deployMockContract } from 'ethereum-waffle';
import { BigNumber, ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

export interface ERC721BaseBehaviorArgs {
  deploy: () => Promise<ERC721Base>;
  supply: BigNumber;
  mint: (address: string, tokenId: BigNumber) => Promise<ContractTransaction>;
  burn: (tokenId: BigNumber) => Promise<ContractTransaction>;
}

export function describeBehaviorOfERC721Base(
  { deploy, mint, burn }: ERC721BaseBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC721Base', function () {
    let holder: SignerWithAddress;
    let spender: SignerWithAddress;
    let receiver: SignerWithAddress;
    let sender: SignerWithAddress;
    let instance: ERC721Base;

    before(async function () {
      // TODO: move to behavior args
      [holder, spender, receiver, sender] = await ethers.getSigners();
    });

    beforeEach(async function () {
      instance = await deploy();
    });

    describeBehaviorOfERC165(
      {
        deploy,
        interfaceIds: ['0x80ac58cd'],
      },
      skips,
    );

    describe('#balanceOf(address)', function () {
      it('returns the token balance of given address', async function () {
        expect(
          await instance.callStatic['balanceOf(address)'](holder.address),
        ).to.equal(ethers.constants.Zero);

        const tokenId = ethers.constants.Two;

        await expect(() => mint(holder.address, tokenId)).to.changeTokenBalance(
          instance,
          holder,
          ethers.constants.One,
        );

        await expect(() => burn(tokenId)).to.changeTokenBalance(
          instance,
          holder,
          -ethers.constants.One,
        );
      });

      describe('reverts if', function () {
        it('queried address is the zero address', async function () {
          await expect(
            instance.callStatic.balanceOf(ethers.constants.AddressZero),
          ).to.be.revertedWith('ERC721: balance query for the zero address');
        });
      });
    });

    describe('#ownerOf(uint256)', function () {
      it('returns the owner of given token', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        expect(await instance.callStatic.ownerOf(tokenId)).to.equal(
          holder.address,
        );
      });

      describe('reverts if', function () {
        it('token does not exist', async function () {
          await expect(
            instance.callStatic.ownerOf(ethers.constants.Two),
          ).to.be.revertedWith('EnumerableMap: nonexistent key');
        });

        it('owner is zero address');
      });
    });

    describe('#getApproved(uint256)', function () {
      it('returns approved spender of given token', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        expect(await instance.callStatic.getApproved(tokenId)).to.equal(
          ethers.constants.AddressZero,
        );

        await instance.connect(holder).approve(instance.address, tokenId);
        expect(await instance.callStatic.getApproved(tokenId)).to.equal(
          instance.address,
        );

        await instance
          .connect(holder)
          .approve(ethers.constants.AddressZero, tokenId);
        expect(await instance.callStatic.getApproved(tokenId)).to.equal(
          ethers.constants.AddressZero,
        );
      });

      describe('reverts if', function () {
        it('token does not exist', async function () {
          await expect(
            instance.callStatic.getApproved(ethers.constants.Two),
          ).to.be.revertedWith('ERC721: approved query for nonexistent token');
        });
      });
    });

    describe('#isApprovedForAll(address,address)', function () {
      it('returns whether given operator is approved to spend all tokens of given holder', async function () {
        expect(
          await instance.callStatic.isApprovedForAll(
            holder.address,
            spender.address,
          ),
        ).to.be.false;

        await instance.connect(holder).setApprovalForAll(spender.address, true);
        expect(
          await instance.callStatic.isApprovedForAll(
            holder.address,
            spender.address,
          ),
        ).to.be.true;

        await instance
          .connect(holder)
          .setApprovalForAll(spender.address, false);
        expect(
          await instance.callStatic.isApprovedForAll(
            holder.address,
            spender.address,
          ),
        ).to.be.false;
      });
    });

    describe('#transferFrom(address,address,uint256)', function () {
      it('transfers token on behalf of holder', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        await expect(() =>
          instance
            .connect(spender)
            .transferFrom(holder.address, receiver.address, tokenId),
        ).to.changeTokenBalances(
          instance,
          [holder, receiver],
          [ethers.constants.NegativeOne, ethers.constants.One],
        );
      });

      it('updates owner of token', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        expect(await instance.callStatic.ownerOf(tokenId)).to.equal(
          holder.address,
        );

        await instance
          .connect(spender)
          .transferFrom(holder.address, receiver.address, tokenId);

        expect(await instance.callStatic.ownerOf(tokenId)).to.equal(
          receiver.address,
        );
      });

      it('emits Transfer event', async function () {
        const tokenId = ethers.constants.Two;
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

      it('does not revert if recipient is not ERC721Receiver implementer', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        // TODO: test against contract other than self

        await expect(
          instance
            .connect(holder)
            .transferFrom(holder.address, instance.address, tokenId),
        ).not.to.be.reverted;
      });

      it('does not revert if recipient is ERC721Receiver implementer but does not accept transfer', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        const receiverContract = await deployMockContract(sender, [
          'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
        ]);

        await receiverContract.mock.onERC721Received.returns(
          ethers.utils.randomBytes(4),
        );

        await expect(
          instance
            .connect(holder)
            .transferFrom(holder.address, receiverContract.address, tokenId),
        ).not.to.be.reverted;
      });

      describe('reverts if', function () {
        it('caller is neither owner of token nor authorized to spend it', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await expect(
            instance
              .connect(spender)
              .transferFrom(
                holder.address,
                ethers.constants.AddressZero,
                tokenId,
              ),
          ).to.be.revertedWith(
            'ERC721: transfer caller is not owner or approved',
          );
        });

        it('receiver is the zero address', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await instance.connect(holder).approve(spender.address, tokenId);

          await expect(
            instance
              .connect(spender)
              .transferFrom(
                holder.address,
                ethers.constants.AddressZero,
                tokenId,
              ),
          ).to.be.revertedWith('ERC721: transfer to the zero address');
        });
      });
    });

    describe('#safeTransferFrom(address,address,uint256)', function () {
      it('transfers token on behalf of holder', async function () {
        const tokenId = ethers.constants.Two;
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
        ).to.changeTokenBalances(
          instance,
          [holder, receiver],
          [ethers.constants.NegativeOne, ethers.constants.One],
        );
      });

      it('updates owner of token', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        expect(await instance.callStatic.ownerOf(tokenId)).to.equal(
          holder.address,
        );

        await instance
          .connect(spender)
          ['safeTransferFrom(address,address,uint256)'](
            holder.address,
            receiver.address,
            tokenId,
          );

        expect(await instance.callStatic.ownerOf(tokenId)).to.equal(
          receiver.address,
        );
      });

      it('emits Transfer event', async function () {
        const tokenId = ethers.constants.Two;
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

      describe('reverts if', function () {
        it('caller is neither owner of token nor authorized to spend it', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await expect(
            instance
              .connect(spender)
              ['safeTransferFrom(address,address,uint256)'](
                holder.address,
                ethers.constants.AddressZero,
                tokenId,
              ),
          ).to.be.revertedWith(
            'ERC721: transfer caller is not owner or approved',
          );
        });

        it('receiver is the zero address', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await instance.connect(holder).approve(spender.address, tokenId);

          await expect(
            instance
              .connect(spender)
              ['safeTransferFrom(address,address,uint256)'](
                holder.address,
                ethers.constants.AddressZero,
                tokenId,
              ),
          ).to.be.revertedWith('ERC721: transfer to the zero address');
        });

        it('recipient is not ERC721Receiver implementer', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          // TODO: test against contract other than self

          await expect(
            instance
              .connect(holder)
              ['safeTransferFrom(address,address,uint256)'](
                holder.address,
                instance.address,
                tokenId,
              ),
          ).to.be.revertedWith(
            'ERC721: transfer to non ERC721Receiver implementer',
          );
        });

        it('recipient is ERC721Receiver implementer but does not accept transfer', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          const receiverContract = await deployMockContract(sender, [
            'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
          ]);

          await receiverContract.mock.onERC721Received.returns(
            ethers.utils.randomBytes(4),
          );

          await expect(
            instance
              .connect(holder)
              ['safeTransferFrom(address,address,uint256)'](
                holder.address,
                receiverContract.address,
                tokenId,
              ),
          ).to.be.revertedWith(
            'ERC721: transfer to non ERC721Receiver implementer',
          );
        });
      });
    });

    describe('#safeTransferFrom(address,address,uint256,bytes)', function () {
      it('transfers token on behalf of holder', async function () {
        const tokenId = ethers.constants.Two;
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
        ).to.changeTokenBalances(
          instance,
          [holder, receiver],
          [ethers.constants.NegativeOne, ethers.constants.One],
        );
      });

      it('updates owner of token', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        expect(await instance.callStatic.ownerOf(tokenId)).to.equal(
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

        expect(await instance.callStatic.ownerOf(tokenId)).to.equal(
          receiver.address,
        );
      });

      it('emits Transfer event', async function () {
        const tokenId = ethers.constants.Two;
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

      describe('reverts if', function () {
        it('caller is neither owner of token nor authorized to spend it', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await expect(
            instance
              .connect(spender)
              ['safeTransferFrom(address,address,uint256,bytes)'](
                holder.address,
                ethers.constants.AddressZero,
                tokenId,
                '0x',
              ),
          ).to.be.revertedWith(
            'ERC721: transfer caller is not owner or approved',
          );
        });

        it('receiver is the zero address', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await instance.connect(holder).approve(spender.address, tokenId);

          await expect(
            instance
              .connect(spender)
              ['safeTransferFrom(address,address,uint256,bytes)'](
                holder.address,
                ethers.constants.AddressZero,
                tokenId,
                '0x',
              ),
          ).to.be.revertedWith('ERC721: transfer to the zero address');
        });

        it('recipient is not ERC721Receiver implementer', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          // TODO: test against contract other than self

          await expect(
            instance
              .connect(holder)
              ['safeTransferFrom(address,address,uint256,bytes)'](
                holder.address,
                instance.address,
                tokenId,
                '0x',
              ),
          ).to.be.revertedWith(
            'ERC721: transfer to non ERC721Receiver implementer',
          );
        });

        it('recipient is ERC721Receiver implementer but does not accept transfer', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          const receiverContract = await deployMockContract(sender, [
            'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
          ]);

          await receiverContract.mock.onERC721Received.returns(
            ethers.utils.randomBytes(4),
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
          ).to.be.revertedWith(
            'ERC721: transfer to non ERC721Receiver implementer',
          );
        });
      });
    });

    describe('#approve(address,uint256)', function () {
      it('grants approval to spend given token on behalf of holder', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        expect(await instance.callStatic.getApproved(tokenId)).to.equal(
          ethers.constants.AddressZero,
        );

        await instance.connect(holder).approve(spender.address, tokenId);

        expect(await instance.callStatic.getApproved(tokenId)).to.equal(
          spender.address,
        );

        await expect(
          instance
            .connect(spender)
            .callStatic.transferFrom(holder.address, spender.address, tokenId),
        ).not.to.be.reverted;

        await instance
          .connect(holder)
          .approve(ethers.constants.AddressZero, tokenId);

        await expect(
          instance
            .connect(spender)
            .callStatic.transferFrom(holder.address, spender.address, tokenId),
        ).to.be.reverted;
      });

      it('emits Approval event', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        await expect(instance.connect(holder).approve(spender.address, tokenId))
          .to.emit(instance, 'Approval')
          .withArgs(holder.address, spender.address, tokenId);
      });

      it('does not revert if sender is approved to spend all tokens held by owner', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        await instance
          .connect(holder)
          .setApprovalForAll(receiver.address, true);

        await expect(
          instance.connect(receiver).approve(receiver.address, tokenId),
        ).not.to.be.reverted;
      });

      describe('reverts if', function () {
        it('spender is current owner of given token', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await expect(
            instance.connect(holder).approve(holder.address, tokenId),
          ).to.be.revertedWith('ERC721: approval to current owner');
        });

        it('sender is not owner of given token', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await expect(
            instance.connect(receiver).approve(receiver.address, tokenId),
          ).to.be.revertedWith(
            'ERC721: approve caller is not owner nor approved for all',
          );
        });
      });
    });

    describe('#setApprovalForAll(address,bool)', function () {
      it('grants and revokes approval to spend tokens on behalf of holder', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        await instance.connect(holder).setApprovalForAll(spender.address, true);

        await expect(
          instance
            .connect(spender)
            .callStatic.transferFrom(holder.address, spender.address, tokenId),
        ).not.to.be.reverted;

        await instance
          .connect(holder)
          .setApprovalForAll(spender.address, false);

        await expect(
          instance
            .connect(spender)
            .callStatic.transferFrom(holder.address, spender.address, tokenId),
        ).to.be.reverted;
      });

      it('emits ApprovalForAll event', async function () {
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

      describe('reverts if', function () {
        it('given operator is sender', async function () {
          await expect(
            instance.connect(holder).setApprovalForAll(holder.address, true),
          ).to.be.revertedWith('ERC721: approve to caller');
        });
      });
    });
  });
}
