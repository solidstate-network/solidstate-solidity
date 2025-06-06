import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfFungibleToken } from '@solidstate/spec';
import {
  $FungibleToken,
  $FungibleToken__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('FungibleToken', () => {
  let sender: SignerWithAddress;
  let receiver: SignerWithAddress;
  let holder: SignerWithAddress;
  let spender: SignerWithAddress;
  let instance: $FungibleToken;

  before(async () => {
    [sender, receiver, holder, spender] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $FungibleToken__factory(deployer).deploy();
  });

  describeBehaviorOfFungibleToken(async () => instance, {
    supply: 0n,
    mint: (recipient, amount) => instance.$_mint(recipient, amount),
    burn: (recipient, amount) => instance.$_burn(recipient, amount),
  });

  describe('#_totalSupply()', () => {
    it('todo');
  });

  describe('#_balanceOf(address)', () => {
    it('todo');
  });

  describe('#_mint(address,uint256)', () => {
    it('increases balance of given account by given amount', async () => {
      let amount = 2n;

      await expect(() =>
        instance.$_mint(receiver.address, amount),
      ).to.changeTokenBalance(instance, receiver, amount);
    });

    it('increases total supply by given amount', async () => {
      let amount = 2n;

      let initialSupply = await instance.totalSupply.staticCall();
      await instance.$_mint(receiver.address, amount);
      let finalSupply = await instance.totalSupply.staticCall();

      expect(finalSupply - initialSupply).to.equal(amount);
    });

    it('emits Transfer event', async () => {
      let amount = 2n;

      await expect(instance.$_mint(receiver.address, amount))
        .to.emit(instance, 'Transfer')
        .withArgs(ethers.ZeroAddress, receiver.address, amount);
    });

    describe('reverts if', () => {
      it('given account is zero address', async () => {
        await expect(
          instance.$_mint(ethers.ZeroAddress, 0),
        ).to.be.revertedWithCustomError(
          instance,
          'FungibleToken__MintToZeroAddress',
        );
      });
    });
  });

  describe('#_burn(address,uint256)', () => {
    it('decreases balance of given account by given amount', async () => {
      let amount = 2n;
      await instance.$_mint(receiver.address, amount);

      await expect(() =>
        instance.$_burn(receiver.address, amount),
      ).to.changeTokenBalance(instance, receiver, -amount);
    });

    it('decreases total supply by given amount', async () => {
      let amount = 2n;
      await instance.$_mint(receiver.address, amount);

      let initialSupply = await instance.totalSupply.staticCall();
      await instance.$_burn(receiver.address, amount);
      let finalSupply = await instance.totalSupply.staticCall();

      expect(initialSupply - finalSupply).to.equal(amount);
    });

    it('emits Transfer event', async () => {
      let amount = 2n;
      await instance.$_mint(receiver.address, amount);

      await expect(instance.$_burn(receiver.address, amount))
        .to.emit(instance, 'Transfer')
        .withArgs(receiver.address, ethers.ZeroAddress, amount);
    });

    describe('reverts if', () => {
      it('given account is zero address', async () => {
        await expect(
          instance.$_burn(ethers.ZeroAddress, 0),
        ).to.be.revertedWithCustomError(
          instance,
          'FungibleToken__BurnFromZeroAddress',
        );
      });

      it('burn amount exceeds balance', async () => {
        await instance.$_mint(receiver.address, 100);
        await expect(
          instance.$_burn(receiver.address, 101),
        ).to.be.revertedWithCustomError(
          instance,
          'FungibleToken__BurnExceedsBalance',
        );
      });
    });
  });

  describe('#_transfer(address,address,uint256)', () => {
    it('decreases balance of sender and increases balance of recipient by given amount', async () => {
      let amount = 2n;
      await instance.$_mint(sender.address, amount);

      await expect(() =>
        instance['$_transfer(address,address,uint256)'](
          sender.address,
          receiver.address,
          amount,
        ),
      ).to.changeTokenBalances(instance, [sender, receiver], [-amount, amount]);
    });

    it('does not modify total supply', async () => {
      let amount = 2n;
      await instance.$_mint(sender.address, amount);

      let initialSupply = await instance.totalSupply.staticCall();
      await instance['$_transfer(address,address,uint256)'](
        sender.address,
        receiver.address,
        amount,
      );
      let finalSupply = await instance.totalSupply.staticCall();

      expect(finalSupply).to.equal(initialSupply);
    });

    it('emits Transfer event', async () => {
      let amount = 2n;
      await instance.$_mint(sender.address, amount);

      await expect(
        instance['$_transfer(address,address,uint256)'](
          sender.address,
          receiver.address,
          amount,
        ),
      )
        .to.emit(instance, 'Transfer')
        .withArgs(sender.address, receiver.address, amount);
    });

    describe('reverts if', () => {
      it('sender is the zero address', async () => {
        await expect(
          instance['$_transfer(address,address,uint256)'](
            ethers.ZeroAddress,
            receiver.address,
            0,
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'FungibleToken__TransferFromZeroAddress',
        );
      });

      it('receiver is the zero address', async () => {
        await expect(
          instance['$_transfer(address,address,uint256)'](
            sender.address,
            ethers.ZeroAddress,
            0,
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'FungibleToken__TransferToZeroAddress',
        );
      });
    });
  });

  describe('#_approve(address,address,uint256)', () => {
    it('sets approval of spender with respect to holder to given amount', async () => {
      let amount = 2n;

      await instance
        .connect(holder)
        [
          '$_approve(address,address,uint256)'
        ](holder.address, spender.address, amount);
      await expect(
        await instance.allowance.staticCall(holder.address, spender.address),
      ).to.equal(amount);

      // approvals are not cumulative
      await instance
        .connect(holder)
        [
          '$_approve(address,address,uint256)'
        ](holder.address, spender.address, amount);
      await expect(
        await instance.allowance.staticCall(holder.address, spender.address),
      ).to.equal(amount);
    });

    it('emits Approval event', async () => {
      let amount = 2n;

      await expect(
        instance['$_approve(address,address,uint256)'](
          holder.address,
          spender.address,
          amount,
        ),
      )
        .to.emit(instance, 'Approval')
        .withArgs(holder.address, spender.address, amount);
    });

    describe('reverts if', () => {
      it('holder is the zero address', async () => {
        await expect(
          instance['$_approve(address,address,uint256)'](
            ethers.ZeroAddress,
            spender.address,
            0,
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'FungibleToken__ApproveFromZeroAddress',
        );
      });

      it('spender is the zero address', async () => {
        await expect(
          instance['$_approve(address,address,uint256)'](
            holder.address,
            ethers.ZeroAddress,
            0,
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'FungibleToken__ApproveToZeroAddress',
        );
      });
    });
  });

  describe('#_decreaseAllowance(address,address,uint256)', () => {
    it('reduces approval of spender with respect to holder by given amount', async () => {
      await instance['$_approve(address,address,uint256)'](
        holder.address,
        spender.address,
        2,
      );

      await instance
        .connect(holder)
        .$_decreaseAllowance(holder.address, spender.address, 1);

      await expect(
        await instance.allowance.staticCall(holder.address, spender.address),
      ).to.equal(1);

      // decreases are cumulative
      await instance
        .connect(holder)
        .$_decreaseAllowance(holder.address, spender.address, 1);

      await expect(
        await instance.allowance.staticCall(holder.address, spender.address),
      ).to.equal(0);
    });

    it('emits Approval event', async () => {
      await instance['$_approve(address,address,uint256)'](
        holder.address,
        spender.address,
        2,
      );

      await expect(
        instance.$_decreaseAllowance(holder.address, spender.address, 1),
      )
        .to.emit(instance, 'Approval')
        .withArgs(holder.address, spender.address, 1);
    });

    describe('reverts if', () => {
      it('holder is the zero address', async () => {
        await expect(
          instance.$_decreaseAllowance(ethers.ZeroAddress, spender.address, 0),
        ).to.be.revertedWithCustomError(
          instance,
          'FungibleToken__ApproveFromZeroAddress',
        );
      });

      it('spender is the zero address', async () => {
        await expect(
          instance.$_decreaseAllowance(holder.address, ethers.ZeroAddress, 0),
        ).to.be.revertedWithCustomError(
          instance,
          'FungibleToken__ApproveToZeroAddress',
        );
      });
    });
  });

  describe('#_beforeTokenTransfer(address,address,uint256)', () => {
    it('todo');
  });
});
