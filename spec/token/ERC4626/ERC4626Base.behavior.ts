import { describeBehaviorOfERC20Base } from '../ERC20';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { IERC20, IERC4626Base } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber, ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

export interface ERC4626BaseBehaviorArgs {
  deploy: () => Promise<IERC4626Base>;
  getAsset: () => Promise<IERC20>;
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  mintAsset: (
    address: string,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
  supply: BigNumber;
}

export function describeBehaviorOfERC4626Base(
  { deploy, getAsset, mint, burn, mintAsset, supply }: ERC4626BaseBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC4626Base', function () {
    let caller: SignerWithAddress;
    let depositor: SignerWithAddress;
    let recipient: SignerWithAddress;
    let assetInstance: IERC20;
    let instance: IERC4626Base;

    before(async () => {
      [caller, depositor, recipient] = await ethers.getSigners();
    });

    beforeEach(async function () {
      assetInstance = await getAsset();
      instance = await deploy();
    });

    describeBehaviorOfERC20Base(
      {
        deploy,
        supply,
        mint,
        burn,
      },
      skips,
    );

    describe('#asset()', () => {
      it('returns the address of the base asset', async () => {
        expect(await instance.callStatic.asset()).to.eq(assetInstance.address);
      });
    });

    describe('#convertToShares(uint256)', () => {
      it('returns input amount if share supply is zero', async () => {
        expect(
          await instance.callStatic.convertToShares(ethers.constants.Two),
        ).to.eq(ethers.constants.Two);
      });

      it('returns the correct amount of shares if totalSupply is non-zero', async () => {
        await mint(instance.address, BigNumber.from('10'));

        const supply = await instance.callStatic.totalSupply();
        const assets = await instance.callStatic.totalAssets();

        const assetAmount = BigNumber.from('3');

        // result is rounded down

        expect(await instance.callStatic.convertToShares(assetAmount)).to.eq(
          assetAmount.mul(supply).div(assets),
        );
      });
    });

    describe('#convertToAssets(uint256)', () => {
      it('returns input amount if share supply is zero', async () => {
        expect(
          await instance.callStatic.convertToAssets(ethers.constants.Two),
        ).to.eq(ethers.constants.Two);
      });

      it('returns the correct amount of assets if totalSupply is non-zero', async () => {
        await mint(instance.address, BigNumber.from('10'));

        const supply = await instance.callStatic.totalSupply();
        const assets = await instance.callStatic.totalAssets();

        const shareAmount = BigNumber.from('3');

        // result is rounded down

        expect(await instance.callStatic.convertToAssets(shareAmount)).to.eq(
          shareAmount.mul(assets).div(supply),
        );
      });
    });

    describe('#maxDeposit(address)', () => {
      it('returns maximum uint256', async () => {
        expect(await instance.callStatic.maxDeposit(depositor.address)).to.eq(
          ethers.constants.MaxUint256,
        );
      });
    });

    describe('#maxMint(address)', () => {
      it('returns maximum uint256', async () => {
        expect(await instance.callStatic.maxMint(depositor.address)).to.eq(
          ethers.constants.MaxUint256,
        );
      });
    });

    describe('#maxWithdraw(address)', () => {
      it('returns asset value of share balance of given account', async () => {
        await mint(depositor.address, ethers.constants.Two);
        const balance = await instance.callStatic.balanceOf(depositor.address);

        expect(await instance.callStatic.maxWithdraw(depositor.address)).to.eq(
          await instance.callStatic.convertToAssets(balance),
        );
      });
    });

    describe('#maxRedeem(address)', () => {
      it('returns share balance of given account', async () => {
        await mint(depositor.address, ethers.constants.Two);
        const balance = await instance.callStatic.balanceOf(depositor.address);

        expect(await instance.callStatic.maxRedeem(depositor.address)).to.eq(
          balance,
        );
      });
    });

    describe('#previewDeposit(uint256)', () => {
      it('returns the deposit input amount converted to shares', async () => {
        const assetAmount = ethers.utils.parseUnits('1', 18);

        // result is rounded down

        expect(await instance.callStatic.previewDeposit(assetAmount)).to.eq(
          await instance.callStatic.convertToShares(assetAmount),
        );
      });
    });

    describe('#previewMint(uint256)', () => {
      it('todo: supply is 0');

      it('returns the mint input amount converted to assets', async () => {
        await mint(instance.address, BigNumber.from('10'));

        const supply = await instance.callStatic.totalSupply();
        const assets = await instance.callStatic.totalAssets();

        const shareAmount = BigNumber.from('3');

        const err = shareAmount.mul(assets).mod(supply).isZero()
          ? ethers.constants.Zero
          : ethers.constants.One;

        // result is rounded up

        expect(await instance.callStatic.previewMint(shareAmount)).to.eq(
          (await instance.callStatic.convertToAssets(shareAmount)).add(err),
        );
      });
    });

    describe('#previewWithdraw(uint256)', () => {
      it('todo: supply is 0');

      it('returns the withdraw input amount coverted to shares', async () => {
        await mint(instance.address, BigNumber.from('10'));

        const supply = await instance.callStatic.totalSupply();
        const assets = await instance.callStatic.totalAssets();

        const assetAmount = BigNumber.from('3');

        const err = assetAmount.mul(supply).mod(assets).isZero()
          ? ethers.constants.Zero
          : ethers.constants.One;

        // result is rounded up

        expect(await instance.callStatic.previewWithdraw(assetAmount)).to.eq(
          (await instance.callStatic.convertToShares(assetAmount)).add(err),
        );
      });
    });

    describe('#previewRedeem(uint256)', () => {
      it('returns the redeem input amount converted to assets', async () => {
        const shareAmount = ethers.utils.parseUnits('1', 18);

        // result is rounded down

        expect(await instance.callStatic.previewRedeem(shareAmount)).to.eq(
          await instance.callStatic.convertToAssets(shareAmount),
        );
      });
    });

    describe('#deposit(uint256,address)', () => {
      it('transfers assets from caller', async () => {
        const assetAmount = ethers.constants.Two;

        await mint(caller.address, assetAmount);
        await mintAsset(depositor.address, assetAmount);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmount);

        await expect(() =>
          instance.connect(depositor).deposit(assetAmount, depositor.address),
        ).to.changeTokenBalances(
          assetInstance,
          [depositor, instance],
          [assetAmount.mul(ethers.constants.NegativeOne), assetAmount],
        );
      });

      it('mints shares for receiver', async () => {
        const assetAmount = ethers.constants.Two;

        await mint(caller.address, assetAmount);
        await mintAsset(depositor.address, assetAmount);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmount);

        const shareAmount = await instance.callStatic.previewDeposit(
          assetAmount,
        );

        await expect(() =>
          instance.connect(depositor).deposit(assetAmount, depositor.address),
        ).to.changeTokenBalance(instance, depositor, shareAmount);
      });

      it('emits Deposit event', async () => {
        const assetAmount = ethers.constants.Two;

        await mint(caller.address, assetAmount);
        await mintAsset(depositor.address, assetAmount);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmount);

        const shareAmount = await instance.callStatic.previewDeposit(
          assetAmount,
        );

        expect(
          await instance
            .connect(depositor)
            .deposit(assetAmount, depositor.address),
        )
          .to.emit(instance, 'Deposit')
          .withArgs(
            depositor.address,
            depositor.address,
            assetAmount,
            shareAmount,
          );
      });

