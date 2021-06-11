import { expect } from 'chai';
import { describeFilter, signERC2612Permit } from '@solidstate/library';
import { ethers } from 'hardhat';
import { ERC20Permit } from '../../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfERC20Base } from './ERC20Base.behavior';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { describeBehaviorOfERC20Metadata } from './ERC20Metadata.behavior';
import { getCurrentTimestamp } from 'hardhat/internal/hardhat-network/provider/utils/getCurrentTimestamp';

interface ERC20PermitArgs {
  deploy: () => Promise<ERC20Permit>;
  supply: BigNumber;
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  name: string;
  symbol: string;
  decimals: BigNumberish;
}

export function describeBehaviorOfERC20Permit(
  { deploy, supply, burn, mint, name, symbol, decimals }: ERC20PermitArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20Permit', function () {
    let user: SignerWithAddress;
    let spender: SignerWithAddress;
    let thirdParty: SignerWithAddress;
    let instance: ERC20Permit;

    beforeEach(async function () {
      [user, spender, thirdParty] = await ethers.getSigners();
      instance = await deploy();
    });

    describeBehaviorOfERC20Base(
      {
        deploy,
        mint,
        burn,
        supply,
      },
      skips,
    );

    describeBehaviorOfERC20Metadata(
      {
        deploy,
        name,
        symbol,
        decimals,
      },
      skips,
    );

    describe('#permit', function () {
      it('should increase allowance using permit', async () => {
        const deadline = getCurrentTimestamp() + 100;

        const permit = await signERC2612Permit(
          user.provider,
          instance.address,
          user.address,
          spender.address,
          '500',
          deadline,
        );

        await instance
          .connect(thirdParty)
          .permit(
            user.address,
            spender.address,
            '500',
            deadline,
            permit.v,
            permit.r,
            permit.s,
          );

        expect(await instance.allowance(user.address, spender.address)).to.eq(
          500,
        );
      });

      it('should revert if deadline is passed', async () => {
        const deadline = getCurrentTimestamp() - 10;

        const permit = await signERC2612Permit(
          user.provider,
          instance.address,
          user.address,
          spender.address,
          '500',
          deadline,
        );

        await expect(
          instance
            .connect(thirdParty)
            .permit(
              user.address,
              spender.address,
              '500',
              deadline,
              permit.v,
              permit.r,
              permit.s,
            ),
        ).to.be.revertedWith('ERC20Permit: expired deadline');
      });

      it('should revert if signature is invalid', async () => {
        const deadline = getCurrentTimestamp() + 100;

        const permit = await signERC2612Permit(
          user.provider,
          instance.address,
          user.address,
          spender.address,
          '500',
          deadline,
        );

        await expect(
          instance
            .connect(thirdParty)
            .permit(
              user.address,
              spender.address,
              '500',
              deadline,
              permit.v,
              '0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
              permit.s,
            ),
        ).to.be.revertedWith('ECDSA: invalid signature');
      });
    });
  });
}
