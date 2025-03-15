import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { IFungibleTokenBase } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ContractTransactionResponse } from 'ethers';
import { ethers } from 'hardhat';

export interface FungibleTokenBaseBehaviorArgs {
  supply: bigint;
  mint: (
    address: string,
    amount: bigint,
  ) => Promise<ContractTransactionResponse>;
  burn: (
    address: string,
    amount: bigint,
  ) => Promise<ContractTransactionResponse>;
}

export function describeBehaviorOfFungibleTokenBase(
  deploy: () => Promise<IFungibleTokenBase>,
  args: FungibleTokenBaseBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::FungibleTokenBase', () => {
    // note: holder gets supply (1e18) amount of tokens so use spender/receiver for easier testing
    let holder: SignerWithAddress;
    let spender: SignerWithAddress;
    let receiver: SignerWithAddress;
    let sender: SignerWithAddress;
    let instance: IFungibleTokenBase;

    before(async () => {
      [holder, spender, receiver, sender] = await ethers.getSigners();
    });

    beforeEach(async () => {
      instance = await deploy();
    });

    describe('#totalSupply()', () => {
      it('returns the total supply of tokens', async () => {
        expect(await instance.totalSupply.staticCall()).to.equal(args.supply);

        const amount = 2n;

        await args.mint(holder.address, amount);

        expect(await instance.totalSupply.staticCall()).to.equal(
          args.supply + amount,
        );

        await args.burn(holder.address, amount);

        expect(await instance.totalSupply.staticCall()).to.equal(args.supply);
      });
    });

    describe('#balanceOf(address)', () => {
      it('returns the token balance of given address', async () => {
        expect(
          await instance.balanceOf.staticCall(ethers.ZeroAddress),
        ).to.equal(0);

        const amount = 2n;

        await expect(() =>
          args.mint(holder.address, amount),
        ).to.changeTokenBalance(instance, holder, amount);

        await expect(() =>
          args.burn(holder.address, amount),
        ).to.changeTokenBalance(instance, holder, -amount);
      });
    });

    describe('#allowance(address,address)', () => {
      it('returns the allowance given holder has granted to given spender', async () => {
        expect(
          await instance.allowance.staticCall(holder.address, spender.address),
        ).to.equal(0);

        let amount = 2n;
        await instance.connect(holder).approve(spender.address, amount);

        expect(
          await instance.allowance.staticCall(holder.address, spender.address),
        ).to.equal(amount);
      });
    });

    describe('#approve(address,uint256)', () => {
      it('returns true', async () => {
        const amount = 2n;

        expect(
          await instance
            .connect(holder)
            .approve.staticCall(spender.address, amount),
        ).to.be.true;
      });

      it('enables given spender to spend tokens on behalf of sender', async () => {
        let amount = 2n;
        await instance.connect(holder).approve(spender.address, amount);

        expect(
          await instance.allowance.staticCall(holder.address, spender.address),
        ).to.equal(amount);

        // TODO: test case is no different from #allowance test; tested further by #transferFrom tests
      });

      it('emits Approval event', async () => {
        let amount = 2n;

        await expect(instance.connect(holder).approve(spender.address, amount))
          .to.emit(instance, 'Approval')
          .withArgs(holder.address, spender.address, amount);
      });
    });

    describe('#transfer(address,uint256)', () => {
      it('returns true', async () => {
        expect(
          await instance
            .connect(holder)
            .transfer.staticCall(receiver.address, 0),
        ).to.be.true;
      });

      it('transfers amount from holder to receiver', async () => {
        const amount = 2n;
        await args.mint(holder.address, amount);

        await expect(() =>
          instance.connect(holder).transfer(receiver.address, amount),
        ).to.changeTokenBalances(
          instance,
          [holder, receiver],
          [-amount, amount],
        );
      });

      describe('reverts if', () => {
        it('has insufficient balance', async () => {
          const amount = 2n;

          await expect(
            instance.connect(spender).transfer(holder.address, amount),
          ).to.be.revertedWithCustomError(
            instance,
            'FungibleTokenBase__TransferExceedsBalance',
          );
        });
      });
    });

    describe('#transferFrom(address,address,uint256)', () => {
      it('returns true', async () => {
        expect(
          await instance
            .connect(spender)
            .transferFrom.staticCall(holder.address, receiver.address, 0),
        ).to.be.true;
      });

      it('transfers amount on behalf of holder', async () => {
        const amount = 2n;
        await args.mint(holder.address, amount);

        await instance.connect(holder).approve(spender.address, amount);

        await expect(() =>
          instance
            .connect(spender)
            .transferFrom(holder.address, receiver.address, amount),
        ).to.changeTokenBalances(
          instance,
          [holder, receiver],
          [-amount, amount],
        );
      });

      describe('reverts if', () => {
        it('has insufficient balance', async () => {
          const amount = 2n;

          await expect(
            instance.connect(spender).transfer(holder.address, amount),
          ).to.be.revertedWithCustomError(
            instance,
            'FungibleTokenBase__TransferExceedsBalance',
          );
        });

        it('spender not approved', async () => {
          const amount = 2n;
          await args.mint(sender.address, amount);

          await expect(
            instance
              .connect(spender)
              .transferFrom(sender.address, receiver.address, amount),
          ).to.be.revertedWithCustomError(
            instance,
            'FungibleTokenBase__InsufficientAllowance',
          );
        });
      });
    });
  });
}
