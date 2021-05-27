import { describeFilter } from '@solidstate/library/mocha_describe_filter';
import { describeBehaviorOfERC20 } from '../ERC20/ERC20.behavior';
import { describeBehaviorOfERC1404Base } from './ERC1404Base.behavior';
import { ERC1404 } from '@solidstate/typechain';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

interface ERC1404BehaviorArgs {
  deploy: () => Promise<ERC1404>;
  mint: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  burn: (address: string, amount: BigNumber) => Promise<ContractTransaction>;
  restrictions: any;
  name: string;
  symbol: string;
  decimals: BigNumberish;
  supply: BigNumber;
}

export function describeBehaviorOfERC1404(
  {
    deploy,
    mint,
    burn,
    restrictions,
    name,
    symbol,
    decimals,
    supply,
  }: ERC1404BehaviorArgs,
  skips: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1404', function () {
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

    describeBehaviorOfERC1404Base(
      {
        deploy,
        restrictions,
        mint,
        burn,
        supply,
      },
      ['::ERC20Base', ...skips],
    );
  });
}
