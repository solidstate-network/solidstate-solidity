import { describeFilter } from '@solidstate/library';
import { IERC20Metadata } from '@solidstate/typechain-types';
import { expect } from 'chai';

export interface ERC20MetadataBehaviorArgs {
  name: string;
  symbol: string;
  decimals: bigint;
}

export function describeBehaviorOfERC20Metadata(
  deploy: () => Promise<IERC20Metadata>,
  { name, symbol, decimals }: ERC20MetadataBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC20Metadata', () => {
    let instance: IERC20Metadata;

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

    describe('#decimals()', () => {
      it('returns token decimals', async () => {
        expect(await instance.decimals.staticCall()).to.equal(decimals);
      });
    });
  });
}
