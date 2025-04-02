import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfIntrospectable } from '@solidstate/spec';
import { IMultiToken } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ContractTransactionResponse } from 'ethers';
import { ethers } from 'hardhat';

export interface MultiTokenBehaviorArgs {
  mint: (
    address: string,
    id: bigint,
    amount: bigint,
  ) => Promise<ContractTransactionResponse>;
  burn: (
    address: string,
    id: bigint,
    amount: bigint,
  ) => Promise<ContractTransactionResponse>;
  tokenId?: bigint;
}

export function describeBehaviorOfMultiToken(
  deploy: () => Promise<IMultiToken>,
  args: MultiTokenBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::MultiToken', () => {
    let holder: SignerWithAddress;
    let spender: SignerWithAddress;
    let instance: IMultiToken;

    before(async () => {
      [holder, spender] = await ethers.getSigners();
    });

    beforeEach(async () => {
      instance = await deploy();
    });

    // TODO: nonstandard usage
    describeBehaviorOfIntrospectable(
      deploy,
      {
        interfaceIds: ['0xd9b67a26'],
      },
      skips,
    );

    describe('#balanceOf(address,uint256)', () => {
      it('returns the balance of given token held by given address', async () => {
        const id = args.tokenId ?? 0n;
        expect(
          await instance.balanceOf.staticCall(holder.address, id),
        ).to.equal(0);

        const amount = 2n;
        await args.mint(holder.address, id, amount);

        expect(
          await instance.balanceOf.staticCall(holder.address, id),
        ).to.equal(amount);

        await args.burn(holder.address, id, amount);

        expect(
          await instance.balanceOf.staticCall(holder.address, id),
        ).to.equal(0);
      });

      describe('reverts if', () => {
        it('balance of zero address is queried', async () => {
          await expect(
            instance.balanceOf.staticCall(ethers.ZeroAddress, 0n),
          ).to.be.revertedWithCustomError(
            instance,
            'MultiToken__BalanceQueryZeroAddress',
          );
        });
      });
    });

    describe('#balanceOfBatch(address[],uint256[])', () => {
      it('returns the balances of given tokens held by given addresses', async () => {
        expect(
          Array.from(
            await instance.balanceOfBatch.staticCall([holder.address], [0n]),
          ),
        ).to.have.deep.members([0n]);
        // TODO: test delta
      });

      describe('reverts if', () => {
        it('input array lengths do not match', async () => {
          await expect(
            instance.balanceOfBatch.staticCall([holder.address], []),
          ).to.be.revertedWithCustomError(
            instance,
            'MultiToken__ArrayLengthMismatch',
          );
        });

        it('balance of zero address is queried', async () => {
          await expect(
            instance.balanceOfBatch.staticCall([ethers.ZeroAddress], [0n]),
          ).to.be.revertedWithCustomError(
            instance,
            'MultiToken__BalanceQueryZeroAddress',
          );
        });
      });
    });

    describe('#isApprovedForAll(address,address)', () => {
      it('returns whether given operator is approved to spend tokens of given account', async () => {
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
      });
    });

    describe('#setApprovalForAll(address,bool)', () => {
      it('approves given operator to spend tokens on behalf of sender', async () => {
        await instance.connect(holder).setApprovalForAll(spender.address, true);

        expect(
          await instance.isApprovedForAll.staticCall(
            holder.address,
            spender.address,
          ),
        ).to.be.true;

        // TODO: test case is no different from #isApprovedForAll test; tested further by #safeTransferFrom and #safeBatchTransferFrom tests
      });

      describe('reverts if', () => {
        it('given operator is sender', async () => {
          await expect(
            instance.connect(holder).setApprovalForAll(holder.address, true),
          ).to.be.revertedWithCustomError(instance, 'MultiToken__SelfApproval');
        });
      });
    });

    describe('#safeTransferFrom(address,address,uint256,uint256,bytes)', () => {
      it('sends amount from A to B', async () => {
        const id = args.tokenId ?? 0n;
        const amount = 2n;

        await args.mint(spender.address, id, amount);

        expect(
          await instance.balanceOf.staticCall(spender.address, id),
        ).to.equal(amount);

        await instance
          .connect(spender)
          .safeTransferFrom(
            spender.address,
            holder.address,
            id,
            amount,
            ethers.randomBytes(0),
          );

        expect(
          await instance.balanceOf.staticCall(spender.address, id),
        ).to.equal(0n);
        expect(
          await instance.balanceOf.staticCall(holder.address, id),
        ).to.equal(amount);
      });

      describe('reverts if', () => {
        it('sender has insufficient balance', async () => {
          const id = args.tokenId ?? 0n;
          const amount = 2n;

          await expect(
            instance
              .connect(spender)
              .safeTransferFrom(
                spender.address,
                holder.address,
                id,
                amount,
                ethers.randomBytes(0),
              ),
          ).to.be.revertedWithCustomError(
            instance,
            'MultiToken__TransferExceedsBalance',
          );
        });

        it('operator is not approved to act on behalf of sender', async () => {
          await expect(
            instance
              .connect(holder)
              .safeTransferFrom(
                spender.address,
                holder.address,
                0n,
                0n,
                ethers.randomBytes(0),
              ),
          ).to.be.revertedWithCustomError(
            instance,
            'MultiToken__NotOwnerOrApproved',
          );
        });

        it('receiver is invalid ERC1155Receiver', async () => {
          const mock = await deployMockContract(holder, [
            /* no functions */
          ]);

          await expect(
            instance
              .connect(spender)
              .safeTransferFrom(
                spender.address,
                mock.address,
                0n,
                0n,
                ethers.randomBytes(0),
              ),
          ).to.be.revertedWith('Mock on the method is not initialized');
        });

        it('receiver rejects transfer', async () => {
          const mock = await deployMockContract(holder, [
            'function onERC1155Received (address, address, uint, uint, bytes) external view returns (bytes4)',
          ]);

          await mock.mock.onERC1155Received.returns('0x00000000');

          await expect(
            instance
              .connect(spender)
              .safeTransferFrom(
                spender.address,
                mock.address,
                0n,
                0n,
                ethers.randomBytes(0),
              ),
          ).to.be.revertedWithCustomError(
            instance,
            'MultiToken__ERC1155ReceiverRejected',
          );
        });
      });
    });

    describe('#safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)', () => {
      it('sends amount from A to B, batch version', async () => {
        const id = args.tokenId ?? 0n;
        const amount = 2n;

        await args.mint(spender.address, id, amount);

        expect(
          Array.from(
            await instance.balanceOfBatch.staticCall([spender.address], [id]),
          ),
        ).to.have.deep.members([amount]);

        await instance
          .connect(spender)
          .safeBatchTransferFrom(
            spender.address,
            holder.address,
            [id],
            [amount],
            ethers.randomBytes(0),
          );

        expect(
          Array.from(
            await instance.balanceOfBatch.staticCall([spender.address], [id]),
          ),
        ).to.have.deep.members([0n]);
        expect(
          Array.from(
            await instance.balanceOfBatch.staticCall([holder.address], [id]),
          ),
        ).to.have.deep.members([amount]);
      });

      describe('reverts if', () => {
        it('sender has insufficient balance', async () => {
          const id = args.tokenId ?? 0n;
          const amount = 2n;

          await expect(
            instance
              .connect(spender)
              .safeBatchTransferFrom(
                spender.address,
                holder.address,
                [id],
                [amount],
                ethers.randomBytes(0),
              ),
          ).to.be.revertedWithCustomError(
            instance,
            'MultiToken__TransferExceedsBalance',
          );
        });

        it('operator is not approved to act on behalf of sender', async () => {
          await expect(
            instance
              .connect(holder)
              .safeBatchTransferFrom(
                spender.address,
                holder.address,
                [],
                [],
                ethers.randomBytes(0),
              ),
          ).to.be.revertedWithCustomError(
            instance,
            'MultiToken__NotOwnerOrApproved',
          );
        });

        it('receiver is invalid ERC1155Receiver', async () => {
          const mock = await deployMockContract(holder, [
            /* no functions */
          ]);

          await expect(
            instance
              .connect(spender)
              .safeBatchTransferFrom(
                spender.address,
                mock.address,
                [],
                [],
                ethers.randomBytes(0),
              ),
          ).to.be.revertedWith('Mock on the method is not initialized');
        });

        it('receiver rejects transfer', async () => {
          const mock = await deployMockContract(holder, [
            'function onERC1155BatchReceived (address, address, uint[], uint[], bytes) external view returns (bytes4)',
          ]);

          await mock.mock.onERC1155BatchReceived.returns('0x00000000');

          await expect(
            instance
              .connect(spender)
              .safeBatchTransferFrom(
                spender.address,
                mock.address,
                [],
                [],
                ethers.randomBytes(0),
              ),
          ).to.be.revertedWithCustomError(
            instance,
            'MultiToken__ERC1155ReceiverRejected',
          );
        });
      });
    });
  });
}
