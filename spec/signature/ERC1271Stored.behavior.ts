import { describeFilter } from '@solidstate/library';
import { ERC1271Stored } from '@solidstate/typechain';
import { describeBehaviorOfERC1271Base } from './ERC1271Base.behavior';
import { ethers } from 'hardhat';

interface ERC1271OwnableBehaviorArgs {
  deploy: () => Promise<ERC1271Stored>;
  getValidParams: () => Promise<[Uint8Array, Uint8Array]>;
}

export function describeBehaviorOfERC1271Stored(
  { deploy, getValidParams }: ERC1271OwnableBehaviorArgs,
  skips: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1271Stored', function () {
    describeBehaviorOfERC1271Base(
      {
        deploy,
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