      describe('reverts if', () => {
        it.skip('deposit amount is too large', async () => {
          await expect(
            instance.deposit(ethers.constants.MaxUint256, depositor.address),
          ).to.be.revertedWith('ERC4626: maximum amount exceeded');
        });
      });
    });

    describe('#mint(uint256,address)', () => {
      it('transfers assets from caller', async () => {
        const shareAmount = BigNumber.from('10');
        const assetAmount = await instance.callStatic.previewMint(shareAmount);

        await mintAsset(depositor.address, assetAmount);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmount);

        await expect(() =>
          instance.connect(depositor).mint(shareAmount, depositor.address),
        ).to.changeTokenBalances(
          assetInstance,
          [depositor, instance],
          [assetAmount.mul(ethers.constants.NegativeOne), assetAmount],
        );
      });

      it('mints shares for receiver', async () => {
        const shareAmount = BigNumber.from('10');
        const assetAmount = await instance.callStatic.previewMint(shareAmount);

        await mintAsset(depositor.address, assetAmount);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmount);

        await expect(() =>
          instance.connect(depositor).mint(shareAmount, depositor.address),
        ).to.changeTokenBalance(instance, depositor, shareAmount);
      });

      it('emits Deposit event', async () => {
        const shareAmount = BigNumber.from('10');
        const assetAmount = await instance.callStatic.previewMint(shareAmount);

        await mintAsset(depositor.address, assetAmount);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmount);

        expect(
          await instance
            .connect(depositor)
            .mint(shareAmount, depositor.address),
        )
          .to.emit(instance, 'Deposit')
          .withArgs(
            depositor.address,
            depositor.address,
            assetAmount,
            shareAmount,
          );
      });

      describe('reverts if', () => {
        it.skip('mint amount is too large', async () => {
          await expect(
            instance.mint(ethers.constants.MaxUint256, depositor.address),
          ).to.be.revertedWith('ERC4626: maximum amount exceeded');
        });
      });
    });

    describe('#withdraw(uint256,address,address)', () => {
      it('transfers assets to receiver', async () => {
        const assetAmountIn = BigNumber.from('10');

        await mintAsset(depositor.address, assetAmountIn);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmountIn);
        await instance
          .connect(depositor)
          .deposit(assetAmountIn, depositor.address);

        const assetAmountOut = await instance.callStatic.convertToAssets(
          await instance.callStatic.balanceOf(depositor.address),
        );

        const shareAmount = await instance.callStatic.previewWithdraw(
          assetAmountOut,
        );

        await expect(() =>
          instance
            .connect(depositor)
            .withdraw(assetAmountOut, recipient.address, depositor.address),
        ).to.changeTokenBalances(
          assetInstance,
          [recipient, instance],
          [assetAmountOut, assetAmountOut.mul(ethers.constants.NegativeOne)],
        );
      });

      it('burns shares held by depositor', async () => {
        const assetAmountIn = BigNumber.from('10');

        await mintAsset(depositor.address, assetAmountIn);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmountIn);
        await instance
          .connect(depositor)
          .deposit(assetAmountIn, depositor.address);

        const assetAmountOut = await instance.callStatic.convertToAssets(
          await instance.callStatic.balanceOf(depositor.address),
        );

        const shareAmount = await instance.callStatic.previewWithdraw(
          assetAmountOut,
        );

        await expect(() =>
          instance
            .connect(depositor)
            .withdraw(assetAmountOut, recipient.address, depositor.address),
        ).to.changeTokenBalance(
          instance,
          depositor,
          shareAmount.mul(ethers.constants.NegativeOne),
        );
      });

      it('emits Withdraw event', async () => {
        const assetAmountIn = BigNumber.from('10');

        await mintAsset(depositor.address, assetAmountIn);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmountIn);
        await instance
          .connect(depositor)
          .deposit(assetAmountIn, depositor.address);
        await instance
          .connect(depositor)
          .approve(caller.address, ethers.constants.MaxUint256);

        const assetAmountOut = await instance.callStatic.convertToAssets(
          await instance.callStatic.balanceOf(depositor.address),
        );

        const shareAmount = await instance.callStatic.previewWithdraw(
          assetAmountOut,
        );

        expect(
          await instance
            .connect(caller)
            .withdraw(assetAmountOut, recipient.address, depositor.address),
        )
          .to.emit(instance, 'Withdraw')
          .withArgs(
            caller.address,
            recipient.address,
            depositor.address,
            assetAmountOut,
            shareAmount,
          );
      });

      describe('reverts if', () => {
        it('withdraw amount is too large', async () => {
          const assetAmount = BigNumber.from('10');
          const shareAmount = await instance.callStatic.convertToShares(
            assetAmount,
          );

          await mint(depositor.address, shareAmount);

          const max = await instance.callStatic.maxWithdraw(depositor.address);

          await expect(
            instance.withdraw(
              max.add(ethers.constants.One),
              recipient.address,
              depositor.address,
            ),
          ).to.be.revertedWith('ERC4626: maximum amount exceeded');
        });

        it('share amount exceeds allowance', async () => {
          const assetAmountIn = BigNumber.from('10');

          await mintAsset(depositor.address, assetAmountIn);
          await assetInstance
            .connect(depositor)
            .approve(instance.address, assetAmountIn);
          await instance
            .connect(depositor)
            .deposit(assetAmountIn, depositor.address);

          const assetAmountOut = await instance.callStatic.convertToAssets(
            await instance.callStatic.balanceOf(depositor.address),
          );

          await expect(
            instance
              .connect(caller)
              .withdraw(assetAmountOut, recipient.address, depositor.address),
          ).to.be.revertedWith('ERC4626: share amount exceeds allowance');
        });
      });
    });

    describe('#redeem(uint256,address,address)', () => {
      it('transfers assets to receiver', async () => {
        const assetAmountIn = BigNumber.from('10');

        await mintAsset(depositor.address, assetAmountIn);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmountIn);
        await instance
          .connect(depositor)
          .deposit(assetAmountIn, depositor.address);

        const shareAmount = await instance.callStatic.balanceOf(
          depositor.address,
        );

        const assetAmountOut = await instance.callStatic.previewRedeem(
          shareAmount,
        );

        await expect(() =>
          instance
            .connect(depositor)
            .redeem(shareAmount, recipient.address, depositor.address),
        ).to.changeTokenBalances(
          assetInstance,
          [recipient, instance],
          [assetAmountOut, assetAmountOut.mul(ethers.constants.NegativeOne)],
        );
      });

      it('burns shares held by depositor', async () => {
        const assetAmountIn = BigNumber.from('10');

        await mintAsset(depositor.address, assetAmountIn);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmountIn);
        await instance
          .connect(depositor)
          .deposit(assetAmountIn, depositor.address);

        const shareAmount = await instance.callStatic.balanceOf(
          depositor.address,
        );

        await expect(() =>
          instance
            .connect(depositor)
            .redeem(shareAmount, recipient.address, depositor.address),
        ).to.changeTokenBalance(
          instance,
          depositor,
          shareAmount.mul(ethers.constants.NegativeOne),
        );
      });

      it('emits Withdraw event', async () => {
        const assetAmountIn = BigNumber.from('10');

        await mintAsset(depositor.address, assetAmountIn);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, assetAmountIn);
        await instance
          .connect(depositor)
          .deposit(assetAmountIn, depositor.address);
        await instance
          .connect(depositor)
          .approve(caller.address, ethers.constants.MaxUint256);

        const shareAmount = await instance.callStatic.balanceOf(
          depositor.address,
        );

        const assetAmountOut = await instance.callStatic.previewRedeem(
          shareAmount,
        );

        expect(
          await instance
            .connect(caller)
            .redeem(shareAmount, recipient.address, depositor.address),
        )
          .to.emit(instance, 'Withdraw')
          .withArgs(
            caller.address,
            recipient.address,
            depositor.address,
            assetAmountOut,
            shareAmount,
          );
      });

      describe('reverts if', () => {
        it('redeem amount is too large', async () => {
          const shareAmount = ethers.constants.Two;

          await mint(depositor.address, shareAmount);

          const max = await instance.callStatic.maxRedeem(depositor.address);

          await expect(
            instance.redeem(
              max.add(ethers.constants.One),
              recipient.address,
              depositor.address,
            ),
          ).to.be.revertedWith('ERC4626: maximum amount exceeded');
        });

        it('share amount exceeds allowance', async () => {
          const shareAmount = ethers.constants.Two;

          await mint(depositor.address, shareAmount);

          await expect(
            instance
              .connect(caller)
              .redeem(shareAmount, recipient.address, depositor.address),
          ).to.be.revertedWith('ERC4626: share amount exceeds allowance');
        });
      });
    });
  });
}
