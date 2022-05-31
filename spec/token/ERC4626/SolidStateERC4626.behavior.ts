import { describeBehaviorOfSolidStateERC20 } from '../ERC20';
import { describeBehaviorOfERC4626Base } from './ERC4626Base.behavior';
import { describeFilter } from '@solidstate/library';
import { IERC20, ISolidStateERC4626 } from '@solidstate/typechain-types';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

export interface SolidStateERC4626BehaviorArgs {
  deploy: () => Promise<ISolidStateERC4626>;
  getAsset: () => Promise<IERC20>;
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  allowance: (holder: string, spender: string) => Promise<BigNumber>;
  mintAsset: (
    address: string,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
  name: string;
  symbol: string;
  decimals: BigNumberish;
  supply: BigNumber;
}

export function describeBehaviorOfSolidStateERC4626(
  {
    deploy,
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
      {
        deploy,
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
