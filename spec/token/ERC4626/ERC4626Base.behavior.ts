import { IERC20, ERC4626Base } from '../../../typechain';
import { describeBehaviorOfERC20Base } from '../ERC20';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { expect } from 'chai';
import { BigNumber, ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

interface ERC4626BaseBehaviorArgs {
  deploy: () => Promise<ERC4626Base>;
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
    let assetInstance: IERC20;
    let instance: ERC4626Base;

    before(async () => {
      [caller, depositor] = await ethers.getSigners();
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
        await mint(instance.address, BigNumber.from('5'));

        const supply = await instance.callStatic.totalSupply();
        const assets = await instance.callStatic.totalAssets();

        const assetAmount = ethers.utils.parseUnits('1', 18);

        // TODO: check rounding direction

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
        await mint(instance.address, BigNumber.from('5'));

        const supply = await instance.callStatic.totalSupply();
        const assets = await instance.callStatic.totalAssets();

        const shareAmount = ethers.utils.parseUnits('1', 18);

        // TODO: check rounding direction

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

        // TODO: check rounding direction

        expect(await instance.callStatic.previewDeposit(assetAmount)).to.eq(
          await instance.callStatic.convertToShares(assetAmount),
        );
      });
    });

    describe('#previewMint(uint256)', () => {
      it('returns the mint input amount converted to assets', async () => {
        const shareAmount = ethers.utils.parseUnits('1', 18);

        // TODO: check rounding direction

        expect(await instance.callStatic.previewMint(shareAmount)).to.eq(
          await instance.callStatic.convertToAssets(shareAmount),
        );
      });
    });

    describe('#previewWithdraw(uint256)', () => {
      it('returns the withdraw input amount coverted to shares', async () => {
        const assetAmount = ethers.utils.parseUnits('1', 18);

        // TODO: check rounding direction

        expect(await instance.callStatic.previewWithdraw(assetAmount)).to.eq(
          await instance.callStatic.convertToShares(assetAmount),
        );
      });
    });

    describe('#previewRedeem(uint256)', () => {
      it('returns the redeem input amount converted to assets', async () => {
        const shareAmount = ethers.utils.parseUnits('1', 18);

        // TODO: check rounding direction

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

        expect(() =>
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

        expect(() =>
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
        it.skip('assetAmount input is too large', async () => {
          await expect(
            instance.deposit(ethers.constants.MaxUint256, caller.address),
          ).to.be.revertedWith('ERC4626: maximum amount exceeded');
        });
      });
    });

    describe('#mint(uint256,address)', () => {
      it('todo');
    });

    describe('#withdraw(uint256,address,address)', () => {
      it('todo');
    });

    describe('#redeem(uint256,address,address)', () => {
      it('todo');
    });
  });
}
