import { expect } from 'chai';
import { describeFilter } from '@solidstate/library';
import { ERC721Metadata } from '../../../typechain';

interface ERC721MetadataBehaviorArgs {
  deploy: () => Promise<ERC721Metadata>;
  name: string;
  symbol: string;
  tokenURI: string;
}

export function describeBehaviorOfERC721Metadata(
  { deploy, name, symbol, tokenURI }: ERC721MetadataBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC721Metadata', function () {
    let instance: ERC721Metadata;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#name', function () {
      it('returns token name', async function () {
        expect(await instance.callStatic['name()']()).to.equal(name);
      });
    });

    describe('#symbol', function () {
      it('returns token symbol', async function () {
        expect(await instance.callStatic['symbol()']()).to.equal(symbol);
      });
    });

    describe('#tokenURI', function () {
      it('returns empty string if neither base URI nor token URI is set');

      it('returns stored token URI if base URI is not set');

      it('returns concatenation of base URI and token URI if both are set');

      it(
        'returns concatenation of base URI and token ID if only base URI is set',
      );
    });
  });
}
