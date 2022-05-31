import {
  describeBehaviorOfERC20Base,
  ERC20BaseBehaviorArgs,
} from './ERC20Base.behavior';
import {
  describeBehaviorOfERC20Extended,
  ERC20ExtendedBehaviorArgs,
} from './ERC20Extended.behavior';
import {
  describeBehaviorOfERC20Metadata,
  ERC20MetadataBehaviorArgs,
} from './ERC20Metadata.behavior';
import { describeFilter } from '@solidstate/library';
import { ISolidStateERC20 } from '@solidstate/typechain-types';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

export interface SolidStateERC20BehaviorArgs
  extends ERC20BaseBehaviorArgs,
    ERC20ExtendedBehaviorArgs,
    ERC20MetadataBehaviorArgs {}

export function describeBehaviorOfSolidStateERC20(
  deploy: () => Promise<ISolidStateERC20>,
  {
    mint,
    burn,
    name,
    allowance,
    symbol,
    decimals,
    supply,
  }: SolidStateERC20BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidStateERC20', function () {
    describeBehaviorOfERC20Base(
      deploy,
      {
        mint,
        burn,
        supply,
      },
      skips,
    );

    describeBehaviorOfERC20Extended(
      deploy,
      {
        mint,
        burn,
        allowance,
        supply,
      },
      skips,
    );

    describeBehaviorOfERC20Metadata(
      deploy,
      {
        name,
        symbol,
        decimals,
      },
      skips,
    );
  });
}
