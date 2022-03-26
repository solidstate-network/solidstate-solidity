import { ERC4626Base } from '../../../typechain';
import { describeBehaviorOfERC20Base } from '../ERC20';
import { describeFilter } from '@solidstate/library';
import { expect } from 'chai';
import { BigNumber, ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

interface ERC4626BaseBehaviorArgs {
  deploy: () => Promise<ERC4626Base>;
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  supply: BigNumber;
}

export function describeBehaviorOfERC4626Base(
  { deploy, mint, burn, supply }: ERC4626BaseBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC4626Base', function () {
    let instance: ERC4626Base;

    beforeEach(async function () {
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

    // TODO: functions

    describe('#asset()', () => {
      it('todo');
    });

    describe('#totalAssets()', () => {
      it('todo');
    });

    describe('#convertToShares(uint256)', () => {
      it('todo');
    });

    describe('#convertToAssets(uint256)', () => {
      it('todo');
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
