import { describeBehaviorOfERC1155Base } from './ERC1155Base.behavior';
import { describeBehaviorOfERC1155Enumerable } from './ERC1155Enumerable.behavior';
import { describeBehaviorOfERC1155Metadata } from './ERC1155Metadata.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { ERC1155 } from '@solidstate/typechain-types';
import { BigNumber, ContractTransaction } from 'ethers';

interface ERC1155BehaviorArgs {
  deploy: () => Promise<ERC1155>;
  transfer: (
    from: SignerWithAddress,
    to: SignerWithAddress,
    id: BigNumber,
    amount: BigNumber,
  ) => Promise<ContractTransaction>;
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
  { deploy, transfer, mint, burn, tokenId, tokenURI }: ERC1155BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1155', function () {
    describeBehaviorOfERC1155Base({ deploy, mint, burn, tokenId }, skips);

    describeBehaviorOfERC1155Enumerable({
      deploy,
      transfer,
      mint,
      burn,
    });

    describeBehaviorOfERC1155Metadata({
      deploy,
      tokenURI,
    });
  });
}
