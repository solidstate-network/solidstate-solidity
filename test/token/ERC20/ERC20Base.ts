import { expect } from 'chai';
import { ethers } from 'hardhat';
import { describeBehaviorOfERC20Base } from '@solidstate/spec/token/ERC20/ERC20Base.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ERC20Base,
  ERC20BaseMock,
  ERC20BaseMock__factory,
} from '@solidstate/typechain';

describe('ERC20Base', function () {
  let sender: SignerWithAddress;
  let receiver: SignerWithAddress;
  let holder: SignerWithAddress;
  let spender: SignerWithAddress;
  let instance: ERC20BaseMock;

  before(async function () {
    [sender, receiver, holder, spender] = await ethers.getSigners();
  });

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new ERC20BaseMock__factory(deployer).deploy();
  });

  describeBehaviorOfERC20Base(
    {
      deploy: async () => instance as unknown as ERC20Base,
      supply: ethers.constants.Zero,
      mint: (recipient, amount) =>
        instance['mint(address,uint256)'](recipient, amount),
      burn: (recipient, amount) =>
        instance['burn(address,uint256)'](recipient, amount),
    },
    [],
  );

  describe('__internal', function () {
    describe('#_mint', function () {
      it('increases balance of given account by given amount', async function () {
        let amount = ethers.constants.Two;

        await expect(() =>
          instance['mint(address,uint256)'](receiver.address, amount),
        ).to.changeTokenBalance(instance, receiver, amount);
      });

      it('increases total supply by given amount', async function () {
        let amount = ethers.constants.Two;

        let initialSupply = await instance.callStatic['totalSupply()']();
        await instance['mint(address,uint256)'](receiver.address, amount);
        let finalSupply = await instance.callStatic['totalSupply()']();

        expect(finalSupply.sub(initialSupply)).to.equal(amount);
      });

      it('emits Transfer event', async function () {
        let amount = ethers.constants.Two;

        await expect(
          instance['mint(address,uint256)'](receiver.address, amount),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(ethers.constants.AddressZero, receiver.address, amount);
      });

      describe('reverts if', function () {
        it('given account is zero address', async function () {
          await expect(
            instance['mint(address,uint256)'](
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC20: mint to the zero address');
        });
      });
    });

    describe('#_burn', function () {
      it('decreases balance of given account by given amount', async function () {
        let amount = ethers.constants.Two;
        await instance['mint(address,uint256)'](receiver.address, amount);

        await expect(() =>
          instance['burn(address,uint256)'](receiver.address, amount),
        ).to.changeTokenBalance(
          instance,
          receiver,
          amount.mul(ethers.constants.NegativeOne),
        );
      });

      it('decreases total supply by given amount', async function () {
        let amount = ethers.constants.Two;
        await instance['mint(address,uint256)'](receiver.address, amount);

        let initialSupply = await instance.callStatic['totalSupply()']();
        await instance['burn(address,uint256)'](receiver.address, amount);
        let finalSupply = await instance.callStatic['totalSupply()']();

        expect(initialSupply.sub(finalSupply)).to.equal(amount);
      });

      it('emits Transfer event', async function () {
        let amount = ethers.constants.Two;
        await instance['mint(address,uint256)'](receiver.address, amount);

        await expect(
          instance['burn(address,uint256)'](receiver.address, amount),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(receiver.address, ethers.constants.AddressZero, amount);
      });

      describe('reverts if', function () {
        it('given account is zero address', async function () {
          await expect(
            instance['burn(address,uint256)'](
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC20: burn from the zero address');
        });
      });
    });

    describe('#_transfer', function () {
      it('decreases balance of sender and increases balance of recipient by given amount', async function () {
        let amount = ethers.constants.Two;
        await instance['mint(address,uint256)'](sender.address, amount);

        await expect(() =>
          instance['transfer(address,address,uint256)'](
            sender.address,
            receiver.address,
            amount,
          ),
        ).to.changeTokenBalances(
          instance,
          [sender, receiver],
          [amount.mul(ethers.constants.NegativeOne), amount],
        );
      });

      it('does not modify total supply', async function () {
        let amount = ethers.constants.Two;
        await instance['mint(address,uint256)'](sender.address, amount);

        let initialSupply = await instance.callStatic['totalSupply()']();
        await instance['transfer(address,address,uint256)'](
          sender.address,
          receiver.address,
          amount,
        );
        let finalSupply = await instance.callStatic['totalSupply()']();

        expect(finalSupply).to.equal(initialSupply);
      });

      it('emits Transfer event', async function () {
        let amount = ethers.constants.Two;
        await instance['mint(address,uint256)'](sender.address, amount);

        await expect(
          instance['transfer(address,address,uint256)'](
            sender.address,
            receiver.address,
            amount,
          ),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(sender.address, receiver.address, amount);
      });

      describe('reverts if', function () {
        it('sender is the zero address', async function () {
          await expect(
            instance['transfer(address,address,uint256)'](
              ethers.constants.AddressZero,
              receiver.address,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC20: transfer from the zero address');
        });

        it('receiver is the zero address', async function () {
          await expect(
            instance['transfer(address,address,uint256)'](
              sender.address,
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC20: transfer to the zero address');
        });
      });
    });

    describe('#_approve', function () {
      it('sets approval of spender with respect to holder to given amount', async function () {
        let amount = ethers.constants.Two;

        await instance
          .connect(holder)
          ['approve(address,address,uint256)'](
            holder.address,
            spender.address,
            amount,
          );
        await expect(
          await instance.callStatic['allowance(address,address)'](
            holder.address,
            spender.address,
          ),
        ).to.equal(amount);

        // approvals are not cumulative
        await instance
          .connect(holder)
          ['approve(address,address,uint256)'](
            holder.address,
            spender.address,
            amount,
          );
        await expect(
          await instance.callStatic['allowance(address,address)'](
            holder.address,
            spender.address,
          ),
        ).to.equal(amount);
      });

      it('emits Approval event', async function () {
        let amount = ethers.constants.Two;

        await expect(
          instance['approve(address,address,uint256)'](
            holder.address,
            spender.address,
            amount,
          ),
        )
          .to.emit(instance, 'Approval')
          .withArgs(holder.address, spender.address, amount);
      });

      describe('reverts if', function () {
        it('holder is the zero address', async function () {
          await expect(
            instance['approve(address,address,uint256)'](
              ethers.constants.AddressZero,
              spender.address,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC20: approve from the zero address');
        });

        it('spender is the zero address', async function () {
          await expect(
            instance['approve(address,address,uint256)'](
              holder.address,
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWith('ERC20: approve to the zero address');
        });
      });
    });

    describe('#_beforeTokenTransfer', function () {
      it('todo');
    });
  });
});
