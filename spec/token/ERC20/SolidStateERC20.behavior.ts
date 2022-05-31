import { describeBehaviorOfERC20Base } from './ERC20Base.behavior';
import { describeBehaviorOfERC20Extended } from './ERC20Extended.behavior';
import { describeBehaviorOfERC20Metadata } from './ERC20Metadata.behavior';
import { describeFilter } from '@solidstate/library';
import { ISolidStateERC20 } from '@solidstate/typechain-types';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

export interface SolidStateERC20BehaviorArgs {
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  allowance: (holder: string, spender: string) => Promise<BigNumber>;
  name: string;
  symbol: string;
  decimals: BigNumberish;
  supply: BigNumber;
}

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
