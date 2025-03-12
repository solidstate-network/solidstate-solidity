import { describeFilter } from '@solidstate/library';
import { IERC721Metadata } from '@solidstate/typechain-types';
import { expect } from 'chai';

export interface ERC721MetadataBehaviorArgs {
  name: string;
  symbol: string;
  baseURI: string;
}

export function describeBehaviorOfERC721Metadata(
  deploy: () => Promise<IERC721Metadata>,
  args: ERC721MetadataBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC721Metadata', () => {
    let instance: IERC721Metadata;

    beforeEach(async () => {
      instance = await deploy();
    });

    describe('#name()', () => {
      it('returns token name', async () => {
        expect(await instance.name.staticCall()).to.equal(args.name);
      });
    });

    describe('#symbol()', () => {
      it('returns token symbol', async () => {
        expect(await instance.symbol.staticCall()).to.equal(args.symbol);
      });
    });

    describe('#tokenURI(uint256)', () => {
      it('todo');
    });
  });
}
