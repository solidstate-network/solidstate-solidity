import { describeFilter } from '@solidstate/library';
import { IERC721Metadata } from '@solidstate/typechain-types';
import { expect } from 'chai';

export interface ERC721MetadataBehaviorArgs {
  name: string;
  symbol: string;
  tokenURI: string;
}

export function describeBehaviorOfERC721Metadata(
  deploy: () => Promise<IERC721Metadata>,
  { name, symbol, tokenURI }: ERC721MetadataBehaviorArgs,
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
        expect(await instance.name.staticCall()).to.equal(name);
      });
    });

    describe('#symbol()', () => {
      it('returns token symbol', async () => {
        expect(await instance.symbol.staticCall()).to.equal(symbol);
      });
    });

    describe('#tokenURI(uint256)', () => {
      it('returns empty string if neither base URI nor token URI is set');

      it('returns stored token URI if base URI is not set');

      it('returns concatenation of base URI and token URI if both are set');

      it(
        'returns concatenation of base URI and token ID if only base URI is set',
      );
    });
  });
}
