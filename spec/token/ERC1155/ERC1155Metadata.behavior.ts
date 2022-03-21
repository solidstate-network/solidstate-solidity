import { expect } from 'chai';
import { describeFilter } from '@solidstate/library';
import { ERC1155Metadata } from '../../../typechain';

interface ERC1155MetadataBehaviorArgs {
  deploy: () => Promise<ERC1155Metadata>;
  tokenURI: string;
}

export function describeBehaviorOfERC1155Metadata(
  { deploy, tokenURI }: ERC1155MetadataBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC1155Metadata', function () {
    let instance: ERC1155Metadata;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#uri(uint256)', function () {
      it('returns empty string if neither base URI nor token URI is set');

      it('returns stored token URI if base URI is not set');

      it('returns concatenation of base URI and token URI if both are set');

      it(
        'returns concatenation of base URI and token ID if only base URI is set',
      );
    });
  });
}
