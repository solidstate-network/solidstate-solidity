import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { IFungibleTokenExtended } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ContractTransactionResponse } from 'ethers';
import { ethers } from 'hardhat';

export interface FungibleTokenExtendedBehaviorArgs {
  mint: (
    address: string,
    amount: bigint,
  ) => Promise<ContractTransactionResponse>;
  burn: (
    address: string,
    amount: bigint,
  ) => Promise<ContractTransactionResponse>;
  allowance: (holder: string, spender: string) => Promise<bigint>;
  supply: bigint;
}

export function describeBehaviorOfFungibleTokenExtended(
  deploy: () => Promise<IFungibleTokenExtended>,
  args: FungibleTokenExtendedBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::FungibleTokenExtended', () => {
    let deployer: SignerWithAddress;
    let holder: SignerWithAddress;
    let spender: SignerWithAddress;
    let instance: IFungibleTokenExtended;

    before(async () => {
      [deployer, holder, spender] = await ethers.getSigners();
    });

    beforeEach(async () => {
      instance = await deploy();
    });

    describe('#increaseAllowance(address,uint256)', () => {
      it('returns true', async () => {
        expect(
          await instance
            .connect(holder)
            .increaseAllowance.staticCall(await instance.getAddress(), 0),
        ).to.be.true;
      });

      it('increases approval of spender with respect to holder by given amount', async () => {
        let amount = 2n;

        await instance
          .connect(holder)
          .increaseAllowance(spender.address, amount);

        await expect(
          await args.allowance(holder.address, spender.address),
        ).to.equal(amount);

        await instance
          .connect(holder)
          .increaseAllowance(spender.address, amount);

        await expect(
          await args.allowance(holder.address, spender.address),
        ).to.equal(amount + amount);

        // TODO: test case is no different from #allowance test; tested further by #transferFrom tests
      });

      it('emits Approval event', async () => {
        let amount = 2n;

        await expect(
          instance.connect(holder).increaseAllowance(spender.address, amount),
        )
          .to.emit(instance, 'Approval')
          .withArgs(holder.address, spender.address, amount);
      });

      describe('reverts if', () => {
        it('approval amount overflows uint256', async () => {
          await instance
            .connect(holder)
            .increaseAllowance(spender.address, ethers.MaxUint256);

          await expect(
            instance.connect(holder).increaseAllowance(spender.address, 1),
          ).to.be.revertedWithCustomError(
            instance,
            'FungibleTokenExtended__ExcessiveAllowance',
          );
        });
      });
    });

    describe('#decreaseAllowance(address,uint256)', () => {
      it('returns true', async () => {
        expect(
          await instance
            .connect(holder)
            .decreaseAllowance.staticCall(await instance.getAddress(), 0),
        ).to.be.true;
      });

      it('decreases approval of spender with respect to holder by given amount', async () => {
        let amount = 2n;
        await instance
          .connect(holder)
          .increaseAllowance(spender.address, amount * 2n);

        await instance
          .connect(holder)
          .decreaseAllowance(spender.address, amount);

        await expect(
          await args.allowance(holder.address, spender.address),
        ).to.equal(amount);

        await instance
          .connect(holder)
          .decreaseAllowance(spender.address, amount);

        await expect(
          await args.allowance(holder.address, spender.address),
        ).to.equal(0);

        // TODO: test case is no different from #allowance test; tested further by #transferFrom tests
      });

      it('emits Approval event', async () => {
        let amount = 2n;
        await instance
          .connect(holder)
          .increaseAllowance(spender.address, amount);

        await expect(
          instance.connect(holder).decreaseAllowance(spender.address, amount),
        )
          .to.emit(instance, 'Approval')
          .withArgs(holder.address, spender.address, 0);
      });

      describe('reverts if', () => {
        it('approval amount underflows uint256', async () => {
          await expect(
            instance.connect(holder).decreaseAllowance(spender.address, 1),
          ).to.be.revertedWithCustomError(
            instance,
            'FungibleToken__InsufficientAllowance',
          );
        });
      });
    });
  });
}
