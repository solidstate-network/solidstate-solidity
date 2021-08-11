import { expect } from 'chai';
import { describeFilter } from '@solidstate/library';
import { ethers } from 'hardhat';
import { deployMockContract } from 'ethereum-waffle';
import { ERC721Base } from '../../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, ContractTransaction } from 'ethers';

interface ERC721BaseBehaviorArgs {
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

    describe('#balanceOf', function () {
      it('returns the token balance of given address', async function () {
        expect(
          await instance.callStatic['balanceOf(address)'](
            holder.address,
          ),
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
            instance.callStatic.balanceOf(ethers.constants.AddressZero)
          ).to.be.revertedWith('ERC721: balance query for the zero address')
        })
      })
    });

    describe('#ownerOf', function () {
      it('returns the owner of given token', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        expect(
          await instance.callStatic.ownerOf(tokenId),
        ).to.equal(holder.address);
      });

      describe('reverts if', function () {
        it('token does not exist', async function () {
          await expect(
            instance.callStatic.ownerOf(ethers.constants.Two),
          ).to.be.revertedWith('EnumerableMap: nonexistent key');
        });

        it('owner is zero address');
      })
    });

    describe('#getApproved', function () {
      it('TODO: returns the approved spenders of given token');
    });

    describe('#isApprovedForAll', function () {
      it(
        'TODO: returns true if operator is approved for all tokens of given holder',
      );
    });

    describe('#isApprovedForAll', function () {
      it(
        'TODO: returns true if operator is approved for all tokens of given holder',
      );
    });

    describe('#transferFrom', function () {
      it('TODO: transfers tokenId from a to b');

      it('does not revert if recipient is not ERC721Receiver implementer', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        // TODO: test against contract other than self

        await expect(
          instance.connect(holder).transferFrom(
            holder.address,
            instance.address,
            tokenId
          )
        ).not.to.be.reverted;
      });

      it('does not revert if recipient is ERC721Receiver implementer but does not accept transfer', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        const receiverContract = await deployMockContract(sender, [
          'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
        ]);

        await receiverContract.mock.onERC721Received.returns(ethers.utils.randomBytes(4));

        await expect(
          instance.connect(holder).transferFrom(
            holder.address,
            receiverContract.address,
            tokenId
          )
        ).not.to.be.reverted;
      });

      describe('reverts if', function () {
        it('todo');
      });
    });

    describe('#safeTransferFrom', function () {
      describe('(address,address,uint256)', function () {
        it('todo');

        describe('reverts if', function () {
          it('todo');

          it('recipient is not ERC721Receiver implementer', async function () {
            const tokenId = ethers.constants.Two;
            await mint(holder.address, tokenId);

            // TODO: test against contract other than self

            await expect(
              instance.connect(holder)['safeTransferFrom(address,address,uint256)'](
                holder.address,
                instance.address,
                tokenId
              )
            ).to.be.revertedWith('ERC721: transfer to non ERC721Receiver implementer');
          });

          it('recipient is ERC721Receiver implementer but does not accept transfer', async function () {
            const tokenId = ethers.constants.Two;
            await mint(holder.address, tokenId);

            const receiverContract = await deployMockContract(sender, [
              'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
            ]);

            await receiverContract.mock.onERC721Received.returns(ethers.utils.randomBytes(4));

            await expect(
              instance.connect(holder)['safeTransferFrom(address,address,uint256)'](
                holder.address,
                receiverContract.address,
                tokenId
              )
            ).to.be.revertedWith('ERC721: transfer to non ERC721Receiver implementer');
          });
        });
      });

      describe('(address,address,uint256,bytes)', function () {
        it('todo');

        describe('reverts if', function () {
          it('todo');

          it('recipient is not ERC721Receiver implementer', async function () {
            const tokenId = ethers.constants.Two;
            await mint(holder.address, tokenId);

            // TODO: test against contract other than self

            await expect(
              instance.connect(holder)['safeTransferFrom(address,address,uint256,bytes)'](
                holder.address,
                instance.address,
                tokenId,
                '0x'
              )
            ).to.be.revertedWith('ERC721: transfer to non ERC721Receiver implementer');
          });

          it('recipient is ERC721Receiver implementer but does not accept transfer', async function () {
            const tokenId = ethers.constants.Two;
            await mint(holder.address, tokenId);

            const receiverContract = await deployMockContract(sender, [
              'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
            ]);

            await receiverContract.mock.onERC721Received.returns(ethers.utils.randomBytes(4));

            await expect(
              instance.connect(holder)['safeTransferFrom(address,address,uint256,bytes)'](
                holder.address,
                receiverContract.address,
                tokenId,
                '0x'
              )
            ).to.be.revertedWith('ERC721: transfer to non ERC721Receiver implementer');
          });
        });
      });
    });

    describe('#approve', function () {
      it('todo')

      it('does not revert if sender is approved to spend all tokens held by owner', async function () {
        const tokenId = ethers.constants.Two;
        await mint(holder.address, tokenId);

        await instance.connect(holder).setApprovalForAll(receiver.address, true);

        await expect(
          instance.connect(receiver).approve(receiver.address, tokenId)
        ).not.to.be.reverted;
      })

      describe('reverts if', function () {
        it('spender is current owner of given token', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await expect(
            instance.connect(holder).approve(holder.address, tokenId)
          ).to.be.revertedWith('ERC721: approval to current owner')
        })

        it('send is not owner of given token', async function () {
          const tokenId = ethers.constants.Two;
          await mint(holder.address, tokenId);

          await expect(
            instance.connect(receiver).approve(receiver.address, tokenId)
          ).to.be.revertedWith('ERC721: approve caller is not owner nor approved for all')
        })
      })
    })

    describe('#setApprovalForAll', function () {
      it('todo')
    })
  });
}
