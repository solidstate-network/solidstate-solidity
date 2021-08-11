import { expect } from 'chai';
import { ethers } from 'hardhat';
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
      instance['mint(address,uint256)'](recipient, tokenId),
    burn: (tokenId) => instance['burn(uint256)'](tokenId),
  });

  describe('__internal', function () {
    describe('#_mint', function () {
      it('increases balance of given account by given tokenId', async function () {
        let tokenId = ethers.constants.Two;

        await expect(() =>
          instance['mint(address,uint256)'](receiver.address, tokenId),
        ).to.changeTokenBalance(instance, receiver, tokenId);
      });

      it('TODO: creates a new token with given tokenId');

      it('emits Transfer event', async function () {
        let tokenId = ethers.constants.Two;

        await expect(
          instance['mint(address,uint256)'](receiver.address, tokenId),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(ethers.constants.AddressZero, receiver.address, tokenId);
      });

      describe('reverts if', function () {
        it('given account is zero address', async function () {
          await expect(
            instance['mint(address,uint256)'](
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC721: mint to the zero address');
        });

        it('TODO: given token already exists');
      });
    });

    describe('#_burn', function () {
      it('TODO: destroys given tokenId');

      it('TODO: removes given tokenId from balance of owner');

      it('emits Transfer event', async function () {
        let tokenId = ethers.constants.Two;
        await instance['mint(address,uint256)'](receiver.address, tokenId);

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
        let tokenId = ethers.constants.Two;
        await instance['mint(address,uint256)'](sender.address, tokenId);

        await expect(
          instance['transfer(address,address,uint256)'](
            sender.address,
            receiver.address,
            tokenId,
          ),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(sender.address, receiver.address, tokenId);
      });

      describe('reverts if', function () {
        it('sender is the zero address', async function () {
          await expect(
            instance['transfer(address,address,uint256)'](
              ethers.constants.AddressZero,
              receiver.address,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC721: transfer from the zero address');
        });

        it('receiver is the zero address', async function () {
          await expect(
            instance['transfer(address,address,uint256)'](
              sender.address,
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC721: transfer to the zero address');
        });
      });
    });

    describe('#_approve', function () {
      it(
        'TODO: sets approval of spender with respect to holder for given tokenId',
      );

      it('emits Approval event', async function () {
        let tokenId = ethers.constants.Two;

        await expect(
          instance['__approve(address,uint256)'](
            spender.address,
            tokenId,
          ),
        )
          .to.emit(instance, 'Approval')
          .withArgs(holder.address, spender.address, tokenId);
      });

      describe('reverts if', function () {
        it('spender is the zero address', async function () {
          await expect(
            instance['__approve(address,uint256)'](
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC721: approve to the zero address');
        });
      });
    });

    describe('#_beforeTokenTransfer', function () {
      it('todo');
    });
  });
});
