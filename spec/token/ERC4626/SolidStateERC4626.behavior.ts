import { IERC20, SolidStateERC4626 } from '../../../typechain';
import { describeBehaviorOfSolidStateERC20 } from '../ERC20';
import { describeBehaviorOfERC4626Base } from './ERC4626Base.behavior';
import { describeFilter } from '@solidstate/library';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

interface SolidStateERC4626BehaviorArgs {
  deploy: () => Promise<SolidStateERC4626>;
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

export function describeBehaviorOfSolidStateERC4626(
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
