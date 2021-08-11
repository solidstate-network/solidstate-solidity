import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfERC721Base } from './ERC721Base.behavior';
import { describeBehaviorOfERC721Extended } from './ERC721Extended.behavior';
import { describeBehaviorOfERC721Metadata } from './ERC721Metadata.behavior';
import { ERC721 } from '../../../typechain';
import { BigNumber, ContractTransaction } from 'ethers';

interface ERC721BehaviorArgs {
  deploy: () => Promise<ERC721>;
  mint: (address: string, tokenId: BigNumber) => Promise<ContractTransaction>;
  burn: (tokenId: BigNumber) => Promise<ContractTransaction>;
  name: string;
  symbol: string;
  tokenURI: string;
}

export function describeBehaviorOfERC721(
  { deploy, mint, burn, name, symbol, tokenURI }: ERC721BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC721', function () {
    describeBehaviorOfERC721Base(
      {
        deploy,
        mint,
        burn,
      },
      skips,
    );

    describeBehaviorOfERC721Extended(
      {
        deploy,
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