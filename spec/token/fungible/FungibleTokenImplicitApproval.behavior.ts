import {
  describeBehaviorOfFungibleTokenBase,
  FungibleTokenBaseBehaviorArgs,
} from './FungibleTokenBase.behavior';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { FungibleTokenImplicitApproval } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface FungibleTokenImplicitApprovalBehaviorArgs
  extends FungibleTokenBaseBehaviorArgs {
  getHolder: () => Promise<SignerWithAddress>;
  getImplicitlyApprovedSpender: () => Promise<SignerWithAddress>;
}

export function describeBehaviorOfFungibleTokenImplicitApproval(
  deploy: () => Promise<FungibleTokenImplicitApproval>,
  args: FungibleTokenImplicitApprovalBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::FungibleTokenImplicitApproval', () => {
    let holder: SignerWithAddress;
    let implicitlyApprovedSpender: SignerWithAddress;
    let instance: FungibleTokenImplicitApproval;

    before(async () => {
      holder = await args.getHolder();
      implicitlyApprovedSpender = await args.getImplicitlyApprovedSpender();
    });

    beforeEach(async () => {
      instance = await deploy();
    });

    describeBehaviorOfFungibleTokenBase(deploy, args, skips);

    describe('#allowance(address,address)', () => {
      it('returns maximum uint256 for implicitly approved spender', async () => {
        expect(
          await instance.allowance.staticCall(
            ethers.ZeroAddress,
            implicitlyApprovedSpender.address,
          ),
        ).to.equal(ethers.MaxUint256);
      });
    });

    describe('#transferFrom(address,address,uint256)', () => {
      it('does not require approval for implicitly approved sender', async () => {
        const amount = 1n;

        await args.mint(holder.address, amount);

        await instance
          .connect(holder)
          .approve(implicitlyApprovedSpender.address, ethers.ZeroAddress);

        await expect(
          instance
            .connect(implicitlyApprovedSpender)
            .transferFrom(
              holder.address,
              implicitlyApprovedSpender.address,
              amount,
            ),
        ).not.to.be.reverted;
      });
    });
  });
}
