import { expect } from 'chai';
import { ethers } from 'hardhat';
import { deployMockContract } from 'ethereum-waffle';
import { describeBehaviorOfERC721Base } from '@solidstate/spec';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ERC721Base,
  ERC721BaseMock,
  ERC721BaseMock__factory,
} from '../../../typechain';

describe('ERC721Base', function () {
  let sender: SignerWithAddress;
  let receiver: SignerWithAddress;
  let holder: SignerWithAddress;
  let spender: SignerWithAddress;
  let instance: ERC721BaseMock;

  before(async function () {
    [sender, receiver, holder, spender] = await ethers.getSigners();
  });

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC721BaseMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC721Base({
    deploy: async () => instance as unknown as ERC721Base,
    supply: ethers.constants.Zero,
    mint: (recipient, tokenId) =>
      instance.mint(recipient, tokenId),
    burn: (tokenId) => instance.burn(tokenId),
  });

  describe('__internal', function () {
    describe('#_isApprovedOrOwner', function () {
      it('returns true if given spender is approved for given token', async function () {
        const tokenId = ethers.constants.Two;
        await instance.mint(holder.address, tokenId);

        await instance.connect(holder).approve(spender.address, tokenId);

        expect(
          await instance.callStatic.isApprovedOrOwner(spender.address, tokenId)
        ).to.be.true;
      });

      it('returns true if given spender is approved for all tokens held by owner', async function () {
        const tokenId = ethers.constants.Two;
        await instance.mint(holder.address, tokenId);

        await instance.connect(holder).setApprovalForAll(spender.address, true);

        expect(
          await instance.callStatic.isApprovedOrOwner(spender.address, tokenId)
        ).to.be.true;
      });

      it('returns true if given spender is owner of given token', async function () {
        const tokenId = ethers.constants.Two;
        await instance.mint(holder.address, tokenId);

        expect(
          await instance.callStatic.isApprovedOrOwner(holder.address, tokenId)
        ).to.be.true;
      });

      it('returns false if given spender is neither owner of given token nor approved to spend it', async function () {
        const tokenId = ethers.constants.Two;
        await instance.mint(holder.address, tokenId);

        expect(
          await instance.callStatic.isApprovedOrOwner(spender.address, tokenId)
        ).to.be.false;
      });
    });

    describe('#_mint', function () {
      it('creates token with given id for given account', async function () {
        const tokenId = ethers.constants.Two;
        await expect(instance.callStatic.ownerOf(tokenId)).to.be.reverted;

        await instance.mint(holder.address, tokenId)
        expect(await instance.callStatic.ownerOf(tokenId)).to.equal(holder.address);
      });

      it('increases balance of given account by one', async function () {
        const tokenId = ethers.constants.Two;

        await expect(() =>
          instance.mint(receiver.address, tokenId),
        ).to.changeTokenBalance(instance, receiver, ethers.constants.One);
      });

      it('emits Transfer event', async function () {
        const tokenId = ethers.constants.Two;

        await expect(
          instance.mint(receiver.address, tokenId),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(ethers.constants.AddressZero, receiver.address, tokenId);
      });

      describe('reverts if', function () {
        it('given account is zero address', async function () {
          await expect(
            instance.mint(
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC721: mint to the zero address');
        });

        it('given token already exists', async function () {
          const tokenId = ethers.constants.Two;
          await instance.mint(instance.address, tokenId);

          await expect(
            instance.mint(instance.address, tokenId)
          ).to.be.revertedWith('ERC721: token already minted');
        });
      });
    });

    describe('#_safeMint', function () {
      describe('(address,uint256)', function () {
        it('creates token with given id for given account', async function () {
          const tokenId = ethers.constants.Two;
          await expect(instance.callStatic.ownerOf(tokenId)).to.be.reverted;

          await instance['safeMint(address,uint256)'](holder.address, tokenId)
          expect(await instance.callStatic.ownerOf(tokenId)).to.equal(holder.address);
        });

        it('increases balance of given account by one', async function () {
          const tokenId = ethers.constants.Two;

          await expect(() =>
            instance['safeMint(address,uint256)'](receiver.address, tokenId),
          ).to.changeTokenBalance(instance, receiver, ethers.constants.One);
        });

        it('emits Transfer event', async function () {
          const tokenId = ethers.constants.Two;

          await expect(
            instance['safeMint(address,uint256)'](receiver.address, tokenId),
          )
            .to.emit(instance, 'Transfer')
            .withArgs(ethers.constants.AddressZero, receiver.address, tokenId);
        });

        it('does not revert if given account is ERC721Receiver implementer', async function () {
          const receiverContract = await deployMockContract(sender, [
            'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
          ]);

          await receiverContract.mock.onERC721Received.returns('0x150b7a02');

          await expect(
            instance['safeMint(address,uint256)'](receiverContract.address, ethers.constants.Two)
          ).not.to.be.reverted;
        });

        describe('reverts if', function () {
          it('given account is zero address', async function () {
            await expect(
              instance['safeMint(address,uint256)'](
                ethers.constants.AddressZero,
                ethers.constants.Zero,
              ),
            ).to.be.revertedWith('ERC721: mint to the zero address');
          });

          it('given token already exists', async function () {
            const tokenId = ethers.constants.Two;
            await instance.mint(instance.address, tokenId);

            await expect(
              instance['safeMint(address,uint256)'](instance.address, tokenId)
            ).to.be.revertedWith('ERC721: token already minted');
          });

          it('recipient is not ERC721Receiver implementer', async function () {
            // TODO: test against contract other than self

            await expect(
              instance['safeMint(address,uint256)'](
                instance.address,
                ethers.constants.Two
              )
            ).to.be.revertedWith(
              'ERC721: transfer to non ERC721Receiver implementer'
            );
          });

          it('recipient is ERC721Receiver implementer but does not accept transfer', async function () {
            const receiverContract = await deployMockContract(sender, [
              'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
            ]);

            await receiverContract.mock.onERC721Received.returns(ethers.utils.randomBytes(4));

            await expect(
              instance['safeMint(address,uint256)'](
                receiverContract.address,
                ethers.constants.Two
              )
            ).to.be.revertedWith(
              'ERC721: transfer to non ERC721Receiver implementer'
            );
          });
        });
      });

      describe('(address,uint256,bytes)', function () {
        it('creates token with given id for given account', async function () {
          const tokenId = ethers.constants.Two;
          await expect(instance.callStatic.ownerOf(tokenId)).to.be.reverted;

          await instance['safeMint(address,uint256,bytes)'](holder.address, tokenId, '0x')
          expect(await instance.callStatic.ownerOf(tokenId)).to.equal(holder.address);
        });

        it('increases balance of given account by one', async function () {
          const tokenId = ethers.constants.Two;

          await expect(() =>
            instance['safeMint(address,uint256,bytes)'](receiver.address, tokenId, '0x'),
          ).to.changeTokenBalance(instance, receiver, ethers.constants.One);
        });

        it('emits Transfer event', async function () {
          const tokenId = ethers.constants.Two;

          await expect(
            instance['safeMint(address,uint256,bytes)'](receiver.address, tokenId, '0x'),
          )
            .to.emit(instance, 'Transfer')
            .withArgs(ethers.constants.AddressZero, receiver.address, tokenId);
        });

        it('does not revert if given account is ERC721Receiver implementer', async function () {
          const receiverContract = await deployMockContract(sender, [
            'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
          ]);

          await receiverContract.mock.onERC721Received.returns('0x150b7a02');

          await expect(
            instance['safeMint(address,uint256,bytes)'](receiverContract.address, ethers.constants.Two, '0x')
          ).not.to.be.reverted;
        });

        describe('reverts if', function () {
          it('given account is zero address', async function () {
            await expect(
              instance['safeMint(address,uint256,bytes)'](
                ethers.constants.AddressZero,
                ethers.constants.Zero,
                '0x'
              ),
            ).to.be.revertedWith('ERC721: mint to the zero address');
          });

          it('given token already exists', async function () {
            const tokenId = ethers.constants.Two;
            await instance.mint(instance.address, tokenId);

            await expect(
              instance['safeMint(address,uint256,bytes)'](instance.address, tokenId, '0x')
            ).to.be.revertedWith('ERC721: token already minted');
          });

          it('recipient is not ERC721Receiver implementer', async function () {
            // TODO: test against contract other than self

            await expect(
              instance['safeMint(address,uint256,bytes)'](
                instance.address,
                ethers.constants.Two,
                '0x'
              )
            ).to.be.revertedWith(
              'ERC721: transfer to non ERC721Receiver implementer'
            );
          });

          it('recipient is ERC721Receiver implementer but does not accept transfer', async function () {
            const receiverContract = await deployMockContract(sender, [
              'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
            ]);

            await receiverContract.mock.onERC721Received.returns(ethers.utils.randomBytes(4));

            await expect(
              instance['safeMint(address,uint256,bytes)'](
                receiverContract.address,
                ethers.constants.Two,
                '0x'
              )
            ).to.be.revertedWith(
              'ERC721: transfer to non ERC721Receiver implementer'
            );
          });
        });
      });
    });

    describe('#_burn', function () {
      it('destroys given token', async function () {
        const tokenId = ethers.constants.Two;

        await instance.mint(holder.address, tokenId)
        expect(await instance.callStatic.ownerOf(tokenId)).to.equal(holder.address);

        await instance.burn(tokenId);
        await expect(instance.callStatic.ownerOf(tokenId)).to.be.reverted;
      });

      it('decreases balance of owner by one', async function () {
        const tokenId = ethers.constants.Two;
        await instance.mint(receiver.address, tokenId),

        await expect(() =>
          instance.burn(tokenId)
        ).to.changeTokenBalance(instance, receiver, -ethers.constants.One);
      });

      it('emits Transfer event', async function () {
        const tokenId = ethers.constants.Two;
        await instance.mint(receiver.address, tokenId);

        await expect(
          instance['burn(uint256)'](tokenId),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(receiver.address, ethers.constants.AddressZero, tokenId);
      });
    });

    describe('#_transfer', function () {
      it('TODO: moves given tokenId from sender to receiver');

      it('emits Transfer event', async function () {
        const tokenId = ethers.constants.Two;
        await instance.mint(sender.address, tokenId);

        await expect(
          instance.connect(sender).transfer(
            sender.address,
            receiver.address,
            tokenId,
          ),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(sender.address, receiver.address, tokenId);
      });

      describe('reverts if', function () {
        it('receiver is the zero address', async function () {
          const tokenId = ethers.constants.Two;
          await instance.mint(sender.address, tokenId);

          await expect(
            instance.connect(sender).transfer(
              sender.address,
              ethers.constants.AddressZero,
              tokenId,
            ),
          ).to.be.revertedWith('ERC721: transfer to the zero address');
        });
      });
    });

    describe('#_safeTransfer', function () {
      it('todo');
    });

    describe('#_approve', function () {
      it('grants approval to spend given token on behalf of holder', async function () {
        const tokenId = ethers.constants.Two;
        await instance.mint(holder.address, tokenId);

        expect(await instance.callStatic.getApproved(tokenId)).to.equal(ethers.constants.AddressZero);

        await instance.__approve(spender.address, tokenId);

        expect(await instance.callStatic.getApproved(tokenId)).to.equal(spender.address);

        await expect(
          instance.connect(spender).callStatic.transferFrom(holder.address, spender.address, tokenId)
        ).not.to.be.reverted;

        await instance.connect(holder).approve(ethers.constants.AddressZero, tokenId);

        await expect(
          instance.connect(spender).callStatic.transferFrom(holder.address, spender.address, tokenId)
        ).to.be.reverted;
      })

      it('emits Approval event', async function () {
        const tokenId = ethers.constants.Two;
        await instance.mint(holder.address, tokenId);

        await expect(
          instance.connect(holder).__approve(
            spender.address,
            tokenId,
          ),
        )
          .to.emit(instance, 'Approval')
          .withArgs(holder.address, spender.address, tokenId);
      });
    });

    describe('#_checkOnERC721Received', function () {
      it('returns true if recipient is not a contract', async function () {
        expect(
          await instance.callStatic.checkOnERC721Received(
            ethers.constants.AddressZero,
            receiver.address,
            ethers.constants.Zero,
            '0x'
          )
        ).to.be.true;
      });

      it('returns true if recipient returns IERC721Receiver interface ID', async function () {
        const receiverContract = await deployMockContract(sender, [
          'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
        ]);

        await receiverContract.mock.onERC721Received.returns('0x150b7a02');

        expect(
          await instance.callStatic.checkOnERC721Received(
            ethers.constants.AddressZero,
            receiverContract.address,
            ethers.constants.Zero,
            '0x'
          )
        ).to.be.true;
      });

      it('returns false if recipient does not return ERC721Receiver interface id', async function () {
        const receiverContract = await deployMockContract(sender, [
          'function onERC721Received (address, address, uint256, bytes) returns (bytes4)',
        ]);

        await receiverContract.mock.onERC721Received.returns(ethers.utils.randomBytes(4));

        expect(
          await instance.callStatic.checkOnERC721Received(
            ethers.constants.AddressZero,
            receiverContract.address,
            ethers.constants.Zero,
            '0x'
          )
        ).to.be.false;
      });

      describe('reverts if', function () {
        it('recipient is not ERC721Receiver implementer', async function () {
          // TODO: test against contract other than self

          await expect(
            instance.callStatic.checkOnERC721Received(
              ethers.constants.AddressZero,
              instance.address,
              ethers.constants.Zero,
              '0x'
            )
          ).to.be.revertedWith(
            'ERC721: transfer to non ERC721Receiver implementer'
          );
        });
      });
    });

    describe('#_beforeTokenTransfer', function () {
      it('todo');
    });
  });
});
