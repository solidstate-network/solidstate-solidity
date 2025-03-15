import { describeFilter } from '@solidstate/library';
import { IFungibleTokenMetadata } from '@solidstate/typechain-types';
import { expect } from 'chai';

export interface FungibleTokenMetadataBehaviorArgs {
  name: string;
  symbol: string;
  decimals: bigint;
}

export function describeBehaviorOfFungibleTokenMetadata(
  deploy: () => Promise<IFungibleTokenMetadata>,
  args: FungibleTokenMetadataBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::FungibleTokenMetadata', () => {
    let instance: IFungibleTokenMetadata;

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

    describe('#decimals()', () => {
      it('returns token decimals', async () => {
        expect(await instance.decimals.staticCall()).to.equal(args.decimals);
      });
    });
  });
}
