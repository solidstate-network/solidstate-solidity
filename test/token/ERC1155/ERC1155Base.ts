import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeBehaviorOfERC1155Base } from '@solidstate/spec';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ERC1155BaseMock, ERC1155BaseMock__factory } from '../../../typechain';

describe('ERC1155Base', function () {
  let holder: SignerWithAddress;
  let recipient: SignerWithAddress;
  let instance: ERC1155BaseMock;
  let invalidReceiver: string;

  before(async function () {
    [holder, recipient] = await ethers.getSigners();
  });

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC1155BaseMock__factory(deployer).deploy();
    invalidReceiver = instance.address;
  });

  describeBehaviorOfERC1155Base({
    deploy: async () => instance as any,
    mint: (recipient, tokenId, amount) =>
      instance.__mint(recipient, tokenId, amount),
    burn: (recipient, tokenId, amount) =>
      instance.__burn(recipient, tokenId, amount),
  });

  describe('__internal', function () {
    describe('#_mint', function () {
      it('increases balance of given token held by given account by given amount', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        let initialBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        await instance.__mint(
          holder.address,
          id,
          amount,
        );

        let finalBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        expect(finalBalance.sub(initialBalance)).to.equal(amount);
      });

      it('emits TransferSingle event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await expect(
          instance.__mint(holder.address, id, amount),
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
            instance.__mint(
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

        let initialBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        await instance.__safeMint(
          holder.address,
          id,
          amount,
        );

        let finalBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        expect(finalBalance.sub(initialBalance)).to.equal(amount);
      });

      it('emits TransferSingle event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await expect(
          instance.__safeMint(
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
            instance.__safeMint(
              ethers.constants.AddressZero,
              ethers.constants.Zero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC1155: mint to the zero address');
        });

        it('mint is made to invalid receiver', async function () {
          await expect(
            instance.__safeMint(
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

        let initialBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        await instance.__mintBatch(
          holder.address,
          [id],
          [amount],
        );

        let finalBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        expect(finalBalance.sub(initialBalance)).to.equal(amount);
      });

      it('emits TransferBatch event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await expect(
          instance.__mintBatch(
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
            instance.__mintBatch(
              ethers.constants.AddressZero,
              [],
              [],
            ),
          ).to.be.revertedWith('ERC1155: mint to the zero address');
        });

        it('input array lengths do not match', async function () {
          await expect(
            instance.__mintBatch(
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

        let initialBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        await instance.__safeMintBatch(
          holder.address,
          [id],
          [amount],
        );

        let finalBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        expect(finalBalance.sub(initialBalance)).to.equal(amount);
      });

      it('emits TransferBatch event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await expect(
          instance.__safeMintBatch(
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
            instance.__safeMintBatch(
              ethers.constants.AddressZero,
              [],
              [],
            ),
          ).to.be.revertedWith('ERC1155: mint to the zero address');
        });

        it('input array lengths do not match', async function () {
          await expect(
            instance.__safeMintBatch(
              holder.address,
              [ethers.constants.Zero],
              [],
            ),
          ).to.be.revertedWith('ERC1155: ids and amounts length mismatch');
        });

        it('mint is made to invalid receiver', async function () {
          await expect(
            instance.__safeMintBatch(
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

        await instance.__mint(
          holder.address,
          id,
          amount,
        );

        let initialBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        await instance.__burn(
          holder.address,
          id,
          amount,
        );

        let finalBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        expect(initialBalance.sub(finalBalance)).to.equal(amount);
      });

      it('emits TransferSingle event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance.__mint(
          holder.address,
          id,
          amount,
        );

        await expect(
          instance.__burn(holder.address, id, amount),
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
            instance.__burn(
              ethers.constants.AddressZero,
              ethers.constants.Zero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC1155: burn from the zero address');
        });

        it('burn amount exceeds balance', async function () {
          await expect(
            instance.__burn(
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

        await instance.__mint(
          holder.address,
          id,
          amount,
        );

        let initialBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        await instance.__burnBatch(
          holder.address,
          [id],
          [amount],
        );

        let finalBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        expect(initialBalance.sub(finalBalance)).to.equal(amount);
      });

      it('emits TransferBatch event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance.__mintBatch(
          holder.address,
          [id],
          [amount],
        );

        await expect(
          instance.__burnBatch(
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
            instance.__burnBatch(
              ethers.constants.AddressZero,
              [],
              [],
            ),
          ).to.be.revertedWith('ERC1155: burn from the zero address');
        });

        it('input array lengths do not match', async function () {
          await expect(
            instance.__burnBatch(
              holder.address,
              [ethers.constants.Zero],
              [],
            ),
          ).to.be.revertedWith('ERC1155: ids and amounts length mismatch');
        });

        it('burn amount exceeds balance', async function () {
          await expect(
            instance.__burnBatch(
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

        await instance.__mint(
          holder.address,
          id,
          amount,
        );

        let initialSenderBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        let initialRecipientBalance = await instance.callStatic.balanceOf(
          recipient.address,
          id
        );

        await instance.__transfer(
          instance.address,
          holder.address,
          recipient.address,
          id,
          amount,
          ethers.utils.randomBytes(0),
        );

        let finalSenderBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        let finalRecipientBalance = await instance.callStatic.balanceOf(
          recipient.address,
          id
        );

        expect(initialSenderBalance.sub(finalSenderBalance)).to.equal(amount);
        expect(finalRecipientBalance.sub(initialRecipientBalance)).to.equal(
          amount,
        );
      });

      it('emits TransferSingle event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance.__mintBatch(
          holder.address,
          [id],
          [amount],
        );

        await expect(
          instance.__transfer(
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
            instance.__transfer(
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
            instance.__transfer(
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

        await instance.__mint(
          holder.address,
          id,
          amount,
        );

        let initialSenderBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        let initialRecipientBalance = await instance.callStatic.balanceOf(
          recipient.address,
          id
        );

        await instance.__safeTransfer(
          instance.address,
          holder.address,
          recipient.address,
          id,
          amount,
          ethers.utils.randomBytes(0),
        );

        let finalSenderBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        let finalRecipientBalance = await instance.callStatic.balanceOf(
          recipient.address,
          id
        );

        expect(initialSenderBalance.sub(finalSenderBalance)).to.equal(amount);
        expect(finalRecipientBalance.sub(initialRecipientBalance)).to.equal(
          amount,
        );
      });

      it('emits TransferSingle event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance.__mintBatch(
          holder.address,
          [id],
          [amount],
        );

        await expect(
          instance.__safeTransfer(
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
            instance.__safeTransfer(
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
            instance.__safeTransfer(
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
            instance.__safeTransfer(
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

        await instance.__mint(
          holder.address,
          id,
          amount,
        );

        let initialSenderBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        let initialRecipientBalance = await instance.callStatic.balanceOf(
          recipient.address,
          id
        );

        await instance.__transferBatch(
          instance.address,
          holder.address,
          recipient.address,
          [id],
          [amount],
          ethers.utils.randomBytes(0),
        );

        let finalSenderBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        let finalRecipientBalance = await instance.callStatic.balanceOf(
          recipient.address,
          id
        );

        expect(initialSenderBalance.sub(finalSenderBalance)).to.equal(amount);
        expect(finalRecipientBalance.sub(initialRecipientBalance)).to.equal(
          amount,
        );
      });

      it('emits TransferBatch event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance.__mintBatch(
          holder.address,
          [id],
          [amount],
        );

        await expect(
          instance.__transferBatch(
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
            instance.__transferBatch(
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
            instance.__transferBatch(
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
            instance.__transferBatch(
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

        await instance.__mint(
          holder.address,
          id,
          amount,
        );

        let initialSenderBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        let initialRecipientBalance = await instance.callStatic.balanceOf(
          recipient.address,
          id
        );

        await instance.__safeTransferBatch(
          instance.address,
          holder.address,
          recipient.address,
          [id],
          [amount],
          ethers.utils.randomBytes(0),
        );

        let finalSenderBalance = await instance.callStatic.balanceOf(
          holder.address,
          id,
        );

        let finalRecipientBalance = await instance.callStatic.balanceOf(
          recipient.address,
          id
        );

        expect(initialSenderBalance.sub(finalSenderBalance)).to.equal(amount);
        expect(finalRecipientBalance.sub(initialRecipientBalance)).to.equal(
          amount,
        );
      });

      it('emits TransferBatch event', async function () {
        let id = ethers.constants.Zero;
        let amount = ethers.constants.Two;

        await instance.__mintBatch(
          holder.address,
          [id],
          [amount],
        );

        await expect(
          instance.__safeTransferBatch(
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
            instance.__safeTransferBatch(
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
            instance.__safeTransferBatch(
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
            instance.__safeTransferBatch(
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
            instance.__safeTransferBatch(
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
