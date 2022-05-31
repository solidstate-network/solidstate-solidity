import {
  describeBehaviorOfSolidStateERC20,
  SolidStateERC20BehaviorArgs,
} from '../ERC20';
import {
  describeBehaviorOfERC4626Base,
  ERC4626BaseBehaviorArgs,
} from './ERC4626Base.behavior';
import { describeFilter } from '@solidstate/library';
import { IERC20, ISolidStateERC4626 } from '@solidstate/typechain-types';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

export interface SolidStateERC4626BehaviorArgs
  extends SolidStateERC20BehaviorArgs,
    ERC4626BaseBehaviorArgs {}

export function describeBehaviorOfSolidStateERC4626(
  deploy: () => Promise<ISolidStateERC4626>,
  {
    getAsset,
    mint,
    burn,
    allowance,
    mintAsset,
    name,
    symbol,
    decimals,
    supply,
  }: SolidStateERC4626BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidStateERC4626', function () {
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

    describeBehaviorOfERC4626Base(
      deploy,
      {
        getAsset,
        mint,
        burn,
        mintAsset,
        supply,
      },
      ['::ERC20Base', ...(skips ?? [])],
    );
  });
}
