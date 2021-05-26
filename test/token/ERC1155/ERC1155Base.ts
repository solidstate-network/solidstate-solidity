import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeBehaviorOfERC1155Base } from '@solidstate/spec/token/ERC1155/ERC1155Base.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ERC1155BaseMock, ERC1155BaseMock__factory } from '../../../typechain';

const deploy = async () => {
  return new ERC1155BaseMock__factory().deploy();
};

describe('ERC1155Base', function () {
  let holder: SignerWithAddress;
  let recipient: SignerWithAddress;
  let instance: ERC1155BaseMock;
  let invalidReceiver: string;

  before(async function () {
    [holder, recipient] = await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await deploy();
    invalidReceiver = instance.address;
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfERC1155Base(
    {
      deploy: async () => instance,
      mint: (recipient, tokenId, amount) =>
        instance.mint(recipient, tokenId, amount),
      burn: (recipient, tokenId, amount) =>
        instance.burn(recipient, tokenId, amount),
    },
    [],
  );

  describe('__internal', function () {
    describe('#_mint', function () {
      it('increases balance of given token held by given account by given amount', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        let initialBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );

        await instance['mint(address,uint256,uint256)'](
          holder.address,
          id,
          amount,
        );

        let finalBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );

        expect(finalBalance.sub(initialBalance)).to.equal(amount);
      });

      it('emits TransferSingle event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await expect(
          instance['mint(address,uint256,uint256)'](holder.address, id, amount),
        )
          .to.emit(instance, 'TransferSingle')
          .withArgs(
            holder.address,
            ethers.constants.AddressZero,
            holder.address,
            id,
            amount,
          );
      });

      describe('reverts if', function () {
        it('mint is made to the zero address', async function () {
          await expect(
            instance['mint(address,uint256,uint256)'](
              ethers.constants.AddressZero,
              ethers.constants.Zero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC1155: mint to the zero address');
        });
      });
    });

    describe('#_safeMint', function () {
      it('increases balance of given token held by given account by given amount', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        let initialBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );

        await instance['safeMint(address,uint256,uint256)'](
          holder.address,
          id,
          amount,
        );

        let finalBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );

        expect(finalBalance.sub(initialBalance)).to.equal(amount);
      });

      it('emits TransferSingle event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await expect(
          instance['safeMint(address,uint256,uint256)'](
            holder.address,
            id,
            amount,
          ),
        )
          .to.emit(instance, 'TransferSingle')
          .withArgs(
            holder.address,
            ethers.constants.AddressZero,
            holder.address,
            id,
            amount,
          );
      });

      describe('reverts if', function () {
        it('mint is made to the zero address', async function () {
          await expect(
            instance['safeMint(address,uint256,uint256)'](
              ethers.constants.AddressZero,
              ethers.constants.Zero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC1155: mint to the zero address');
        });

        it('mint is made to invalid receiver', async function () {
          await expect(
            instance['safeMint(address,uint256,uint256)'](
              invalidReceiver,
              ethers.constants.Zero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith(
            'ERC1155: transfer to non ERC1155Receiver implementer',
          );
        });
      });
    });

    describe('#_mintBatch', function () {
      it('increases balances of given tokens held by given account by given amounts', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        let initialBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );

        await instance['mintBatch(address,uint256[],uint256[])'](
          holder.address,
          [id],
          [amount],
        );

        let finalBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );

        expect(finalBalance.sub(initialBalance)).to.equal(amount);
      });

      it('emits TransferBatch event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await expect(
          instance['mintBatch(address,uint256[],uint256[])'](
            holder.address,
            [id],
            [amount],
          ),
        )
          .to.emit(instance, 'TransferBatch')
          .withArgs(
            holder.address,
            ethers.constants.AddressZero,
            holder.address,
            [id],
            [amount],
          );
      });

      describe('reverts if', function () {
        it('mint is made to the zero address', async function () {
          await expect(
            instance['mintBatch(address,uint256[],uint256[])'](
              ethers.constants.AddressZero,
              [],
              [],
            ),
          ).to.be.revertedWith('ERC1155: mint to the zero address');
        });

        it('input array lengths do not match', async function () {
          await expect(
            instance['mintBatch(address,uint256[],uint256[])'](
              holder.address,
              [ethers.constants.Zero],
              [],
            ),
          ).to.be.revertedWith('ERC1155: ids and amounts length mismatch');
        });
      });
    });

    describe('#_safeMintBatch', function () {
      it('increases balances of given tokens held by given account by given amounts', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        let initialBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );

        await instance['safeMintBatch(address,uint256[],uint256[])'](
          holder.address,
          [id],
          [amount],
        );

        let finalBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );

        expect(finalBalance.sub(initialBalance)).to.equal(amount);
      });

      it('emits TransferBatch event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await expect(
          instance['safeMintBatch(address,uint256[],uint256[])'](
            holder.address,
            [id],
            [amount],
          ),
        )
          .to.emit(instance, 'TransferBatch')
          .withArgs(
            holder.address,
            ethers.constants.AddressZero,
            holder.address,
            [id],
            [amount],
          );
      });

      describe('reverts if', function () {
        it('mint is made to the zero address', async function () {
          await expect(
            instance['safeMintBatch(address,uint256[],uint256[])'](
              ethers.constants.AddressZero,
              [],
              [],
            ),
          ).to.be.revertedWith('ERC1155: mint to the zero address');
        });

        it('input array lengths do not match', async function () {
          await expect(
            instance['safeMintBatch(address,uint256[],uint256[])'](
              holder.address,
              [ethers.constants.Zero],
              [],
            ),
          ).to.be.revertedWith('ERC1155: ids and amounts length mismatch');
        });

        it('mint is made to invalid receiver', async function () {
          await expect(
            instance['safeMintBatch(address,uint256[],uint256[])'](
              instance.address,
              [],
              [],
            ),
          ).to.be.revertedWith(
            'ERC1155: transfer to non ERC1155Receiver implementer',
          );
        });
      });
    });

    describe('#_burn', function () {
      it('decreases balance of given token held by given account by given amount', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance['mint(address,uint256,uint256)'](
          holder.address,
          id,
          amount,
        );

        let initialBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );

        await instance['burn(address,uint256,uint256)'](
          holder.address,
          id,
          amount,
        );

        let finalBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );

        expect(initialBalance.sub(finalBalance)).to.equal(amount);
      });

      it('emits TransferSingle event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance['mint(address,uint256,uint256)'](
          holder.address,
          id,
          amount,
        );

        await expect(
          instance['burn(address,uint256,uint256)'](holder.address, id, amount),
        )
          .to.emit(instance, 'TransferSingle')
          .withArgs(
            holder.address,
            holder.address,
            ethers.constants.AddressZero,
            id,
            amount,
          );
      });

      describe('reverts if', function () {
        it('burn is made from the zero address', async function () {
          await expect(
            instance['burn(address,uint256,uint256)'](
              ethers.constants.AddressZero,
              ethers.constants.Zero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC1155: burn from the zero address');
        });

        it('burn amount exceeds balance', async function () {
          await expect(
            instance['burn(address,uint256,uint256)'](
              holder.address,
              ethers.constants.Zero,
              ethers.constants.One,
            ),
          ).to.be.revertedWith('ERC1155: burn amount exceeds balance');
        });
      });
    });

    describe('#_burnBatch', function () {
      it('decreases balances of given tokens held by given account by given amounts', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance['mint(address,uint256,uint256)'](
          holder.address,
          id,
          amount,
        );

        let initialBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );

        await instance['burnBatch(address,uint256[],uint256[])'](
          holder.address,
          [id],
          [amount],
        );

        let finalBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );

        expect(initialBalance.sub(finalBalance)).to.equal(amount);
      });

      it('emits TransferBatch event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance['mintBatch(address,uint256[],uint256[])'](
          holder.address,
          [id],
          [amount],
        );

        await expect(
          instance['burnBatch(address,uint256[],uint256[])'](
            holder.address,
            [id],
            [amount],
          ),
        )
          .to.emit(instance, 'TransferBatch')
          .withArgs(
            holder.address,
            holder.address,
            ethers.constants.AddressZero,
            [id],
            [amount],
          );
      });

      describe('reverts if', function () {
        it('burn is made from the zero address', async function () {
          await expect(
            instance['burnBatch(address,uint256[],uint256[])'](
              ethers.constants.AddressZero,
              [],
              [],
            ),
          ).to.be.revertedWith('ERC1155: burn from the zero address');
        });

        it('input array lengths do not match', async function () {
          await expect(
            instance['burnBatch(address,uint256[],uint256[])'](
              holder.address,
              [ethers.constants.Zero],
              [],
            ),
          ).to.be.revertedWith('ERC1155: ids and amounts length mismatch');
        });

        it('burn amount exceeds balance', async function () {
          await expect(
            instance['burnBatch(address,uint256[],uint256[])'](
              holder.address,
              [ethers.constants.Zero],
              [ethers.constants.One],
            ),
          ).to.be.revertedWith('ERC1155: burn amount exceeds balance');
        });
      });
    });

    describe('#_transfer', function () {
      it('decreases balances of sender and increases balances of recipient by given amounts', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance['mint(address,uint256,uint256)'](
          holder.address,
          id,
          amount,
        );

        let initialSenderBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );
        let initialRecipientBalance = await instance[
          'balanceOf(address,uint256)'
        ](recipient.address, id);

        await instance[
          'transfer(address,address,address,uint256,uint256,bytes)'
        ](
          instance.address,
          holder.address,
          recipient.address,
          id,
          amount,
          ethers.utils.randomBytes(0),
        );

        let finalSenderBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );
        let finalRecipientBalance = await instance[
          'balanceOf(address,uint256)'
        ](recipient.address, id);

        expect(initialSenderBalance.sub(finalSenderBalance)).to.equal(amount);
        expect(finalRecipientBalance.sub(initialRecipientBalance)).to.equal(
          amount,
        );
      });

      it('emits TransferSingle event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance['mintBatch(address,uint256[],uint256[])'](
          holder.address,
          [id],
          [amount],
        );

        await expect(
          instance['transfer(address,address,address,uint256,uint256,bytes)'](
            holder.address,
            holder.address,
            recipient.address,
            id,
            amount,
            ethers.utils.randomBytes(0),
          ),
        )
          .to.emit(instance, 'TransferSingle')
          .withArgs(
            holder.address,
            holder.address,
            recipient.address,
            id,
            amount,
          );
      });

      describe('reverts if', function () {
        it('transfer is made to the zero address', async function () {
          await expect(
            instance['transfer(address,address,address,uint256,uint256,bytes)'](
              instance.address,
              holder.address,
              ethers.constants.AddressZero,
              ethers.constants.Zero,
              ethers.constants.Zero,
              ethers.utils.randomBytes(0),
            ),
          ).to.be.revertedWith('ERC1155: transfer to the zero address');
        });

        it('transfer amount exceeds balance', async function () {
          await expect(
            instance['transfer(address,address,address,uint256,uint256,bytes)'](
              instance.address,
              holder.address,
              recipient.address,
              ethers.constants.Zero,
              ethers.constants.One,
              ethers.utils.randomBytes(0),
            ),
          ).to.be.revertedWith('ERC1155: insufficient balances for transfer');
        });
      });
    });

    describe('#_safeTransfer', function () {
      it('decreases balances of sender and increases balances of recipient by given amounts', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance['mint(address,uint256,uint256)'](
          holder.address,
          id,
          amount,
        );

        let initialSenderBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );
        let initialRecipientBalance = await instance[
          'balanceOf(address,uint256)'
        ](recipient.address, id);

        await instance[
          'safeTransfer(address,address,address,uint256,uint256,bytes)'
        ](
          instance.address,
          holder.address,
          recipient.address,
          id,
          amount,
          ethers.utils.randomBytes(0),
        );

        let finalSenderBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );
        let finalRecipientBalance = await instance[
          'balanceOf(address,uint256)'
        ](recipient.address, id);

        expect(initialSenderBalance.sub(finalSenderBalance)).to.equal(amount);
        expect(finalRecipientBalance.sub(initialRecipientBalance)).to.equal(
          amount,
        );
      });

      it('emits TransferSingle event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance['mintBatch(address,uint256[],uint256[])'](
          holder.address,
          [id],
          [amount],
        );

        await expect(
          instance[
            'safeTransfer(address,address,address,uint256,uint256,bytes)'
          ](
            holder.address,
            holder.address,
            recipient.address,
            id,
            amount,
            ethers.utils.randomBytes(0),
          ),
        )
          .to.emit(instance, 'TransferSingle')
          .withArgs(
            holder.address,
            holder.address,
            recipient.address,
            id,
            amount,
          );
      });

      describe('reverts if', function () {
        it('transfer is made to the zero address', async function () {
          await expect(
            instance[
              'safeTransfer(address,address,address,uint256,uint256,bytes)'
            ](
              instance.address,
              holder.address,
              ethers.constants.AddressZero,
              ethers.constants.Zero,
              ethers.constants.Zero,
              ethers.utils.randomBytes(0),
            ),
          ).to.be.revertedWith('ERC1155: transfer to the zero address');
        });

        it('transfer amount exceeds balance', async function () {
          await expect(
            instance[
              'safeTransfer(address,address,address,uint256,uint256,bytes)'
            ](
              instance.address,
              holder.address,
              recipient.address,
              ethers.constants.Zero,
              ethers.constants.One,
              ethers.utils.randomBytes(0),
            ),
          ).to.be.revertedWith('ERC1155: insufficient balances for transfer');
        });

        it('transfer is made to invalid receiver', async function () {
          await expect(
            instance[
              'safeTransfer(address,address,address,uint256,uint256,bytes)'
            ](
              instance.address,
              holder.address,
              invalidReceiver,
              ethers.constants.Zero,
              ethers.constants.Zero,
              ethers.utils.randomBytes(0),
            ),
          ).to.be.revertedWith(
            'ERC1155: transfer to non ERC1155Receiver implementer',
          );
        });
      });
    });

    describe('#_transferBatch', function () {
      it('decreases balances of sender and increases balances of recipient by given amounts', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance['mint(address,uint256,uint256)'](
          holder.address,
          id,
          amount,
        );

        let initialSenderBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );
        let initialRecipientBalance = await instance[
          'balanceOf(address,uint256)'
        ](recipient.address, id);

        await instance[
          'transferBatch(address,address,address,uint256[],uint256[],bytes)'
        ](
          instance.address,
          holder.address,
          recipient.address,
          [id],
          [amount],
          ethers.utils.randomBytes(0),
        );

        let finalSenderBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );
        let finalRecipientBalance = await instance[
          'balanceOf(address,uint256)'
        ](recipient.address, id);

        expect(initialSenderBalance.sub(finalSenderBalance)).to.equal(amount);
        expect(finalRecipientBalance.sub(initialRecipientBalance)).to.equal(
          amount,
        );
      });

      it('emits TransferBatch event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance['mintBatch(address,uint256[],uint256[])'](
          holder.address,
          [id],
          [amount],
        );

        await expect(
          instance[
            'transferBatch(address,address,address,uint256[],uint256[],bytes)'
          ](
            holder.address,
            holder.address,
            recipient.address,
            [id],
            [amount],
            ethers.utils.randomBytes(0),
          ),
        )
          .to.emit(instance, 'TransferBatch')
          .withArgs(
            holder.address,
            holder.address,
            recipient.address,
            [id],
            [amount],
          );
      });

      describe('reverts if', function () {
        it('transfer is made to the zero address', async function () {
          await expect(
            instance[
              'transferBatch(address,address,address,uint256[],uint256[],bytes)'
            ](
              instance.address,
              holder.address,
              ethers.constants.AddressZero,
              [],
              [],
              ethers.utils.randomBytes(0),
            ),
          ).to.be.revertedWith('ERC1155: transfer to the zero address');
        });

        it('input array lengths do not match', async function () {
          await expect(
            instance[
              'transferBatch(address,address,address,uint256[],uint256[],bytes)'
            ](
              instance.address,
              holder.address,
              recipient.address,
              [ethers.constants.Zero],
              [],
              ethers.utils.randomBytes(0),
            ),
          ).to.be.revertedWith('ERC1155: ids and amounts length mismatch');
        });

        it('transfer amount exceeds balance', async function () {
          await expect(
            instance[
              'transferBatch(address,address,address,uint256[],uint256[],bytes)'
            ](
              instance.address,
              holder.address,
              recipient.address,
              [ethers.constants.Zero],
              [ethers.constants.One],
              ethers.utils.randomBytes(0),
            ),
          ).to.be.revertedWith('ERC1155: insufficient balances for transfer');
        });
      });
    });

    describe('#_safeTransferBatch', function () {
      it('decreases balances of sender and increases balances of recipient by given amounts', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance['mint(address,uint256,uint256)'](
          holder.address,
          id,
          amount,
        );

        let initialSenderBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );
        let initialRecipientBalance = await instance[
          'balanceOf(address,uint256)'
        ](recipient.address, id);

        await instance[
          'safeTransferBatch(address,address,address,uint256[],uint256[],bytes)'
        ](
          instance.address,
          holder.address,
          recipient.address,
          [id],
          [amount],
          ethers.utils.randomBytes(0),
        );

        let finalSenderBalance = await instance['balanceOf(address,uint256)'](
          holder.address,
          id,
        );
        let finalRecipientBalance = await instance[
          'balanceOf(address,uint256)'
        ](recipient.address, id);

        expect(initialSenderBalance.sub(finalSenderBalance)).to.equal(amount);
        expect(finalRecipientBalance.sub(initialRecipientBalance)).to.equal(
          amount,
        );
      });

      it('emits TransferBatch event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance['mintBatch(address,uint256[],uint256[])'](
          holder.address,
          [id],
          [amount],
        );

        await expect(
          instance[
            'safeTransferBatch(address,address,address,uint256[],uint256[],bytes)'
          ](
            holder.address,
            holder.address,
            recipient.address,
            [id],
            [amount],
            ethers.utils.randomBytes(0),
          ),
        )
          .to.emit(instance, 'TransferBatch')
          .withArgs(
            holder.address,
            holder.address,
            recipient.address,
            [id],
            [amount],
          );
      });

      describe('reverts if', function () {
        it('transfer is made to the zero address', async function () {
          await expect(
            instance[
              'safeTransferBatch(address,address,address,uint256[],uint256[],bytes)'
            ](
              instance.address,
              holder.address,
              ethers.constants.AddressZero,
              [],
              [],
              ethers.utils.randomBytes(0),
            ),
          ).to.be.revertedWith('ERC1155: transfer to the zero address');
        });

        it('input array lengths do not match', async function () {
          await expect(
            instance[
              'safeTransferBatch(address,address,address,uint256[],uint256[],bytes)'
            ](
              instance.address,
              holder.address,
              recipient.address,
              [ethers.constants.Zero],
              [],
              ethers.utils.randomBytes(0),
            ),
          ).to.be.revertedWith('ERC1155: ids and amounts length mismatch');
        });

        it('transfer amount exceeds balance', async function () {
          await expect(
            instance[
              'safeTransferBatch(address,address,address,uint256[],uint256[],bytes)'
            ](
              instance.address,
              holder.address,
              recipient.address,
              [ethers.constants.Zero],
              [ethers.constants.One],
              ethers.utils.randomBytes(0),
            ),
          ).to.be.revertedWith('ERC1155: insufficient balances for transfer');
        });

        it('transfer is made to invalid receiver', async function () {
          await expect(
            instance[
              'safeTransferBatch(address,address,address,uint256[],uint256[],bytes)'
            ](
              instance.address,
              holder.address,
              invalidReceiver,
              [],
              [],
              ethers.utils.randomBytes(0),
            ),
          ).to.be.revertedWith(
            'ERC1155: transfer to non ERC1155Receiver implementer',
          );
        });
      });
    });

    describe('#_beforeTokenTransfer', function () {
      it('todo');
    });
  });
});
