import {
  describeBehaviorOfERC20Base,
  ERC20BaseBehaviorArgs,
} from './ERC20Base.behavior';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { ERC20ImplicitApproval } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface ERC20ImplicitApprovalBehaviorArgs
  extends ERC20BaseBehaviorArgs {
  getHolder: () => Promise<SignerWithAddress>;
  getImplicitlyApprovedSpender: () => Promise<SignerWithAddress>;
}

export function describeBehaviorOfERC20ImplicitApproval(
  deploy: () => Promise<ERC20ImplicitApproval>,
  {
    supply,
    getHolder,
    getImplicitlyApprovedSpender,
    burn,
    mint,
  }: ERC20ImplicitApprovalBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20ImplicitApproval', () => {
    let holder: SignerWithAddress;
    let implicitlyApprovedSpender: SignerWithAddress;
    let instance: ERC20ImplicitApproval;

    before(async () => {
      holder = await getHolder();
      implicitlyApprovedSpender = await getImplicitlyApprovedSpender();
    });

    beforeEach(async () => {
      instance = await deploy();
    });

    describeBehaviorOfERC20Base(
      deploy,
      {
        mint,
        burn,
        supply,
      },
      skips,
    );

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

        await mint(holder.address, amount);

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
