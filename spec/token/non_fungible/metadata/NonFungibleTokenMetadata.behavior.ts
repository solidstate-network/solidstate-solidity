import { describeFilter } from '@solidstate/library';
import { INonFungibleTokenMetadata } from '@solidstate/typechain-types';
import { expect } from 'chai';
import type { NetworkConnection } from 'hardhat/types/network';

export interface NonFungibleTokenMetadataBehaviorArgs {
  name: string;
  symbol: string;
  baseURI: string;
}

export function describeBehaviorOfNonFungibleTokenMetadata(
  connection: NetworkConnection,
  deploy: () => Promise<INonFungibleTokenMetadata>,
  args: NonFungibleTokenMetadataBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::NonFungibleTokenMetadata', () => {
    let instance: INonFungibleTokenMetadata;

    beforeEach(async () => {
      instance = await deploy();
    });

    // TODO: enable for compositions that include ERC165
    // describeBehaviorOfIntrospectable(
    //   connection,
    //   deploy,
    //   {
    //     interfaceIds: ['0x5b5e139f'],
    //   },
    //   skips,
    // );

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
