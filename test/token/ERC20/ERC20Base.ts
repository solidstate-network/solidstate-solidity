import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfERC20Base } from '@solidstate/spec';
import {
  ERC20Base,
  ERC20BaseMock,
  ERC20BaseMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

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

  describeBehaviorOfERC20Base(async () => instance, {
    supply: ethers.constants.Zero,
    mint: (recipient, amount) => instance.__mint(recipient, amount),
    burn: (recipient, amount) => instance.__burn(recipient, amount),
  });

  describe('__internal', function () {
    describe('#_totalSupply()', function () {
      it('todo');
    });

    describe('#_balanceOf(address)', function () {
      it('todo');
    });

    describe('#_mint(address,uint256)', function () {
      it('increases balance of given account by given amount', async function () {
        let amount = ethers.constants.Two;

        await expect(() =>
          instance.__mint(receiver.address, amount),
        ).to.changeTokenBalance(instance, receiver, amount);
      });

      it('increases total supply by given amount', async function () {
        let amount = ethers.constants.Two;

        let initialSupply = await instance.callStatic['totalSupply()']();
        await instance.__mint(receiver.address, amount);
        let finalSupply = await instance.callStatic['totalSupply()']();

        expect(finalSupply.sub(initialSupply)).to.equal(amount);
      });

      it('emits Transfer event', async function () {
        let amount = ethers.constants.Two;

        await expect(instance.__mint(receiver.address, amount))
          .to.emit(instance, 'Transfer')
          .withArgs(ethers.constants.AddressZero, receiver.address, amount);
      });

      describe('reverts if', function () {
        it('given account is zero address', async function () {
          await expect(
            instance.__mint(
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC20Base__MintToZeroAddress',
          );
        });
      });
    });

    describe('#_burn(address,uint256)', function () {
      it('decreases balance of given account by given amount', async function () {
        let amount = ethers.constants.Two;
        await instance.__mint(receiver.address, amount);

        await expect(() =>
          instance.__burn(receiver.address, amount),
        ).to.changeTokenBalance(
          instance,
          receiver,
          amount.mul(ethers.constants.NegativeOne),
        );
      });

      it('decreases total supply by given amount', async function () {
        let amount = ethers.constants.Two;
        await instance.__mint(receiver.address, amount);

        let initialSupply = await instance.callStatic['totalSupply()']();
        await instance.__burn(receiver.address, amount);
        let finalSupply = await instance.callStatic['totalSupply()']();

        expect(initialSupply.sub(finalSupply)).to.equal(amount);
      });

      it('emits Transfer event', async function () {
        let amount = ethers.constants.Two;
        await instance.__mint(receiver.address, amount);

        await expect(instance.__burn(receiver.address, amount))
          .to.emit(instance, 'Transfer')
          .withArgs(receiver.address, ethers.constants.AddressZero, amount);
      });

      describe('reverts if', function () {
        it('given account is zero address', async function () {
          await expect(
            instance.__burn(
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC20Base__BurnFromZeroAddress',
          );
        });

        it('burn amount exceeds balance', async () => {
          await instance.__mint(receiver.address, 100);
          await expect(
            instance.__burn(receiver.address, 101),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC20Base__BurnExceedsBalance',
          );
        });
      });
    });

    describe('#_transfer(address,address,uint256)', function () {
      it('decreases balance of sender and increases balance of recipient by given amount', async function () {
        let amount = ethers.constants.Two;
        await instance.__mint(sender.address, amount);

        await expect(() =>
          instance.__transfer(sender.address, receiver.address, amount),
        ).to.changeTokenBalances(
          instance,
          [sender, receiver],
          [amount.mul(ethers.constants.NegativeOne), amount],
        );
      });

      it('does not modify total supply', async function () {
        let amount = ethers.constants.Two;
        await instance.__mint(sender.address, amount);

        let initialSupply = await instance.callStatic['totalSupply()']();
        await instance.__transfer(sender.address, receiver.address, amount);
        let finalSupply = await instance.callStatic['totalSupply()']();

        expect(finalSupply).to.equal(initialSupply);
      });

      it('emits Transfer event', async function () {
        let amount = ethers.constants.Two;
        await instance.__mint(sender.address, amount);

        await expect(
          instance.__transfer(sender.address, receiver.address, amount),
        )
          .to.emit(instance, 'Transfer')
          .withArgs(sender.address, receiver.address, amount);
      });

      describe('reverts if', function () {
        it('sender is the zero address', async function () {
          await expect(
            instance.__transfer(
              ethers.constants.AddressZero,
              receiver.address,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC20Base__TransferFromZeroAddress',
          );
        });

        it('receiver is the zero address', async function () {
          await expect(
            instance.__transfer(
              sender.address,
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC20Base__TransferToZeroAddress',
          );
        });
      });
    });

    describe('#_approve(address,address,uint256)', function () {
      it('sets approval of spender with respect to holder to given amount', async function () {
        let amount = ethers.constants.Two;

        await instance
          .connect(holder)
          .__approve(holder.address, spender.address, amount);
        await expect(
          await instance.callStatic['allowance(address,address)'](
            holder.address,
            spender.address,
          ),
        ).to.equal(amount);

        // approvals are not cumulative
        await instance
          .connect(holder)
          .__approve(holder.address, spender.address, amount);
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
          instance.__approve(holder.address, spender.address, amount),
        )
          .to.emit(instance, 'Approval')
          .withArgs(holder.address, spender.address, amount);
      });

      describe('reverts if', function () {
        it('holder is the zero address', async function () {
          await expect(
            instance.__approve(
              ethers.constants.AddressZero,
              spender.address,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC20Base__ApproveFromZeroAddress',
          );
        });

        it('spender is the zero address', async function () {
          await expect(
            instance.__approve(
              holder.address,
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC20Base__ApproveToZeroAddress',
          );
        });
      });
    });

    describe('#_decreaseAllowance(address,address,uint256)', function () {
      it('reduces approval of spender with respect to holder by given amount', async function () {
        await instance.__approve(
          holder.address,
          spender.address,
          ethers.constants.Two,
        );

        await instance
          .connect(holder)
          .__decreaseAllowance(
            holder.address,
            spender.address,
            ethers.constants.One,
          );

        await expect(
          await instance.callStatic['allowance(address,address)'](
            holder.address,
            spender.address,
          ),
        ).to.equal(ethers.constants.One);

        // decreases are cumulative
        await instance
          .connect(holder)
          .__decreaseAllowance(
            holder.address,
            spender.address,
            ethers.constants.One,
          );

        await expect(
          await instance.callStatic['allowance(address,address)'](
            holder.address,
            spender.address,
          ),
        ).to.equal(ethers.constants.Zero);
      });

      it('emits Approval event', async function () {
        await instance.__approve(
          holder.address,
          spender.address,
          ethers.constants.Two,
        );

        await expect(
          instance.__decreaseAllowance(
            holder.address,
            spender.address,
            ethers.constants.One,
          ),
        )
          .to.emit(instance, 'Approval')
          .withArgs(holder.address, spender.address, ethers.constants.One);
      });

      describe('reverts if', function () {
        it('holder is the zero address', async function () {
          await expect(
            instance.__decreaseAllowance(
              ethers.constants.AddressZero,
              spender.address,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC20Base__ApproveFromZeroAddress',
          );
        });

        it('spender is the zero address', async function () {
          await expect(
            instance.__decreaseAllowance(
              holder.address,
              ethers.constants.AddressZero,
              ethers.constants.Zero,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC20Base__ApproveToZeroAddress',
          );
        });
      });
    });

    describe('#_beforeTokenTransfer(address,address,uint256)', function () {
      it('todo');
    });
  });
});
