import { expect } from 'chai';
import { ethers } from 'hardhat';

import { describeFilter } from '@solidstate/library/mocha_describe_filter';
import { deployMockContract } from 'ethereum-waffle';
import { describeBehaviorOfERC165 } from '../../introspection/ERC165.behavior';
import { ERC1155Base } from '@solidstate/typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, ContractTransaction } from 'ethers';

interface ERC1155BaseBehaviorArgs {
  deploy: () => Promise<ERC1155Base>;
  mint: (
    address: string,
    id: BigNumber,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
  burn: (
    address: string,
    id: BigNumber,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
}

export function describeBehaviorOfERC1155Base(
  { deploy, mint, burn }: ERC1155BaseBehaviorArgs,
  skips: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1155Base', function () {
    let holder: SignerWithAddress;
    let spender: SignerWithAddress;
    let instance: ERC1155Base;

    before(async function () {
      [holder, spender] = await ethers.getSigners();
    });

    beforeEach(async function () {
      instance = await deploy();
    });

    describeBehaviorOfERC165(
      {
        deploy,
        interfaceIds: ['0xd9b67a26'],
      },
      skips,
    );

    describe('#balanceOf', function () {
      it('returns the balance of given token held by given address', async function () {
        const id = ethers.constants.Zero;
        expect(
          await instance.callStatic['balanceOf(address,uint256)'](
            holder.address,
            id,
          ),
        ).to.equal(0);

        const amount = ethers.constants.Two;
        await mint(holder.address, id, amount);

        expect(
          await instance.callStatic['balanceOf(address,uint256)'](
            holder.address,
            id,
          ),
        ).to.equal(amount);

        await burn(holder.address, id, amount);

        expect(
          await instance.callStatic['balanceOf(address,uint256)'](
            holder.address,
            id,
          ),
        ).to.equal(0);
      });

      describe('reverts if', function () {
        it('balance of zero address is queried', async function () {
          await expect(
            instance.callStatic['balanceOf(address,uint256)'](
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC1155: balance query for the zero address');
        });
      });
    });

    describe('#balanceOfBatch', function () {
      it('returns the balances of given tokens held by given addresses', async function () {
        expect(
          await instance.callStatic['balanceOfBatch(address[],uint256[])'](
            [holder.address],
            [ethers.constants.Zero],
          ),
        ).to.have.deep.members([ethers.constants.Zero]);
        // TODO: test delta
      });

      describe('reverts if', function () {
        it('input array lengths do not match', async function () {
          await expect(
            instance.callStatic['balanceOfBatch(address[],uint256[])'](
              [holder.address],
              [],
            ),
          ).to.be.revertedWith('ERC1155: accounts and ids length mismatch');
        });

        it('balance of zero address is queried', async function () {
          await expect(
            instance.callStatic['balanceOfBatch(address[],uint256[])'](
              [ethers.constants.AddressZero],
              [ethers.constants.Zero],
            ),
          ).to.be.revertedWith(
            'ERC1155: batch balance query for the zero address',
          );
        });
      });
    });

    describe('#isApprovedForAll', function () {
      it('returns whether given operator is approved to spend tokens of given account', async function () {
        expect(
          await instance.callStatic['isApprovedForAll(address,address)'](
            holder.address,
            spender.address,
          ),
        ).to.be.false;

        await instance
          .connect(holder)
          ['setApprovalForAll(address,bool)'](spender.address, true);

        expect(
          await instance.callStatic['isApprovedForAll(address,address)'](
            holder.address,
            spender.address,
          ),
        ).to.be.true;
      });
    });

    describe('#setApprovalForAll', function () {
      it('approves given operator to spend tokens on behalf of sender', async function () {
        await instance
          .connect(holder)
          ['setApprovalForAll(address,bool)'](spender.address, true);

        expect(
          await instance.callStatic['isApprovedForAll(address,address)'](
            holder.address,
            spender.address,
          ),
        ).to.be.true;

        // TODO: test case is no different from #isApprovedForAll test; tested further by #safeTransferFrom and #safeBatchTransferFrom tests
      });

      describe('reverts if', function () {
        it('given operator is sender', async function () {
          await expect(
            instance
              .connect(holder)
              ['setApprovalForAll(address,bool)'](holder.address, true),
          ).to.be.revertedWith('ERC1155: setting approval status for self');
        });
      });
    });

    describe('#safeTransferFrom', function () {
      it('sends amount from A to B', async function () {
        const id = ethers.constants.Zero;
        const amount = ethers.constants.Two;

        await mint(spender.address, id, amount);

        expect(
          await instance.callStatic['balanceOf(address,uint256)'](
            spender.address,
            id,
          ),
        ).to.equal(amount);

        await instance
          .connect(spender)
          ['safeTransferFrom(address,address,uint256,uint256,bytes)'](
            spender.address,
            holder.address,
            id,
            amount,
            ethers.utils.randomBytes(0),
          );

        expect(
          await instance.callStatic['balanceOf(address,uint256)'](
            spender.address,
            id,
          ),
        ).to.equal(ethers.constants.Zero);
        expect(
          await instance.callStatic['balanceOf(address,uint256)'](
            holder.address,
            id,
          ),
        ).to.equal(amount);
      });

      describe('reverts if', function () {
        it('sender has insufficient balance', async function () {
          const id = ethers.constants.Zero;
          const amount = ethers.constants.Two;

          await expect(
            instance
              .connect(spender)
              ['safeTransferFrom(address,address,uint256,uint256,bytes)'](
                spender.address,
                holder.address,
                id,
                amount,
                ethers.utils.randomBytes(0),
              ),
          ).to.be.revertedWith('ERC1155: insufficient balances for transfer');
        });

        it('operator is not approved to act on behalf of sender', async function () {
          await expect(
            instance
              .connect(holder)
              ['safeTransferFrom(address,address,uint256,uint256,bytes)'](
                spender.address,
                holder.address,
                ethers.constants.Zero,
                ethers.constants.Zero,
                ethers.utils.randomBytes(0),
              ),
          ).to.be.revertedWith('ERC1155: caller is not owner nor approved');
        });

        it('receiver is invalid ERC1155Receiver', async function () {
          const mock = await deployMockContract(holder, [
            /* no functions */
          ]);

          await expect(
            instance
              .connect(spender)
              ['safeTransferFrom(address,address,uint256,uint256,bytes)'](
                spender.address,
                mock.address,
                ethers.constants.Zero,
                ethers.constants.Zero,
                ethers.utils.randomBytes(0),
              ),
          ).to.be.revertedWith('Mock on the method is not initialized');
        });

        it('receiver rejects transfer', async function () {
          const mock = await deployMockContract(holder, [
            'function onERC1155Received (address, address, uint, uint, bytes) external view returns (bytes4)',
          ]);

          await mock.mock.onERC1155Received.returns('0x00000000');

          await expect(
            instance
              .connect(spender)
              ['safeTransferFrom(address,address,uint256,uint256,bytes)'](
                spender.address,
                mock.address,
                ethers.constants.Zero,
                ethers.constants.Zero,
                ethers.utils.randomBytes(0),
              ),
          ).to.be.revertedWith('ERC1155: ERC1155Receiver rejected tokens');
        });
      });
    });

    describe('#safeBatchTransferFrom', function () {
      it('sends amount from A to B, batch version', async function () {
        const id = ethers.constants.Zero;
        const amount = ethers.constants.Two;

        await mint(spender.address, id, amount);

        expect(
          await instance.callStatic['balanceOfBatch(address[],uint256[])'](
            [spender.address],
            [id],
          ),
        ).to.have.deep.members([amount]);

        await instance
          .connect(spender)
          ['safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)'](
            spender.address,
            holder.address,
            [id],
            [amount],
            ethers.utils.randomBytes(0),
          );

        expect(
          await instance.callStatic['balanceOfBatch(address[],uint256[])'](
            [spender.address],
            [id],
          ),
        ).to.have.deep.members([ethers.constants.Zero]);
        expect(
          await instance.callStatic['balanceOfBatch(address[],uint256[])'](
            [holder.address],
            [id],
          ),
        ).to.have.deep.members([amount]);
      });

      describe('reverts if', function () {
        it('sender has insufficient balance', async function () {
          const id = ethers.constants.Zero;
          const amount = ethers.constants.Two;

          await expect(
            instance
              .connect(spender)
              [
                'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)'
              ](
                spender.address,
                holder.address,
                [id],
                [amount],
                ethers.utils.randomBytes(0),
              ),
          ).to.be.revertedWith('ERC1155: insufficient balances for transfer');
        });

        it('operator is not approved to act on behalf of sender', async function () {
          await expect(
            instance
              .connect(holder)
              [
                'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)'
              ](
                spender.address,
                holder.address,
                [],
                [],
                ethers.utils.randomBytes(0),
              ),
          ).to.be.revertedWith('ERC1155: caller is not owner nor approved');
        });

        it('receiver is invalid ERC1155Receiver', async function () {
          const mock = await deployMockContract(holder, [
            /* no functions */
          ]);

          await expect(
            instance
              .connect(spender)
              [
                'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)'
              ](
                spender.address,
                mock.address,
                [],
                [],
                ethers.utils.randomBytes(0),
              ),
          ).to.be.revertedWith('Mock on the method is not initialized');
        });

        it('receiver rejects transfer', async function () {
          const mock = await deployMockContract(holder, [
            'function onERC1155BatchReceived (address, address, uint[], uint[], bytes) external view returns (bytes4)',
          ]);

          await mock.mock.onERC1155BatchReceived.returns('0x00000000');

          await expect(
            instance
              .connect(spender)
              [
                'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)'
              ](
                spender.address,
                mock.address,
                [],
                [],
                ethers.utils.randomBytes(0),
              ),
          ).to.be.revertedWith('ERC1155: ERC1155Receiver rejected tokens');
        });
      });
    });
  });
}
