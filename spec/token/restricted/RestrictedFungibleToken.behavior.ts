import {
  describeBehaviorOfFungibleTokenBase,
  FungibleTokenBaseBehaviorArgs,
} from '../fungible';
import { describeFilter } from '@solidstate/library';
import { IRestrictedFungibleToken } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface RestrictedFungibleTokenBehaviorArgs
  extends FungibleTokenBaseBehaviorArgs {
  restrictions: { code: bigint; message: string }[];
}

export function describeBehaviorOfRestrictedFungibleToken(
  deploy: () => Promise<IRestrictedFungibleToken>,
  args: RestrictedFungibleTokenBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::RestrictedFungibleToken', () => {
    let instance: IRestrictedFungibleToken;

    beforeEach(async () => {
      instance = await deploy();
    });

    describeBehaviorOfFungibleTokenBase(deploy, args, skips);

    describe('#detectTransferRestriction(address,address,uint256)', () => {
      it('returns zero if no restriction exists', async () => {
        expect(
          await instance.detectTransferRestriction.staticCall(
            ethers.ZeroAddress,
            ethers.ZeroAddress,
            1,
          ),
        ).to.equal(0);
      });
    });

    describe('#messageForTransferRestriction(uint8)', () => {
      it('returns empty string for unknown restriction code', async () => {
        expect(
          await instance.messageForTransferRestriction.staticCall(255),
        ).to.equal('');
      });

      for (let restriction of args.restrictions) {
        it(`returns "${restriction.message}" for code ${restriction.code}`, async () => {
          expect(
            await instance.messageForTransferRestriction.staticCall(
              restriction.code,
            ),
          ).to.equal(restriction.message);
        });
      }
    });

    describe('#transfer(address,uint256)', () => {
      describe('reverts if', () => {
        it('transfer is restricted');
      });
    });
  });
}
