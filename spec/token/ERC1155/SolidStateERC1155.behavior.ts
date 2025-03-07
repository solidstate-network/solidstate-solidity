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

export interface SolidStateERC1155BehaviorArgs
  extends ERC1155BaseBehaviorArgs,
    ERC1155EnumerableBehaviorArgs,
    ERC1155MetadataBehaviorArgs {}

export function describeBehaviorOfSolidStateERC1155(
  deploy: () => Promise<ISolidStateERC1155>,
  args: SolidStateERC1155BehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::SolidStateERC1155', () => {
    describeBehaviorOfERC1155Base(deploy, args, skips);

    describeBehaviorOfERC1155Enumerable(deploy, args, skips);

    describeBehaviorOfERC1155Metadata(deploy, args, skips);
  });
}
