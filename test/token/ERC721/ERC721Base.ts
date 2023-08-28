import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfERC721Base } from '@solidstate/spec';
import {
  ERC721Base,
  ERC721BaseMock,
  ERC721BaseMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC721Base', () => {
  let sender: SignerWithAddress;
  let receiver: SignerWithAddress;
  let holder: SignerWithAddress;
  let spender: SignerWithAddress;
  let instance: ERC721BaseMock;

  before(async () => {
    [sender, receiver, holder, spender] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC721BaseMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC721Base(async () => instance, {
    supply: 0n,
    mint: (recipient, tokenId) => instance.mint(recipient, tokenId),
    burn: (tokenId) => instance.burn(tokenId),
  });

  describe('__internal', () => {
    describe('#_balanceOf(address)', () => {
      it('todo');
    });

    describe('#_ownerOf(uint256)', () => {
      it('todo');
    });

    describe('#_getApproved(uint256)', () => {
      it('todo');
    });

    describe('#_isApprovedForAll(address,address)', () => {
      it('todo');
    });

    describe('#_isApprovedOrOwner(address,uint256)', () => {
      it('returns true if given spender is approved for given token', async () => {
        const tokenId = 2;
        await instance.mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        expect(
          await instance.isApprovedOrOwner.staticCall(spender.address, tokenId),
        ).to.be.true;
      });

      it('returns true if given spender is approved for all tokens held by owner', async () => {
        const tokenId = 2;
        await instance.mint(holder.address, tokenId);

        await instance.connect(holder).setApprovalForAll(spender.address, true);

        expect(
          await instance.isApprovedOrOwner.staticCall(spender.address, tokenId),
        ).to.be.true;
      });

      it('returns true if given spender is owner of given token', async () => {
        const tokenId = 2;
        await instance.mint(holder.address, tokenId);

        expect(
          await instance.isApprovedOrOwner.staticCall(holder.address, tokenId),
        ).to.be.true;
      });

      it('returns false if given spender is neither owner of given token nor approved to spend it', async () => {
        const tokenId = 2;
        await instance.mint(holder.address, tokenId);

        expect(
          await instance.isApprovedOrOwner.staticCall(spender.address, tokenId),
        ).to.be.false;
      });

      describe('reverts if', () => {
        it('token does not exist', async () => {
          const tokenId = 2;

          await expect(
            instance.isApprovedOrOwner.staticCall(ethers.ZeroAddress, tokenId),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__NonExistentToken',
          );
        });
      });
    });

    describe('#_mint(address,uint256)', () => {
      it('creates token with given id for given account', async () => {
        const tokenId = 2;
        await expect(instance.ownerOf.staticCall(tokenId)).to.be.reverted;

        await instance.mint(holder.address, tokenId);
        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          holder.address,
        );
      });

      it('increases balance of given account by one', async () => {
        const tokenId = 2;

        await expect(() =>
          instance.mint(receiver.address, tokenId),
        ).to.changeTokenBalance(instance, receiver, 1);
      });

      it('emits Transfer event', async () => {
        const tokenId = 2;

        await expect(instance.mint(receiver.address, tokenId))
          .to.emit(instance, 'Transfer')
          .withArgs(ethers.ZeroAddress, receiver.address, tokenId);
      });

      describe('reverts if', () => {
        it('given account is zero address', async () => {
          await expect(
            instance.mint(ethers.ZeroAddress, 0),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__MintToZeroAddress',
          );
        });

        it('given token already exists', async () => {
          const tokenId = 2;
          await instance.mint(await instance.getAddress(), tokenId);

          await expect(
            instance.mint(await instance.getAddress(), tokenId),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__TokenAlreadyMinted',
          );
        });
      });
    });

    describe('#_safeMint(address,uint256)', () => {
      it('creates token with given id for given account', async () => {
        const tokenId = 2;
        await expect(instance.ownerOf.staticCall(tokenId)).to.be.reverted;

        await instance['safeMint(address,uint256)'](holder.address, tokenId);
        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          holder.address,
        );
      });

      it('increases balance of given account by one', async () => {
        const tokenId = 2;

        await expect(() =>
          instance['safeMint(address,uint256)'](receiver.address, tokenId),
        ).to.changeTokenBalance(instance, receiver, 1);
      });

      it('emits Transfer event', async () => {
        const tokenId = 2;

        await expect(
          instance['safeMint(address,uint256)'](receiver.address, tokenId),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(ethers.ZeroAddress, receiver.address, tokenId);
      });

      it('does not revert if given account is ERC721Receiver implementer', async () => {
        const receiverContract = await deployMockContract(sender, [
          'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
        ]);

        await receiverContract.mock.onERC721Received.returns('0x150b7a02');

        await expect(
          instance['safeMint(address,uint256)'](receiverContract.address, 2),
        ).not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('given account is zero address', async () => {
          await expect(
            instance['safeMint(address,uint256)'](ethers.ZeroAddress, 0),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__MintToZeroAddress',
          );
        });

        it('given token already exists', async () => {
          const tokenId = 2;
          await instance.mint(await instance.getAddress(), tokenId);

          await expect(
            instance['safeMint(address,uint256)'](
              await instance.getAddress(),
              tokenId,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__TokenAlreadyMinted',
          );
        });

        it('recipient is not ERC721Receiver implementer', async () => {
          // TODO: test against contract other than self

          await expect(
            instance['safeMint(address,uint256)'](
              await instance.getAddress(),
              2,
            ),
          ).to.be.revertedWith(
            'ERC721: transfer to non ERC721Receiver implementer',
          );
        });

        it('recipient is ERC721Receiver implementer but does not accept transfer', async () => {
          const receiverContract = await deployMockContract(sender, [
            'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
          ]);

          await receiverContract.mock.onERC721Received.returns(
            ethers.randomBytes(4),
          );

          await expect(
            instance['safeMint(address,uint256)'](receiverContract.address, 2),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__ERC721ReceiverNotImplemented',
          );
        });
      });
    });

    describe('#_safeMint(address,uint256,bytes)', () => {
      it('creates token with given id for given account', async () => {
        const tokenId = 2;
        await expect(instance.ownerOf.staticCall(tokenId)).to.be.reverted;

        await instance['safeMint(address,uint256,bytes)'](
          holder.address,
          tokenId,
          '0x',
        );
        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          holder.address,
        );
      });

      it('increases balance of given account by one', async () => {
        const tokenId = 2;

        await expect(() =>
          instance['safeMint(address,uint256,bytes)'](
            receiver.address,
            tokenId,
            '0x',
          ),
        ).to.changeTokenBalance(instance, receiver, 1);
      });

      it('emits Transfer event', async () => {
        const tokenId = 2;

        await expect(
          instance['safeMint(address,uint256,bytes)'](
            receiver.address,
            tokenId,
            '0x',
          ),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(ethers.ZeroAddress, receiver.address, tokenId);
      });

      it('does not revert if given account is ERC721Receiver implementer', async () => {
        const receiverContract = await deployMockContract(sender, [
          'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
        ]);

        await receiverContract.mock.onERC721Received.returns('0x150b7a02');

        await expect(
          instance['safeMint(address,uint256,bytes)'](
            receiverContract.address,
            2,
            '0x',
          ),
        ).not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('given account is zero address', async () => {
          await expect(
            instance['safeMint(address,uint256,bytes)'](
              ethers.ZeroAddress,
              0,
              '0x',
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__MintToZeroAddress',
          );
        });

        it('given token already exists', async () => {
          const tokenId = 2;
          await instance.mint(await instance.getAddress(), tokenId);

          await expect(
            instance['safeMint(address,uint256,bytes)'](
              await instance.getAddress(),
              tokenId,
              '0x',
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__TokenAlreadyMinted',
          );
        });

        it('recipient is not ERC721Receiver implementer', async () => {
          // TODO: test against contract other than self

          await expect(
            instance['safeMint(address,uint256,bytes)'](
              await instance.getAddress(),
              2,
              '0x',
            ),
          ).to.be.revertedWith(
            'ERC721: transfer to non ERC721Receiver implementer',
          );
        });

        it('recipient is ERC721Receiver implementer but does not accept transfer', async () => {
          const receiverContract = await deployMockContract(sender, [
            'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
          ]);

          await receiverContract.mock.onERC721Received.returns(
            ethers.randomBytes(4),
          );

          await expect(
            instance['safeMint(address,uint256,bytes)'](
              receiverContract.address,
              2,
              '0x',
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__ERC721ReceiverNotImplemented',
          );
        });
      });
    });

    describe('#_burn(uint256)', () => {
      it('destroys given token', async () => {
        const tokenId = 2;

        await instance.mint(holder.address, tokenId);
        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          holder.address,
        );

        await instance.burn(tokenId);
        await expect(instance.ownerOf.staticCall(tokenId)).to.be.reverted;
      });

      it('decreases balance of owner by one', async () => {
        const tokenId = 2;
        await instance.mint(receiver.address, tokenId),
          await expect(() => instance.burn(tokenId)).to.changeTokenBalance(
            instance,
            receiver,
            -1,
          );
      });

      it('emits Transfer event', async () => {
        const tokenId = 2;
        await instance.mint(receiver.address, tokenId);

        await expect(instance.burn(tokenId))
          .to.emit(instance, 'Transfer')
          .withArgs(receiver.address, ethers.ZeroAddress, tokenId);
      });
    });

    describe('#_transfer(address,address,uint256)', () => {
      it('decreases balance of sender and increases balance of recipient by one', async () => {
        const tokenId = 2;
        await instance.mint(sender.address, tokenId);

        await expect(() =>
          instance.transfer(sender.address, receiver.address, tokenId),
        ).to.changeTokenBalances(instance, [sender, receiver], [-1, 1]);
      });

      it('updates owner of token', async () => {
        const tokenId = 2;
        await instance.mint(sender.address, tokenId);

        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          sender.address,
        );

        await instance.transfer(sender.address, receiver.address, tokenId);

        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          receiver.address,
        );
      });

      it('emits Transfer event', async () => {
        const tokenId = 2;
        await instance.mint(sender.address, tokenId);

        await expect(
          instance
            .connect(sender)
            .transfer(sender.address, receiver.address, tokenId),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(sender.address, receiver.address, tokenId);
      });

      describe('reverts if', () => {
        it('sender is not token owner', async () => {
          const tokenId = 2;
          await instance.mint(sender.address, tokenId);

          await expect(
            instance
              .connect(sender)
              .transfer(ethers.ZeroAddress, sender.address, tokenId),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__NotTokenOwner',
          );
        });

        it('receiver is the zero address', async () => {
          const tokenId = 2;
          await instance.mint(sender.address, tokenId);

          await expect(
            instance
              .connect(sender)
              .transfer(sender.address, ethers.ZeroAddress, tokenId),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__TransferToZeroAddress',
          );
        });
      });
    });

    describe('#_safeTransfer(address,address,uint256,bytes)', () => {
      it('decreases balance of sender and increases balance of recipient by one', async () => {
        const tokenId = 2;
        await instance.mint(sender.address, tokenId);

        await expect(() =>
          instance.safeTransfer(
            sender.address,
            receiver.address,
            tokenId,
            '0x',
          ),
        ).to.changeTokenBalances(instance, [sender, receiver], [-1, 1]);
      });

      it('updates owner of token', async () => {
        const tokenId = 2;
        await instance.mint(sender.address, tokenId);

        await instance.safeTransfer(
          sender.address,
          receiver.address,
          tokenId,
          '0x',
        );

        expect(await instance.ownerOf.staticCall(tokenId)).to.equal(
          receiver.address,
        );
      });

      it('emits Transfer event', async () => {
        const tokenId = 2;
        await instance.mint(sender.address, tokenId);

        await expect(
          instance
            .connect(sender)
            .safeTransfer(sender.address, receiver.address, tokenId, '0x'),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(sender.address, receiver.address, tokenId);
      });

      describe('reverts if', () => {
        it('sender is not token owner', async () => {
          const tokenId = 2;
          await instance.mint(sender.address, tokenId);

          await expect(
            instance
              .connect(sender)
              .safeTransfer(ethers.ZeroAddress, sender.address, tokenId, '0x'),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__NotTokenOwner',
          );
        });

        it('receiver is the zero address', async () => {
          const tokenId = 2;
          await instance.mint(sender.address, tokenId);

          await expect(
            instance
              .connect(sender)
              .safeTransfer(sender.address, ethers.ZeroAddress, tokenId, '0x'),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC721Base__TransferToZeroAddress',
          );
        });

        it('recipient is not ERC721Receiver implementer', async () => {
          const tokenId = 2;
          await instance.mint(sender.address, tokenId);

          // TODO: test against contract other than self

          await expect(
            instance.safeTransfer(
              sender.address,
              await instance.getAddress(),
              tokenId,
              '0x',
            ),
          ).to.be.revertedWith(
            'ERC721: transfer to non ERC721Receiver implementer',
          );
        });

        it('recipient is ERC721Receiver implementer but does not accept transfer', async () => {
          const tokenId = 2;
          await instance.mint(sender.address, tokenId);

          const receiverContract = await deployMockContract(sender, [
            'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
          ]);

          await receiverContract.mock.onERC721Received.returns(
            ethers.randomBytes(4),
          );

          await expect(
            instance.safeTransfer(
              sender.address,
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

    describe('#_checkOnERC721Received(address,address,uint256,bytes)', () => {
      it('returns true if recipient is not a contract', async () => {
        expect(
          await instance.checkOnERC721Received.staticCall(
            ethers.ZeroAddress,
            receiver.address,
            0,
            '0x',
          ),
        ).to.be.true;
      });

      it('returns true if recipient returns IERC721Receiver interface ID', async () => {
        const receiverContract = await deployMockContract(sender, [
          'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
        ]);

        await receiverContract.mock.onERC721Received.returns('0x150b7a02');

        expect(
          await instance.checkOnERC721Received.staticCall(
            ethers.ZeroAddress,
            receiverContract.address,
            0,
            '0x',
          ),
        ).to.be.true;
      });

      it('returns false if recipient does not return ERC721Receiver interface id', async () => {
        const receiverContract = await deployMockContract(sender, [
          'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
        ]);

        await receiverContract.mock.onERC721Received.returns(
          ethers.randomBytes(4),
        );

        expect(
          await instance.checkOnERC721Received.staticCall(
            ethers.ZeroAddress,
            receiverContract.address,
            0,
            '0x',
          ),
        ).to.be.false;
      });

      describe('reverts if', () => {
        it('recipient is not ERC721Receiver implementer', async () => {
          // TODO: test against contract other than self

          await expect(
            instance.checkOnERC721Received.staticCall(
              ethers.ZeroAddress,
              await instance.getAddress(),
              0,
              '0x',
            ),
          ).to.be.revertedWith(
            'ERC721: transfer to non ERC721Receiver implementer',
          );
        });
      });
    });

    describe('#_beforeTokenTransfer(address,address,uint256)', () => {
      it('todo');
    });
  });
});
