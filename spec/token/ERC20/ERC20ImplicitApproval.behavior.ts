import { describeBehaviorOfERC20Base } from './ERC20Base.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { ERC20ImplicitApproval } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber, ContractTransaction } from 'ethers';
import { ethers } from 'hardhat';

interface ERC20ImplicitApprovalBehaviorArgs {
  deploy: () => Promise<ERC20ImplicitApproval>;
  supply: BigNumber;
  getHolder: () => Promise<SignerWithAddress>;
  getImplicitlyApprovedSpender: () => Promise<SignerWithAddress>;
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
}

export function describeBehaviorOfERC20ImplicitApproval(
  {
    deploy,
    supply,
    getHolder,
    getImplicitlyApprovedSpender,
    burn,
    mint,
  }: ERC20ImplicitApprovalBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20ImplicitApproval', function () {
    let holder: SignerWithAddress;
    let implicitlyApprovedSpender: SignerWithAddress;
    let instance: ERC20ImplicitApproval;

    before(async function () {
      holder = await getHolder();
      implicitlyApprovedSpender = await getImplicitlyApprovedSpender();
    });

    beforeEach(async function () {
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

    describe('#allowance(address,address)', function () {
      it('returns maximum uint256 for implicitly approved spender', async function () {
        expect(
          await instance.callStatic['allowance(address,address)'](
            ethers.constants.AddressZero,
            implicitlyApprovedSpender.address,
          ),
        ).to.equal(ethers.constants.MaxUint256);
      });
    });

    describe('#transferFrom(address,address,uint256)', function () {
      it('does not require approval for implicitly approved sender', async function () {
        const amount = ethers.constants.One;

        await mint(holder.address, amount);

        await instance
          .connect(holder)
          .approve(
            implicitlyApprovedSpender.address,
            ethers.constants.AddressZero,
          );

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
