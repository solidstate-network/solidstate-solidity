import {
  describeBehaviorOfSolidStateERC20,
  SolidStateERC20BehaviorArgs,
} from '../ERC20';
import {
  describeBehaviorOfERC1404Base,
  ERC1404BaseBehaviorArgs,
} from './ERC1404Base.behavior';
import { describeFilter } from '@solidstate/library';
import { ISolidStateERC1404 } from '@solidstate/typechain-types';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

export interface SolidStateERC1404BehaviorArgs
  extends SolidStateERC20BehaviorArgs,
    ERC1404BaseBehaviorArgs {}

export function describeBehaviorOfSolidStateERC1404(
  deploy: () => Promise<ISolidStateERC1404>,
  {
    mint,
    burn,
    allowance,
    restrictions,
    name,
    symbol,
    decimals,
    supply,
  }: SolidStateERC1404BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidStateERC1404', function () {
    describeBehaviorOfSolidStateERC20(
      deploy,
      {
        mint,
        burn,
        allowance,
        name,
        symbol,
        decimals,
        supply,
      },
      skips,
    );

    describeBehaviorOfERC1404Base(
      deploy,
      {
        restrictions,
        mint,
        burn,
        supply,
      },
      ['::ERC20Base', ...(skips ?? [])],
    );
  });
}
