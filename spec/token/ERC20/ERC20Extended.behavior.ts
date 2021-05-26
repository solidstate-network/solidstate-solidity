import { expect } from 'chai';
import { describeBehaviorOfERC20Base } from './ERC20Base.behavior';
import { describeFilter } from '@solidstate/library/mocha_describe_filter';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ERC20Extended, ERC20ExtendedMock__factory } from '../../../typechain';
import { ethers } from 'hardhat';
import { BigNumber, ContractTransaction } from 'ethers';

interface ERC20ExtendedBehaviorArgs {
  deploy: () => Promise<ERC20Extended>;
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  supply: BigNumber;
}

export function describeBehaviorOfERC20Extended(
  { deploy, mint, burn, supply }: ERC20ExtendedBehaviorArgs,
  skips: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20Extended', function () {
    let deployer: SignerWithAddress;
    let holder: SignerWithAddress;
    let spender: SignerWithAddress;
    let instance: ERC20Extended;

    before(async function () {
      [deployer, holder, spender] = await ethers.getSigners();
    });

    beforeEach(async function () {
      instance = await new ERC20ExtendedMock__factory(deployer).deploy();
    });

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC20Base({ deploy, supply, burn, mint }, skips);

    describe('#increaseAllowance', function () {
      it('increases approval of spender with respect to holder by given amount', async function () {
        let amount = ethers.constants.Two;

        await instance
          .connect(holder)
          ['increaseAllowance(address,uint256)'](spender.address, amount);

        await expect(
          await instance.callStatic['allowance(address,address)'](
            holder.address,
            spender.address,
          ),
        ).to.equal(amount);

        await instance
          .connect(holder)
          ['increaseAllowance(address,uint256)'](spender.address, amount);

        await expect(
          await instance.callStatic['allowance(address,address)'](
            holder.address,
            spender.address,
          ),
        ).to.equal(amount.mul(ethers.constants.Two));

        // TODO: test case is no different from #allowance test; tested further by #transferFrom tests
      });

      it('emits Approval event', async function () {
        let amount = ethers.constants.Two;

        await expect(
          instance
            .connect(holder)
            ['increaseAllowance(address,uint256)'](spender.address, amount),
        )
          .to.emit(instance, 'Approval')
          .withArgs(holder.address, spender.address, amount);
      });

      describe('reverts if', function () {
        it('approval amount overflows uint256', async function () {
          await instance
            .connect(holder)
            ['increaseAllowance(address,uint256)'](
              spender.address,
              ethers.constants.MaxUint256,
            );

          await expect(
            instance
              .connect(holder)
              ['increaseAllowance(address,uint256)'](
                spender.address,
                ethers.constants.One,
              ),
          ).to.be.revertedWith('ERC20Extended: excessive allowance');
        });
      });
    });

    describe('#decreaseAllowance', function () {
      it('decreases approval of spender with respect to holder by given amount', async function () {
        let amount = ethers.constants.Two;
        await instance
          .connect(holder)
          ['increaseAllowance(address,uint256)'](
            spender.address,
            amount.mul(ethers.constants.Two),
          );

        await instance
          .connect(holder)
          ['decreaseAllowance(address,uint256)'](spender.address, amount);

        await expect(
          await instance.callStatic['allowance(address,address)'](
            holder.address,
            spender.address,
          ),
        ).to.equal(amount);

        await instance
          .connect(holder)
          ['decreaseAllowance(address,uint256)'](spender.address, amount);

        await expect(
          await instance.callStatic['allowance(address,address)'](
            holder.address,
            spender.address,
          ),
        ).to.equal(ethers.constants.Zero);

        // TODO: test case is no different from #allowance test; tested further by #transferFrom tests
      });

      it('emits Approval event', async function () {
        let amount = ethers.constants.Two;
        await instance
          .connect(holder)
          ['increaseAllowance(address,uint256)'](spender.address, amount);

        await expect(
          instance
            .connect(holder)
            ['decreaseAllowance(address,uint256)'](spender.address, amount),
        )
          .to.emit(instance, 'Approval')
          .withArgs(holder.address, spender.address, ethers.constants.Zero);
      });

      describe('reverts if', function () {
        it('approval amount underflows uint256', async function () {
          await expect(
            instance
              .connect(holder)
              ['decreaseAllowance(address,uint256)'](
                spender.address,
                ethers.constants.One,
              ),
          ).to.be.revertedWith('ERC20Extended: insufficient allowance');
        });
      });
    });
  });
}
