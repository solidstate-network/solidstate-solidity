import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  describeBehaviorOfCloneFactory,
  describeBehaviorOfERC20Base,
} from '@solidstate/spec';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  ERC20Mock,
  ERC20Mock__factory,
  ERC4626BaseMock,
  ERC4626BaseMock__factory,
} from '../../../typechain';
import { BigNumber } from 'ethers';

describe.only('ERC4626Base', () => {
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

  describe('__internal', () => {
    describe('#_totalAssets()', () => {
      it('returns the totalAsset value', async () => {
        expect(await instance.totalAssets()).to.be.eq(ethers.constants.Two);
      });
    });

    describe('#_asset()', () => {
      it('returns the address of the underlying asset', async () => {
        expect(await instance.asset()).to.eq(assetInstance.address);
      });
    });

    describe('#_convertToShares(uint256)', () => {
      it('returns shareAmount input if totalSupply is zero', async () => {
        expect(await instance.convertToShares(ethers.constants.Two)).to.eq(
          ethers.constants.Two,
        );
      });

      it('returns the correct amount of shares if totalSupply is non-zero', async () => {
        await instance.connect(deployer).__mint(BigNumber.from('10'));

        expect(await instance.convertToShares(ethers.constants.One)).to.eq(
          BigNumber.from('5'),
        );
      });
    });

    describe('#_convertToAssets(uint256)', () => {
      it('returns shareAmount inpput if totalSupply is 0', async () => {
        expect(await instance.convertToAssets(ethers.constants.Two)).to.eq(
          ethers.constants.Two,
        );
      });

      it('returns the correct amount of assets if totalSupply is non-zero', async () => {
        await instance.connect(deployer).__mint(BigNumber.from('5'));

        expect(await instance.convertToAssets(BigNumber.from('10'))).to.eq(
          BigNumber.from('4'),
        );
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
          await instance.convertToAssets(BigNumber.from('10')),
        );
      });
    });

    describe('#_maxRedeem', () => {
      it('returns the maximum redeem as balance of caller', async () => {
        await instance.connect(deployer).__mint(BigNumber.from('10'));

        expect(await instance.maxRedeem(deployer.address)).to.eq(
          BigNumber.from('10'),
        );
      });
    });

    describe('#_previewDeposit(uint256)', () => {
      it('returns the deposit input amount converted to shares', async () => {
        expect(await instance.previewDeposit(ethers.constants.One)).to.eq(
          await instance.convertToShares(ethers.constants.One),
        );
      });
    });

    describe('_previewMint(uint256)', () => {
      it('returns the mint input amount converted to assets', async () => {
        expect(await instance.previewMint(ethers.constants.One)).to.eq(
          await instance.convertToAssets(ethers.constants.One),
        );
      });
    });

    describe('_previewWithdraw(uint256)', () => {
      it('returns the withdraw input amount coverted to shares', async () => {
        expect(await instance.previewWithdraw(ethers.constants.One)).to.eq(
          await instance.convertToShares(ethers.constants.One),
        );
      });
    });

    describe('_previewRedeem(uint256)', () => {
      it('returns the redeem input amount converted to assets', async () => {
        expect(await instance.previewMint(ethers.constants.One)).to.eq(
          await instance.convertToAssets(ethers.constants.One),
        );
      });
    });

    describe.only('#_deposit(uint256,address)', () => {
      // it('mints the correct amount of shares for asset input to receiver input address', async () => {
      // const depositAmount = BigNumber.from('10');

      // await instance.connect(deployer).__mint(depositAmount);
      // await assetInstance.__mint(depositor.address, depositAmount);
      // await assetInstance.connect(depositor).approve(instance.address, depositAmount);

      // const returnedShares = await instance.previewDeposit(depositAmount);

      // expect(await instance.connect(depositor).deposit(depositAmount, depositor.address))
      // .to.changeTokenBalance(instance, depositor, returnedShares)
      // .to.changeTokenBalances(assetInstance, [depositor, instance], [depositAmount.mul(BigNumber.from('-1')), depositAmount]);
      // });

      it('emits a deposit event', async () => {
        const depositAmount = BigNumber.from('10');

        await instance.connect(deployer).__mint(depositAmount);
        await assetInstance.__mint(depositor.address, depositAmount);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, depositAmount);

        const returnedShares = await instance.previewDeposit(depositAmount);

        expect(
          await instance
            .connect(depositor)
            .deposit(depositAmount, depositor.address),
        )
          .to.emit(instance, 'Deposit')
          .withArgs(
            depositor.address,
            depositor.address,
            depositAmount,
            returnedShares,
          );
      });

      it('calls the _afterDeposit hook', async () => {
        const depositAmount = BigNumber.from('10');

        await instance.connect(deployer).__mint(depositAmount);
        await assetInstance.__mint(depositor.address, depositAmount);
        await assetInstance
          .connect(depositor)
          .approve(instance.address, depositAmount);

        const returnedShares = await instance.previewDeposit(depositAmount);

        expect(
          await instance
            .connect(depositor)
            .deposit(depositAmount, depositor.address),
        )
          .to.emit(instance, 'AfterDepositCheck')
          .withArgs(depositor.address, depositAmount, returnedShares);
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
