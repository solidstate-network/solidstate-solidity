import { describeBehaviorOfSolidStateERC20 } from '../ERC20';
import { describeBehaviorOfERC1404Base } from './ERC1404Base.behavior';
import { describeFilter } from '@solidstate/library';
import { ISolidStateERC1404 } from '@solidstate/typechain-types';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

export interface SolidStateERC1404BehaviorArgs {
  deploy: () => Promise<ISolidStateERC1404>;
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  allowance: (holder: string, spender: string) => Promise<BigNumber>;
  restrictions: any;
  name: string;
  symbol: string;
  decimals: BigNumberish;
  supply: BigNumber;
}

export function describeBehaviorOfSolidStateERC1404(
  {
    deploy,
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

    describeBehaviorOfERC1404Base(
      {
        deploy,
        restrictions,
        mint,
        burn,
        supply,
      },
      ['::ERC20Base', ...(skips ?? [])],
    );
  });
}
