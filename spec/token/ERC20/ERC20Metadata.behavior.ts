import { describeFilter } from '@solidstate/library';
import { IERC20Metadata } from '@solidstate/typechain-types';
import { expect } from 'chai';

export interface ERC20MetadataBehaviorArgs {
  name: string;
  symbol: string;
  decimals: BigInt;
}

export function describeBehaviorOfERC20Metadata(
  deploy: () => Promise<IERC20Metadata>,
  { name, symbol, decimals }: ERC20MetadataBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20Metadata', function () {
    let instance: IERC20Metadata;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#name()', function () {
      it('returns token name', async function () {
        expect(await instance.name.staticCall()).to.equal(name);
      });
    });

    describe('#symbol()', function () {
      it('returns token symbol', async function () {
        expect(await instance.symbol.staticCall()).to.equal(symbol);
      });
    });

    describe('#decimals()', function () {
      it('returns token decimals', async function () {
        expect(await instance.decimals.staticCall()).to.equal(decimals);
      });
    });
  });
}
