import { describeFilter } from '@solidstate/library/mocha_describe_filter';
import { describeBehaviorOfERC20 } from '../ERC20/ERC20.behavior';
import { describeBehaviorOfERC1404Base } from './ERC1404Base.behavior';
import { ERC1404 } from '../../../typechain';
import { ethers } from 'hardhat';

interface ERC1404BehaviorArgs {
  deploy: () => Promise<ERC1404>;
  mint: (address: string, amount: ethers.BigNumber) => Promise<void>;
  burn: (address: string, amount: ethers.BigNumber) => Promise<void>;
  restrictions: any;
  name: string;
  symbol: string;
  decimals: ethers.BigNumber;
  supply: ethers.BigNumber;
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
    // eslint-disable-next-line mocha/no-setup-in-describe
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

    // eslint-disable-next-line mocha/no-setup-in-describe
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
