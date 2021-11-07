import { describeFilter } from '@solidstate/library';
import { ERC1155 } from '../../../typechain';
import { describeBehaviorOfERC1155Base } from './ERC1155Base.behavior';
import { describeBehaviorOfERC1155Enumerable } from './ERC1155Enumerable.behavior';
import { describeBehaviorOfERC1155Metadata } from './ERC1155Metadata.behavior';
import { BigNumber, ContractTransaction } from 'ethers';

interface ERC1155BehaviorArgs {
  deploy: () => Promise<ERC1155>;
  mint: (
    address: string,
    id: BigNumber,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
  burn: (
    address: string,
    id: BigNumber,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
  tokenId?: BigNumber;
  tokenURI: string;
}

export function describeBehaviorOfERC1155(
  { deploy, mint, burn, tokenId, tokenURI }: ERC1155BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1155', function () {
    describeBehaviorOfERC1155Base({ deploy, mint, burn, tokenId }, skips);

    describeBehaviorOfERC1155Enumerable({
      deploy,
      mint,
      burn,
    });

    describeBehaviorOfERC1155Metadata({
      deploy,
      tokenURI,
    });
  });
}
