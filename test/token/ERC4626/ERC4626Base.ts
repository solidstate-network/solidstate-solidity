import {
  ERC20Mock,
  ERC20Mock__factory,
  ERC4626BaseMock,
  ERC4626BaseMock__factory,
} from '../../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  describeBehaviorOfCloneFactory,
  describeBehaviorOfERC4626Base,
} from '@solidstate/spec';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe('ERC4626Base', () => {
  let deployer: SignerWithAddress;
  let depositor: SignerWithAddress;
  let instance: ERC4626BaseMock;
  let assetInstance: ERC20Mock;

  before(async () => {
    [deployer, depositor] = await ethers.getSigners();
  });

  beforeEach(async () => {
    assetInstance = await new ERC20Mock__factory(deployer).deploy(
      'asset',
      'AST',
      18,
      ethers.utils.parseEther('100'),
    );

    instance = await new ERC4626BaseMock__factory(deployer).deploy(
      assetInstance.address,
    );
  });

  describeBehaviorOfERC4626Base({
    deploy: async () => instance as any,
    supply: ethers.constants.Zero,
    mint: (recipient: string, amount: BigNumber) =>
      instance.__mint(recipient, amount),
    burn: (recipient: string, amount: BigNumber) =>
      instance.__burn(recipient, amount),
  });

  describe('__internal', () => {
    describe('#_totalAssets()', () => {
      it('returns the total asset value denominated in the base asset', async () => {
        expect(await instance.callStatic.totalAssets()).to.be.eq(
          ethers.constants.Two,
        );
      });
    });

    describe('#_asset()', () => {
      it('returns the address of the base asset', async () => {
        expect(await instance.callStatic.asset()).to.eq(assetInstance.address);
      });
    });

    describe('#_convertToShares(uint256)', () => {
      it('returns input amount if share supply is zero', async () => {
        expect(
          await instance.callStatic.convertToShares(ethers.constants.Two),
        ).to.eq(ethers.constants.Two);
      });

      it('returns the correct amount of shares if totalSupply is non-zero', async () => {
        await instance.__mint(deployer.address, BigNumber.from('10'));

        expect(
          await instance.callStatic.convertToShares(ethers.constants.One),
        ).to.eq(BigNumber.from('5'));
      });
    });

    describe('#_convertToAssets(uint256)', () => {
      it('returns input amount if share supply is zero', async () => {
        expect(
          await instance.callStatic.convertToAssets(ethers.constants.Two),
        ).to.eq(ethers.constants.Two);
      });

      it('returns the correct amount of assets if totalSupply is non-zero', async () => {
        await instance.__mint(deployer.address, BigNumber.from('5'));

        expect(
          await instance.callStatic.convertToAssets(BigNumber.from('10')),
        ).to.eq(BigNumber.from('4'));
      });
    });

    describe('#_maxDeposit(address)', () => {
      it('returns the maximum deposit as uint256.max', async () => {
        expect(await instance.maxDeposit(deployer.address)).to.eq(
          ethers.constants.MaxUint256.sub(ethers.constants.One),
        );
      });
    });

    describe('#_maxMint(address)', () => {
      it('returns the maximum mint as uint256.max', async () => {
        expect(await instance.maxMint(deployer.address)).to.eq(
          ethers.constants.MaxUint256.sub(ethers.constants.One),
        );
      });
    });

    describe('#_maxWithdraw(address)', () => {
      it('returns the maximum withdraw as balance of caller converted to assets', async () => {
        await instance.connect(deployer).__mint(BigNumber.from('10'));

        expect(await instance.maxWithdraw(deployer.address)).to.eq(
          await instance.callStatic.convertToAssets(BigNumber.from('10')),
        );
      });
    });

    describe('#_maxRedeem(address)', () => {
      it('returns the maximum redeem as balance of caller', async () => {
        await instance.connect(deployer).__mint(BigNumber.from('10'));

        expect(await instance.maxRedeem(deployer.address)).to.eq(
          BigNumber.from('10'),
        );
      });
    });

    describe('#_previewDeposit(uint256)', () => {
      it('returns the deposit input amount converted to shares', async () => {
        expect(
          await instance.callStatic.previewDeposit(ethers.constants.One),
        ).to.eq(
          await instance.callStatic.convertToShares(ethers.constants.One),
        );
      });
    });

    describe('_previewMint(uint256)', () => {
      it('returns the mint input amount converted to assets', async () => {
        expect(
          await instance.callStatic.previewMint(ethers.constants.One),
        ).to.eq(
          await instance.callStatic.convertToAssets(ethers.constants.One),
        );
      });
    });

    describe('_previewWithdraw(uint256)', () => {
      it('returns the withdraw input amount coverted to shares', async () => {
        expect(
          await instance.callStatic.previewWithdraw(ethers.constants.One),
        ).to.eq(
          await instance.callStatic.convertToShares(ethers.constants.One),
        );
      });
    });

    describe('_previewRedeem(uint256)', () => {
      it('returns the redeem input amount converted to assets', async () => {
        expect(
          await instance.callStatic.previewMint(ethers.constants.One),
        ).to.eq(
          await instance.callStatic.convertToAssets(ethers.constants.One),
        );
      });
    });

    describe('#_deposit(uint256,address)', () => {
      it('transfers assets from caller', async () => {
        const assetAmount = BigNumber.from('10');

        await instance.__mint(deployer.address, assetAmount);
        await assetInstance.__mint(depositor.address, assetAmount);
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
        const assetAmount = BigNumber.from('10');

        await instance.__mint(deployer.address, assetAmount);
        await assetInstance.__mint(depositor.address, assetAmount);
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
        const assetAmount = BigNumber.from('10');

        await instance.__mint(deployer.address, assetAmount);
        await assetInstance.__mint(depositor.address, assetAmount);
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

      it('calls the _afterDeposit hook', async () => {
        const assetAmount = BigNumber.from('10');

        await instance.__mint(deployer.address, assetAmount);
        await assetInstance.__mint(depositor.address, assetAmount);
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
          .to.emit(instance, 'AfterDepositCheck')
          .withArgs(depositor.address, assetAmount, shareAmount);
      });

      describe('reverts if', () => {
        it('assetAmount input is too large', async () => {
          await expect(
            instance.deposit(ethers.constants.MaxUint256, deployer.address),
          ).to.be.revertedWith('ERC4626: maximum amount exceeded');
        });
      });
    });
  });
});
