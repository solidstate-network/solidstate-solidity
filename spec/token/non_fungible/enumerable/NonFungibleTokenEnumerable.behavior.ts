import { describeFilter } from '@solidstate/library';
import { NonFungibleTokenEnumerable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ContractTransactionResponse } from 'ethers';

export interface NonFungibleTokenEnumerableBehaviorArgs {
  mint: (
    address: string,
    tokenId: bigint,
  ) => Promise<ContractTransactionResponse>;
  burn: (tokenId: bigint) => Promise<ContractTransactionResponse>;
  supply: bigint;
}

export function describeBehaviorOfNonFungibleTokenEnumerable(
  deploy: () => Promise<NonFungibleTokenEnumerable>,
  args: NonFungibleTokenEnumerableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::NonFungibleTokenEnumerable', () => {
    let instance: NonFungibleTokenEnumerable;

    beforeEach(async () => {
      instance = await deploy();
    });

    // TODO: enable for compositions that include ERC165
    // describeBehaviorOfIntrospectable(
    //   deploy,
    //   {
    //     interfaceIds: ['0x780e9d63'],
    //   },
    //   skips,
    // );

    describe('#totalSupply()', () => {
      it('returns total token supply', async () => {
        expect(await instance.totalSupply()).to.equal(args.supply);

        await args.mint(await instance.getAddress(), 2n);
        expect(await instance.totalSupply()).to.equal(args.supply + 1n);

        await args.burn(2n);
        expect(await instance.totalSupply()).to.equal(args.supply);
      });
    });

    describe('#tokenOfOwnerByIndex(address,uint256)', () => {
      it('returns token id held by given account at given index', async () => {
        // TODO: query balance to determine starting index

        await expect(
          instance.tokenOfOwnerByIndex.staticCall(
            await instance.getAddress(),
            0,
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'EnumerableSet__IndexOutOfBounds',
        );

        await expect(
          instance.tokenOfOwnerByIndex.staticCall(
            await instance.getAddress(),
            1,
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'EnumerableSet__IndexOutOfBounds',
        );

        await args.mint(await instance.getAddress(), 1n);
        await args.mint(await instance.getAddress(), 2n);

        expect(
          await instance.tokenOfOwnerByIndex.staticCall(
            await instance.getAddress(),
            0,
          ),
        ).to.equal(1);

        expect(
          await instance.tokenOfOwnerByIndex.staticCall(
            await instance.getAddress(),
            1,
          ),
        ).to.equal(2);
      });
    });

    describe('#tokenByIndex(uint256)', () => {
      it('returns token id held globally at given index', async () => {
        const index = await instance.totalSupply.staticCall();

        await expect(
          instance.tokenByIndex.staticCall(index),
        ).to.be.revertedWithCustomError(
          instance,
          'EnumerableMap__IndexOutOfBounds',
        );

        await expect(
          instance.tokenByIndex.staticCall(index + 1n),
        ).to.be.revertedWithCustomError(
          instance,
          'EnumerableMap__IndexOutOfBounds',
        );

        // TODO: mint to different addresses
        await args.mint(await instance.getAddress(), 1n);
        await args.mint(await instance.getAddress(), 2n);

        expect(await instance.tokenByIndex.staticCall(index)).to.equal(1);

        expect(await instance.tokenByIndex.staticCall(index + 1n)).to.equal(2);
      });
    });
  });
}
