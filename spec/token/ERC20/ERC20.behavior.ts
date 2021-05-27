import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfERC20Base } from './ERC20Base.behavior';
import { describeBehaviorOfERC20Extended } from './ERC20Extended.behavior';
import { describeBehaviorOfERC20Metadata } from './ERC20Metadata.behavior';
import { ERC20 } from '../../typechain';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

interface ERC20BehaviorArgs {
  deploy: () => Promise<ERC20>;
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  name: string;
  symbol: string;
  decimals: BigNumberish;
  supply: BigNumber;
}

export function describeBehaviorOfERC20(
  { deploy, mint, burn, name, symbol, decimals, supply }: ERC20BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20', function () {
    describeBehaviorOfERC20Base(
      {
        deploy,
        mint,
        burn,
        supply,
      },
      skips,
    );

    describeBehaviorOfERC20Extended(
      {
        deploy,
        mint,
        burn,
        supply,
      },
      ['::ERC20Base', ...(skips ?? [])],
    );

    describeBehaviorOfERC20Metadata(
      {
        deploy,
        name,
        symbol,
        decimals,
      },
      skips,
    );
  });
}
