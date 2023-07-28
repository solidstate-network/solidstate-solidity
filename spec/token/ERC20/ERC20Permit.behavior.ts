import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { describeFilter, signERC2612Permit } from '@solidstate/library';
import { ERC20Permit } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

export interface ERC20PermitBehaviorArgs {
  allowance: (holder: string, spender: string) => Promise<bigint>;
}

export function describeBehaviorOfERC20Permit(
  deploy: () => Promise<ERC20Permit>,
  args: ERC20PermitBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20Permit', () => {
    let holder: SignerWithAddress;
    let spender: SignerWithAddress;
    let thirdParty: SignerWithAddress;
    let instance: ERC20Permit;

    beforeEach(async () => {
      [holder, spender, thirdParty] = await ethers.getSigners();
      instance = await deploy();
    });

    describe('#DOMAIN_SEPARATOR()', () => {
      it('todo');
    });

    describe('#nonces(address)', () => {
      it('todo');
    });

    describe('#permit(address,address,uint256,uint256,uint8,bytes32,bytes32)', () => {
      it('should increase allowance using permit', async () => {
        const timestamp = await time.latest();

        const amount = 2;
        const deadline = timestamp + 100;

        const permit = await signERC2612Permit(
          ethers.provider,
          await instance.getAddress(),
          holder.address,
          spender.address,
          amount.toString(),
          deadline,
        );

        await time.setNextBlockTimestamp(deadline);

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
          const timestamp = await time.latest();

          const amount = 2;
          const deadline = timestamp + 100;

          const permit = await signERC2612Permit(
            ethers.provider,
            await instance.getAddress(),
            holder.address,
            spender.address,
            amount.toString(),
            deadline,
          );

          await time.setNextBlockTimestamp(deadline + 1);

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
          ).to.be.revertedWithCustomError(
            instance,
            'ERC20Permit__ExpiredDeadline',
          );
        });

        it('signature is invalid', async () => {
          const timestamp = await time.latest();

          const amount = 2;
          const deadline = timestamp + 100;

          const permit = await signERC2612Permit(
            ethers.provider,
            await instance.getAddress(),
            holder.address,
            spender.address,
            amount.toString(),
            deadline,
          );

          await time.setNextBlockTimestamp(deadline);

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
          ).to.be.revertedWithCustomError(instance, 'ECDSA__InvalidSignature');
        });

        it('signature has already been used', async () => {
          const timestamp = await time.latest();

          const amount = 2;
          const deadline = timestamp + 100;

          const permit = await signERC2612Permit(
            ethers.provider,
            await instance.getAddress(),
            holder.address,
            spender.address,
            amount.toString(),
            deadline,
          );

          await time.setNextBlockTimestamp(deadline - 1);

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

          await time.setNextBlockTimestamp(deadline);

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
          ).to.be.revertedWithCustomError(
            instance,
            'ERC20Permit__InvalidSignature',
          );
        });
      });
    });
  });
}
