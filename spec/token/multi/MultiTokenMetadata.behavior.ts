import { describeFilter } from '@solidstate/library';
import { IMultiTokenMetadata } from '@solidstate/typechain-types';
import { expect } from 'chai';

export interface MultiTokenMetadataBehaviorArgs {
  baseURI: string;
}

export function describeBehaviorOfMultiTokenMetadata(
  deploy: () => Promise<IMultiTokenMetadata>,
  args: MultiTokenMetadataBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::MultiTokenMetadata', () => {
    let instance: IMultiTokenMetadata;

    beforeEach(async () => {
      instance = await deploy();
    });

    // TODO: enable for compositions that include ERC165
    // describeBehaviorOfIntrospectable(
    //   deploy,
    //   {
    //     interfaceIds: ['0x0e89341c'],
    //   },
    //   skips,
    // );

    describe('#uri(uint256)', () => {
      it('todo');
    });
  });
}
