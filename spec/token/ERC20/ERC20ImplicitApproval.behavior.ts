import { expect } from 'chai';
import { describeFilter } from '@solidstate/library';
import { ethers } from 'hardhat';
import { ERC20ImplicitApproval } from '../../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfERC20Base } from './ERC20Base.behavior';
import { BigNumber, ContractTransaction } from 'ethers';

interface ERC20ImplicitApprovalBehaviorArgs {
  deploy: () => Promise<ERC20ImplicitApproval>;
  supply: BigNumber;
  getImplicitlyApprovedSpender: () => Promise<SignerWithAddress>;
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
}

export function describeBehaviorOfERC20ImplicitApproval(
  {
    deploy,
    supply,
    getImplicitlyApprovedSpender,
    burn,
    mint,
  }: ERC20ImplicitApprovalBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20ImplicitApproval', function () {
    let implicitlyApprovedSpender: SignerWithAddress;
    let instance: ERC20ImplicitApproval;

    before(async function () {
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

    describe('#allowance', function () {
      it('returns maximum uint256 for implicitly approved spender', async function () {
        expect(
          await instance.callStatic['allowance(address,address)'](
            ethers.constants.AddressZero,
            implicitlyApprovedSpender.address,
          ),
        ).to.equal(ethers.constants.MaxUint256);
      });
    });

    describe('#transferFrom', function () {
      it('todo');
    });
  });
}
