import { describeBehaviorOfERC20 } from '../ERC20';
import { describeBehaviorOfERC4626Base } from './ERC4626Base.behavior';
import { describeFilter } from '@solidstate/library';
import { IERC20, ERC4626 } from '@solidstate/typechain-types';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

interface ERC4626BehaviorArgs {
  deploy: () => Promise<ERC4626>;
  getAsset: () => Promise<IERC20>;
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  mintAsset: (
    address: string,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
  name: string;
  symbol: string;
  decimals: BigNumberish;
  supply: BigNumber;
}

export function describeBehaviorOfERC4626(
  {
    deploy,
    getAsset,
    mint,
    burn,
    mintAsset,
    name,
    symbol,
    decimals,
    supply,
  }: ERC4626BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC4626', function () {
    describeBehaviorOfERC20(
      {
        deploy,
        mint,
        burn,
        name,
        symbol,
        decimals,
        supply,
      },
      skips,
    );

    describeBehaviorOfERC4626Base(
      {
        deploy,
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
