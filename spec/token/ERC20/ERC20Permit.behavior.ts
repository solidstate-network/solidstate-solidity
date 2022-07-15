import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter, signERC2612Permit } from '@solidstate/library';
import { ERC20Permit } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

interface ERC20PermitBehaviorArgs {
  allowance: (holder: string, spender: string) => Promise<BigNumber>;
}

export function describeBehaviorOfERC20Permit(
  deploy: () => Promise<ERC20Permit>,
  args: ERC20PermitBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20Permit', function () {
    let holder: SignerWithAddress;
    let spender: SignerWithAddress;
    let thirdParty: SignerWithAddress;
    let instance: ERC20Permit;

    beforeEach(async function () {
      [holder, spender, thirdParty] = await ethers.getSigners();
      instance = await deploy();
    });

    describe('#DOMAIN_SEPARATOR', () => {
      it('todo');
    });

    describe('#nonces', () => {
      it('todo');
    });

    describe('#permit(address,address,uint256,uint256,uint8,bytes32,bytes32)', function () {
      it('should increase allowance using permit', async () => {
        const { timestamp } = await ethers.provider.getBlock('latest');

        const amount = ethers.constants.Two;
        const deadline = timestamp + 1;

        const permit = await signERC2612Permit(
          ethers.provider,
          instance.address,
          holder.address,
          spender.address,
          amount.toString(),
          deadline,
        );

        await instance
          .connect(thirdParty)
          .permit(
            holder.address,
            spender.address,
            amount,
            deadline,
            permit.v,
            permit.r,
            permit.s,
          );

        expect(await args.allowance(holder.address, spender.address)).to.eq(
          amount,
        );
      });

      describe('reverts if', () => {
        it('deadline has passed', async () => {
          const { timestamp } = await ethers.provider.getBlock('latest');

          const amount = ethers.constants.Two;
          const deadline = timestamp;

          const permit = await signERC2612Permit(
            ethers.provider,
            instance.address,
            holder.address,
            spender.address,
            amount.toString(),
            deadline,
          );

          await expect(
            instance
              .connect(thirdParty)
              .permit(
                holder.address,
                spender.address,
                amount,
                deadline,
                permit.v,
                permit.r,
                permit.s,
              ),
          ).to.be.revertedWith('ERC20Permit: expired deadline');
        });

        it('signature is invalid', async () => {
          const { timestamp } = await ethers.provider.getBlock('latest');

          const amount = ethers.constants.Two;
          const deadline = timestamp + 1;

          const permit = await signERC2612Permit(
            ethers.provider,
            instance.address,
            holder.address,
            spender.address,
            amount.toString(),
            deadline,
          );

          await expect(
            instance
              .connect(thirdParty)
              .permit(
                holder.address,
                spender.address,
                amount,
                deadline,
                permit.v,
                '0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
                permit.s,
              ),
          ).to.be.revertedWith('ECDSA: invalid signature');
        });

        it('signature has already been used', async () => {
          const { timestamp } = await ethers.provider.getBlock('latest');

          const amount = ethers.constants.Two;
          const deadline = timestamp + 2;

          const permit = await signERC2612Permit(
            ethers.provider,
            instance.address,
            holder.address,
            spender.address,
            amount.toString(),
            deadline,
          );

          await instance
            .connect(thirdParty)
            .permit(
              holder.address,
              spender.address,
              amount,
              deadline,
              permit.v,
              permit.r,
              permit.s,
            );

          await expect(
            instance
              .connect(thirdParty)
              .permit(
                holder.address,
                spender.address,
                amount,
                deadline,
                permit.v,
                permit.r,
                permit.s,
              ),
          ).to.be.revertedWith('ERC20Permit: invalid signature');
        });
      });
    });
  });
}
