import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfMultiToken } from '@solidstate/spec';
import { $MultiToken, $MultiToken__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MultiToken', () => {
  let holder: SignerWithAddress;
  let recipient: SignerWithAddress;
  let instance: $MultiToken;
  let invalidReceiver: string;

  before(async () => {
    [holder, recipient] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $MultiToken__factory(deployer).deploy();
    invalidReceiver = await instance.getAddress();

    await instance.$_setSupportsInterface('0x01ffc9a7', true);
    await instance.$_setSupportsInterface('0xd9b67a26', true);
  });

  describeBehaviorOfMultiToken(async () => instance, {
    mint: (recipient, tokenId, amount) =>
      instance.$_mint(recipient, tokenId, amount, '0x'),
    burn: (recipient, tokenId, amount) =>
      instance.$_burn(recipient, tokenId, amount),
  });

  describe('#_balanceOf(address,uint256)', () => {
    it('todo');
  });

  describe('#_mint(address,uint256,uint256,bytes)', () => {
    it('increases balance of given token held by given account by given amount', async () => {
      let id = 0;
      let amount = 2;

      let initialBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      await instance.$_mint(holder.address, id, amount, '0x');

      let finalBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      expect(finalBalance - initialBalance).to.equal(amount);
    });

    it('emits TransferSingle event', async () => {
      let id = 0;
      let amount = 2;

      await expect(instance.$_mint(holder.address, id, amount, '0x'))
        .to.emit(instance, 'TransferSingle')
        .withArgs(
          holder.address,
          ethers.ZeroAddress,
          holder.address,
          id,
          amount,
        );
    });

    describe('reverts if', () => {
      it('mint is made to the zero address', async () => {
        await expect(
          instance.$_mint(ethers.ZeroAddress, 0, 0, '0x'),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__MintToZeroAddress',
        );
      });
    });
  });

  describe('#_safeMint(address,uint256,uint256,bytes)', () => {
    it('increases balance of given token held by given account by given amount', async () => {
      let id = 0;
      let amount = 2;

      let initialBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      await instance.$_safeMint(holder.address, id, amount, '0x');

      let finalBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      expect(finalBalance - initialBalance).to.equal(amount);
    });

    it('emits TransferSingle event', async () => {
      let id = 0;
      let amount = 2;

      await expect(instance.$_safeMint(holder.address, id, amount, '0x'))
        .to.emit(instance, 'TransferSingle')
        .withArgs(
          holder.address,
          ethers.ZeroAddress,
          holder.address,
          id,
          amount,
        );
    });

    describe('reverts if', () => {
      it('mint is made to the zero address', async () => {
        await expect(
          instance.$_safeMint(ethers.ZeroAddress, 0, 0, '0x'),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__MintToZeroAddress',
        );
      });

      it('mint is made to invalid receiver', async () => {
        await expect(
          instance.$_safeMint(invalidReceiver, 0, 0, '0x'),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__ERC1155ReceiverNotImplemented',
        );
      });
    });
  });

  describe('#_mintBatch(address,uint256[],uint256[],bytes)', () => {
    it('increases balances of given tokens held by given account by given amounts', async () => {
      let id = 0;
      let amount = 2;

      let initialBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      await instance.$_mintBatch(holder.address, [id], [amount], '0x');

      let finalBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      expect(finalBalance - initialBalance).to.equal(amount);
    });

    it('emits TransferBatch event', async () => {
      let id = 0;
      let amount = 2;

      await expect(instance.$_mintBatch(holder.address, [id], [amount], '0x'))
        .to.emit(instance, 'TransferBatch')
        .withArgs(
          holder.address,
          ethers.ZeroAddress,
          holder.address,
          [id],
          [amount],
        );
    });

    describe('reverts if', () => {
      it('mint is made to the zero address', async () => {
        await expect(
          instance.$_mintBatch(ethers.ZeroAddress, [], [], '0x'),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__MintToZeroAddress',
        );
      });

      it('input array lengths do not match', async () => {
        await expect(
          instance.$_mintBatch(holder.address, [0], [], '0x'),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__ArrayLengthMismatch',
        );
      });
    });
  });

  describe('#_safeMintBatch(address,uint256[],uint256[],bytes)', () => {
    it('increases balances of given tokens held by given account by given amounts', async () => {
      let id = 0;
      let amount = 2;

      let initialBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      await instance.$_safeMintBatch(holder.address, [id], [amount], '0x');

      let finalBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      expect(finalBalance - initialBalance).to.equal(amount);
    });

    it('emits TransferBatch event', async () => {
      let id = 0;
      let amount = 2;

      await expect(
        instance.$_safeMintBatch(holder.address, [id], [amount], '0x'),
      )
        .to.emit(instance, 'TransferBatch')
        .withArgs(
          holder.address,
          ethers.ZeroAddress,
          holder.address,
          [id],
          [amount],
        );
    });

    describe('reverts if', () => {
      it('mint is made to the zero address', async () => {
        await expect(
          instance.$_safeMintBatch(ethers.ZeroAddress, [], [], '0x'),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__MintToZeroAddress',
        );
      });

      it('input array lengths do not match', async () => {
        await expect(
          instance.$_safeMintBatch(holder.address, [0], [], '0x'),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__ArrayLengthMismatch',
        );
      });

      it('mint is made to invalid receiver', async () => {
        await expect(
          instance.$_safeMintBatch(await instance.getAddress(), [], [], '0x'),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__ERC1155ReceiverNotImplemented',
        );
      });
    });
  });

  describe('#_burn(address,uint256,uint256)', () => {
    it('decreases balance of given token held by given account by given amount', async () => {
      let id = 0;
      let amount = 2;

      await instance.$_mint(holder.address, id, amount, '0x');

      let initialBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      await instance.$_burn(holder.address, id, amount);

      let finalBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      expect(initialBalance - finalBalance).to.equal(amount);
    });

    it('emits TransferSingle event', async () => {
      let id = 0;
      let amount = 2;

      await instance.$_mint(holder.address, id, amount, '0x');

      await expect(instance.$_burn(holder.address, id, amount))
        .to.emit(instance, 'TransferSingle')
        .withArgs(
          holder.address,
          holder.address,
          ethers.ZeroAddress,
          id,
          amount,
        );
    });

    describe('reverts if', () => {
      it('burn is made from the zero address', async () => {
        await expect(
          instance.$_burn(ethers.ZeroAddress, 0, 0),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__BurnFromZeroAddress',
        );
      });

      it('burn amount exceeds balance', async () => {
        await expect(
          instance.$_burn(holder.address, 0, 1),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__BurnExceedsBalance',
        );
      });
    });
  });

  describe('#_burnBatch(address,uint256[],uint256[])', () => {
    it('decreases balances of given tokens held by given account by given amounts', async () => {
      let id = 0;
      let amount = 2;

      await instance.$_mint(holder.address, id, amount, '0x');

      let initialBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      await instance.$_burnBatch(holder.address, [id], [amount]);

      let finalBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      expect(initialBalance - finalBalance).to.equal(amount);
    });

    it('emits TransferBatch event', async () => {
      let id = 0;
      let amount = 2;

      await instance.$_mintBatch(holder.address, [id], [amount], '0x');

      await expect(instance.$_burnBatch(holder.address, [id], [amount]))
        .to.emit(instance, 'TransferBatch')
        .withArgs(
          holder.address,
          holder.address,
          ethers.ZeroAddress,
          [id],
          [amount],
        );
    });

    describe('reverts if', () => {
      it('burn is made from the zero address', async () => {
        await expect(
          instance.$_burnBatch(ethers.ZeroAddress, [], []),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__BurnFromZeroAddress',
        );
      });

      it('input array lengths do not match', async () => {
        await expect(
          instance.$_burnBatch(holder.address, [0], []),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__ArrayLengthMismatch',
        );
      });

      it('burn amount exceeds balance', async () => {
        await expect(
          instance.$_burnBatch(holder.address, [0], [1]),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__BurnExceedsBalance',
        );
      });
    });
  });

  describe('#_transfer(address,address,address,uint256,uint256,bytes)', () => {
    it('decreases balances of sender and increases balances of recipient by given amounts', async () => {
      let id = 0;
      let amount = 2;

      await instance.$_mint(holder.address, id, amount, '0x');

      let initialSenderBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      let initialRecipientBalance = await instance.balanceOf.staticCall(
        recipient.address,
        id,
      );

      await instance.$_transfer(
        await instance.getAddress(),
        holder.address,
        recipient.address,
        id,
        amount,
        ethers.randomBytes(0),
      );

      let finalSenderBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      let finalRecipientBalance = await instance.balanceOf.staticCall(
        recipient.address,
        id,
      );

      expect(initialSenderBalance - finalSenderBalance).to.equal(amount);
      expect(finalRecipientBalance - initialRecipientBalance).to.equal(amount);
    });

    it('emits TransferSingle event', async () => {
      let id = 0;
      let amount = 2;

      await instance.$_mintBatch(holder.address, [id], [amount], '0x');

      await expect(
        instance.$_transfer(
          holder.address,
          holder.address,
          recipient.address,
          id,
          amount,
          ethers.randomBytes(0),
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

    describe('reverts if', () => {
      it('transfer is made to the zero address', async () => {
        await expect(
          instance.$_transfer(
            await instance.getAddress(),
            holder.address,
            ethers.ZeroAddress,
            0,
            0,
            ethers.randomBytes(0),
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__TransferToZeroAddress',
        );
      });

      it('transfer amount exceeds balance', async () => {
        await expect(
          instance.$_transfer(
            await instance.getAddress(),
            holder.address,
            recipient.address,
            0,
            1,
            ethers.randomBytes(0),
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__TransferExceedsBalance',
        );
      });
    });
  });

  describe('#_safeTransfer(address,address,address,uint256,uint256,bytes)', () => {
    it('decreases balances of sender and increases balances of recipient by given amounts', async () => {
      let id = 0;
      let amount = 2;

      await instance.$_mint(holder.address, id, amount, '0x');

      let initialSenderBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      let initialRecipientBalance = await instance.balanceOf.staticCall(
        recipient.address,
        id,
      );

      await instance.$_safeTransfer(
        await instance.getAddress(),
        holder.address,
        recipient.address,
        id,
        amount,
        ethers.randomBytes(0),
      );

      let finalSenderBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      let finalRecipientBalance = await instance.balanceOf.staticCall(
        recipient.address,
        id,
      );

      expect(initialSenderBalance - finalSenderBalance).to.equal(amount);
      expect(finalRecipientBalance - initialRecipientBalance).to.equal(amount);
    });

    it('emits TransferSingle event', async () => {
      let id = 0;
      let amount = 2;

      await instance.$_mintBatch(holder.address, [id], [amount], '0x');

      await expect(
        instance.$_safeTransfer(
          holder.address,
          holder.address,
          recipient.address,
          id,
          amount,
          ethers.randomBytes(0),
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

    describe('reverts if', () => {
      it('transfer is made to the zero address', async () => {
        await expect(
          instance.$_safeTransfer(
            await instance.getAddress(),
            holder.address,
            ethers.ZeroAddress,
            0,
            0,
            ethers.randomBytes(0),
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__TransferToZeroAddress',
        );
      });

      it('transfer amount exceeds balance', async () => {
        await expect(
          instance.$_safeTransfer(
            await instance.getAddress(),
            holder.address,
            recipient.address,
            0,
            1,
            ethers.randomBytes(0),
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__TransferExceedsBalance',
        );
      });

      it('transfer is made to invalid receiver', async () => {
        await expect(
          instance.$_safeTransfer(
            await instance.getAddress(),
            holder.address,
            invalidReceiver,
            0,
            0,
            ethers.randomBytes(0),
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__ERC1155ReceiverNotImplemented',
        );
      });
    });
  });

  describe('#_transferBatch(address,address,address,uint256[],uint256[],bytes)', () => {
    it('decreases balances of sender and increases balances of recipient by given amounts', async () => {
      let id = 0;
      let amount = 2;

      await instance.$_mint(holder.address, id, amount, '0x');

      let initialSenderBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      let initialRecipientBalance = await instance.balanceOf.staticCall(
        recipient.address,
        id,
      );

      await instance.$_transferBatch(
        await instance.getAddress(),
        holder.address,
        recipient.address,
        [id],
        [amount],
        ethers.randomBytes(0),
      );

      let finalSenderBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      let finalRecipientBalance = await instance.balanceOf.staticCall(
        recipient.address,
        id,
      );

      expect(initialSenderBalance - finalSenderBalance).to.equal(amount);
      expect(finalRecipientBalance - initialRecipientBalance).to.equal(amount);
    });

    it('emits TransferBatch event', async () => {
      let id = 0;
      let amount = 2;

      await instance.$_mintBatch(holder.address, [id], [amount], '0x');

      await expect(
        instance.$_transferBatch(
          holder.address,
          holder.address,
          recipient.address,
          [id],
          [amount],
          ethers.randomBytes(0),
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

    describe('reverts if', () => {
      it('transfer is made to the zero address', async () => {
        await expect(
          instance.$_transferBatch(
            await instance.getAddress(),
            holder.address,
            ethers.ZeroAddress,
            [],
            [],
            ethers.randomBytes(0),
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__TransferToZeroAddress',
        );
      });

      it('input array lengths do not match', async () => {
        await expect(
          instance.$_transferBatch(
            await instance.getAddress(),
            holder.address,
            recipient.address,
            [0],
            [],
            ethers.randomBytes(0),
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__ArrayLengthMismatch',
        );
      });

      it('transfer amount exceeds balance', async () => {
        await expect(
          instance.$_transferBatch(
            await instance.getAddress(),
            holder.address,
            recipient.address,
            [0],
            [1],
            ethers.randomBytes(0),
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__TransferExceedsBalance',
        );
      });
    });
  });

  describe('#_safeTransferBatch(address,address,address,uint256[],uint256[],bytes)', () => {
    it('decreases balances of sender and increases balances of recipient by given amounts', async () => {
      let id = 0;
      let amount = 2;

      await instance.$_mint(holder.address, id, amount, '0x');

      let initialSenderBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      let initialRecipientBalance = await instance.balanceOf.staticCall(
        recipient.address,
        id,
      );

      await instance.$_safeTransferBatch(
        await instance.getAddress(),
        holder.address,
        recipient.address,
        [id],
        [amount],
        ethers.randomBytes(0),
      );

      let finalSenderBalance = await instance.balanceOf.staticCall(
        holder.address,
        id,
      );

      let finalRecipientBalance = await instance.balanceOf.staticCall(
        recipient.address,
        id,
      );

      expect(initialSenderBalance - finalSenderBalance).to.equal(amount);
      expect(finalRecipientBalance - initialRecipientBalance).to.equal(amount);
    });

    it('emits TransferBatch event', async () => {
      let id = 0;
      let amount = 2;

      await instance.$_mintBatch(holder.address, [id], [amount], '0x');

      await expect(
        instance.$_safeTransferBatch(
          holder.address,
          holder.address,
          recipient.address,
          [id],
          [amount],
          ethers.randomBytes(0),
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

    describe('reverts if', () => {
      it('transfer is made to the zero address', async () => {
        await expect(
          instance.$_safeTransferBatch(
            await instance.getAddress(),
            holder.address,
            ethers.ZeroAddress,
            [],
            [],
            ethers.randomBytes(0),
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__TransferToZeroAddress',
        );
      });

      it('input array lengths do not match', async () => {
        await expect(
          instance.$_safeTransferBatch(
            await instance.getAddress(),
            holder.address,
            recipient.address,
            [0],
            [],
            ethers.randomBytes(0),
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__ArrayLengthMismatch',
        );
      });

      it('transfer amount exceeds balance', async () => {
        await expect(
          instance.$_safeTransferBatch(
            await instance.getAddress(),
            holder.address,
            recipient.address,
            [0],
            [1],
            ethers.randomBytes(0),
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__TransferExceedsBalance',
        );
      });

      it('transfer is made to invalid receiver', async () => {
        await expect(
          instance.$_safeTransferBatch(
            await instance.getAddress(),
            holder.address,
            invalidReceiver,
            [],
            [],
            ethers.randomBytes(0),
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'MultiToken__ERC1155ReceiverNotImplemented',
        );
      });
    });
  });

  describe('#_beforeTokenTransfer(address,address,address,uint256[],uint256[],bytes)', () => {
    it('todo');
  });
});
