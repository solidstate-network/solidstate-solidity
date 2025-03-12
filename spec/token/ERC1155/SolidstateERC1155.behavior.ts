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
import { describeFilter } from '@solidstate/library';
import { ISolidstateERC1155 } from '@solidstate/typechain-types';

export interface SolidstateERC1155BehaviorArgs
  extends ERC1155BaseBehaviorArgs,
    ERC1155EnumerableBehaviorArgs,
    ERC1155MetadataBehaviorArgs {}

export function describeBehaviorOfSolidstateERC1155(
  deploy: () => Promise<ISolidstateERC1155>,
  args: SolidstateERC1155BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidstateERC1155', () => {
    describeBehaviorOfERC1155Base(deploy, args, skips);

    describeBehaviorOfERC1155Enumerable(deploy, args, skips);

    describeBehaviorOfERC1155Metadata(deploy, args, skips);
  });
}
