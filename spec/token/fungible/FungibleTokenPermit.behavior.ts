import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { describeFilter, signERC2612Permit } from '@solidstate/library';
import { FungibleTokenPermit } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface FungibleTokenPermitBehaviorArgs {
  allowance: (holder: string, spender: string) => Promise<bigint>;
}

export function describeBehaviorOfFungibleTokenPermit(
  deploy: () => Promise<FungibleTokenPermit>,
  args: FungibleTokenPermitBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::FungibleTokenPermit', () => {
    let holder: SignerWithAddress;
    let spender: SignerWithAddress;
    let thirdParty: SignerWithAddress;
    let instance: FungibleTokenPermit;

    beforeEach(async () => {
      [holder, spender, thirdParty] = await ethers.getSigners();
      instance = await deploy();
    });

    describe('#DOMAIN_SEPARATOR()', () => {
      it('todo');
    });

    describe('#nonces(address)', () => {
      it('returns current nonce for given account', async () => {
        expect(
          await instance.nonces.staticCall(await holder.getAddress()),
        ).to.eq(0n);
      });
    });

    describe('#permit(address,address,uint256,uint256,uint8,bytes32,bytes32)', () => {
      it('increases allowance using permit', async () => {
        const timestamp = BigInt(await time.latest());

        const amount = 2n;
        const deadline = timestamp + 100n;

        const permit = await signERC2612Permit(
          instance,
          holder,
          spender,
          amount,
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

      it('increments nonce', async () => {
        const nonce = await instance.nonces.staticCall(
          await holder.getAddress(),
        );

        const permit = await signERC2612Permit(
          instance,
          holder,
          spender,
          0n,
          ethers.MaxUint256,
        );

        await instance
          .connect(thirdParty)
          .permit(
            holder.address,
            spender.address,
            0n,
            ethers.MaxUint256,
            permit.v,
            permit.r,
            permit.s,
          );

        expect(
          await instance.nonces.staticCall(await holder.getAddress()),
        ).to.eq(nonce + 1n);
      });

      describe('reverts if', () => {
        it('deadline has passed', async () => {
          const timestamp = BigInt(await time.latest());

          const amount = 2n;
          const deadline = timestamp + 100n;

          const permit = await signERC2612Permit(
            instance,
            holder,
            spender,
            amount,
            deadline,
          );

          await time.setNextBlockTimestamp(deadline + 1n);

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
            'FungibleTokenPermit__ExpiredDeadline',
          );
        });

        it('signature is invalid', async () => {
          const timestamp = BigInt(await time.latest());

          const amount = 2n;
          const deadline = timestamp + 100n;

          const permit = await signERC2612Permit(
            instance,
            holder,
            spender,
            amount,
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
          const timestamp = BigInt(await time.latest());

          const amount = 2n;
          const deadline = timestamp + 100n;

          const permit = await signERC2612Permit(
            instance,
            holder,
            spender,
            amount,
            deadline,
          );

          await time.setNextBlockTimestamp(deadline - 1n);

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
            'FungibleTokenPermit__InvalidSignature',
          );
        });
      });
    });
  });
}
