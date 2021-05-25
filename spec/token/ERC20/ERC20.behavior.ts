import { describeFilter } from '@solidstate/library/mocha_describe_filter';
import { describeBehaviorOfERC20Base } from './ERC20Base.behavior';
import { describeBehaviorOfERC20Extended } from './ERC20Extended.behavior';
import { describeBehaviorOfERC20Metadata } from './ERC20Metadata.behavior';
import { ERC20 } from '../../../typechain';
import { ethers } from 'hardhat';

interface ERC20BehaviorArgs {
  deploy: () => Promise<ERC20>;
  mint: (address: string, amount: ethers.BigNumber) => Promise<void>;
  burn: (address: string, amount: ethers.BigNumber) => Promise<void>;
  name: string;
  symbol: string;
  decimals: ethers.BigNumber;
  supply: ethers.BigNumber;
}

export function describeBehaviorOfERC20(
  { deploy, mint, burn, name, symbol, decimals, supply }: ERC20BehaviorArgs,
  skips: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20', function () {
    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC20Base(
      {
        deploy,
        mint,
        burn,
        supply,
      },
      skips,
    );

    // eslint-disable-next-line mocha/no-setup-in-describe
    describeBehaviorOfERC20Extended(
      {
        deploy,
        mint,
        burn,
        supply,
      },
      ['::ERC20Base', ...skips],
    );

    // eslint-disable-next-line mocha/no-setup-in-describe
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
