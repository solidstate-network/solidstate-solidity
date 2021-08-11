import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfERC721Base } from './ERC721Base.behavior';
import { describeBehaviorOfERC721Enumerable } from './ERC721Enumerable.behavior';
import { describeBehaviorOfERC721Metadata } from './ERC721Metadata.behavior';
import { ERC721 } from '../../../typechain';
import { BigNumber, ContractTransaction } from 'ethers';

interface ERC721BehaviorArgs {
  deploy: () => Promise<ERC721>;
  mint: (address: string, tokenId: BigNumber) => Promise<ContractTransaction>;
  burn: (tokenId: BigNumber) => Promise<ContractTransaction>;
  supply: BigNumber,
  name: string;
  symbol: string;
  tokenURI: string;
}

export function describeBehaviorOfERC721(
  { deploy, supply, mint, burn, name, symbol, tokenURI }: ERC721BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC721', function () {
    describeBehaviorOfERC721Base(
      {
        deploy,
        supply,
        mint,
        burn,
      },
      skips,
    );

    describeBehaviorOfERC721Enumerable(
      {
        deploy,
        supply,
        mint,
        burn,
      },
      ['::ERC721Base', ...(skips ?? [])],
    );

    describeBehaviorOfERC721Metadata(
      {
        deploy,
        name,
        symbol,
        tokenURI,
      },
      skips,
    );
  });
}
