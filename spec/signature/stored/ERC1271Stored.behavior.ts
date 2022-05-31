import { describeBehaviorOfERC1271Base } from '../base/ERC1271Base.behavior';
import { describeFilter } from '@solidstate/library';
import { IERC1271Stored } from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

export interface ERC1271StoredBehaviorArgs {
  getValidParams: () => Promise<[Uint8Array, Uint8Array]>;
}

export function describeBehaviorOfERC1271Stored(
  deploy: () => Promise<IERC1271Stored>,
  { getValidParams }: ERC1271StoredBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1271Stored', function () {
    describeBehaviorOfERC1271Base(
      deploy,
      {
        getValidParams,
        getInvalidParams: async () => [
          ethers.utils.randomBytes(32),
          ethers.utils.randomBytes(0),
        ],
      },
      skips,
    );
  });
}
