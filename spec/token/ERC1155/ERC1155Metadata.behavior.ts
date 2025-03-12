import { describeFilter } from '@solidstate/library';
import { IERC1155Metadata } from '@solidstate/typechain-types';
import { expect } from 'chai';

export interface ERC1155MetadataBehaviorArgs {
  baseURI: string;
}

export function describeBehaviorOfERC1155Metadata(
  deploy: () => Promise<IERC1155Metadata>,
  args: ERC1155MetadataBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1155Metadata', () => {
    let instance: IERC1155Metadata;

    beforeEach(async () => {
      instance = await deploy();
    });

    describe('#uri(uint256)', () => {
      it('todo');
    });
  });
}
