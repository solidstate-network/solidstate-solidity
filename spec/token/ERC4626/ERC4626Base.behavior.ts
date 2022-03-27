import { IERC20, ERC4626Base } from '../../../typechain';
import { describeBehaviorOfERC20Base } from '../ERC20';
import { describeFilter } from '@solidstate/library';
import { expect } from 'chai';
import { BigNumber, ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

interface ERC4626BaseBehaviorArgs {
  deploy: () => Promise<ERC4626Base>;
  getAsset: () => Promise<IERC20>;
  totalAssets: BigNumber;
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  supply: BigNumber;
}

export function describeBehaviorOfERC4626Base(
  {
    deploy,
    getAsset,
    totalAssets,
    mint,
    burn,
    supply,
  }: ERC4626BaseBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC4626Base', function () {
    let assetInstance: IERC20;
    let instance: ERC4626Base;

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

    describe('#totalAssets()', () => {
      it('returns the total asset value denominated in the base asset', async () => {
        expect(await instance.callStatic.totalAssets()).to.be.eq(totalAssets);
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

        expect(
          await instance.callStatic.convertToShares(ethers.constants.One),
        ).to.eq(BigNumber.from('5'));
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

        expect(
          await instance.callStatic.convertToAssets(BigNumber.from('10')),
        ).to.eq(BigNumber.from('4'));
      });
    });

    describe('#maxDeposit(address)', () => {
      it('todo');
    });

    describe('#maxMint(address)', () => {
      it('todo');
    });

    describe('#maxWithdraw(address)', () => {
      it('todo');
    });

    describe('#maxRedeem(address)', () => {
      it('todo');
    });

    describe('#previewDeposit(uint256)', () => {
      it('todo');
    });

    describe('#previewMint(uint256)', () => {
      it('todo');
    });

    describe('#previewWithdraw(uint256)', () => {
      it('todo');
    });

    describe('#previewRedeem(uint256)', () => {
      it('todo');
    });

    describe('#deposit(uint256,address)', () => {
      it('todo');
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
