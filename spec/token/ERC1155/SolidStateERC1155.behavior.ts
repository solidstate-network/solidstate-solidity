import {
  describeBehaviorOfERC1155Base,
  ERC1155BaseBehaviorArgs,
} from './ERC1155Base.behavior';
import {
  describeBehaviorOfERC1155Enumerable,
  ERC1155EnumerableBehaviorArgs,
} from './ERC1155Enumerable.behavior';
import {
  describeBehaviorOfERC1155Metadata,
  ERC1155MetadataBehaviorArgs,
} from './ERC1155Metadata.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { ISolidStateERC1155 } from '@solidstate/typechain-types';
import { BigNumber, ContractTransaction } from 'ethers';

export interface SolidStateERC1155BehaviorArgs
  extends ERC1155BaseBehaviorArgs,
    ERC1155EnumerableBehaviorArgs,
    ERC1155MetadataBehaviorArgs {}

export function describeBehaviorOfSolidStateERC1155(
  deploy: () => Promise<ISolidStateERC1155>,
  { transfer, mint, burn, tokenId, tokenURI }: SolidStateERC1155BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidStateERC1155', function () {
    describeBehaviorOfERC1155Base(deploy, { mint, burn, tokenId }, skips);

    describeBehaviorOfERC1155Enumerable(deploy, {
      transfer,
      mint,
      burn,
    });

    describeBehaviorOfERC1155Metadata(deploy, {
      tokenURI,
    });
  });
}
