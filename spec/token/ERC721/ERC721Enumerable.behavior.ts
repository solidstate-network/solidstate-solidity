import { describeFilter } from '@solidstate/library';
import { ERC721Enumerable } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';

export interface ERC721EnumerableBehaviorArgs {
  mint: (
    address: string,
    tokenId: BigNumber | BigNumberish,
  ) => Promise<ContractTransaction>;
  burn: (tokenId: BigNumber | BigNumberish) => Promise<ContractTransaction>;
  supply: BigNumber | BigNumberish;
}

export function describeBehaviorOfERC721Enumerable(
  deploy: () => Promise<ERC721Enumerable>,
  { mint, burn, supply }: ERC721EnumerableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC721Enumerable', function () {
    let instance: ERC721Enumerable;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#totalSupply()', function () {
      it('returns total token supply', async function () {
        expect(await instance.totalSupply()).to.equal(supply);

        await mint(instance.address, 2);
        expect(await instance.totalSupply()).to.equal(
          BigNumber.from(supply).add(1),
        );

        await burn(2);
        expect(await instance.totalSupply()).to.equal(supply);
      });
    });

    describe('#tokenOfOwnerByIndex(address,uint256)', function () {
      it('returns token id held by given account at given index', async function () {
        // TODO: query balance to determine starting index

        await expect(
          instance.callStatic.tokenOfOwnerByIndex(instance.address, 0),
        ).to.be.revertedWithCustomError(
          instance,
          'EnumerableSet__IndexOutOfBounds',
        );

        await expect(
          instance.callStatic.tokenOfOwnerByIndex(instance.address, 1),
        ).to.be.revertedWithCustomError(
          instance,
          'EnumerableSet__IndexOutOfBounds',
        );

        await mint(instance.address, 1);
        await mint(instance.address, 2);

        expect(
          await instance.callStatic.tokenOfOwnerByIndex(instance.address, 0),
        ).to.equal(1);

        expect(
          await instance.callStatic.tokenOfOwnerByIndex(instance.address, 1),
        ).to.equal(2);
      });
    });

    describe('#tokenByIndex(uint256)', function () {
      it('returns token id held globally at given index', async function () {
        const index = await instance.callStatic.totalSupply();

        await expect(
          instance.callStatic.tokenByIndex(index.add(0)),
        ).to.be.revertedWithCustomError(
          instance,
          'EnumerableMap__IndexOutOfBounds',
        );

        await expect(
          instance.callStatic.tokenByIndex(index.add(1)),
        ).to.be.revertedWithCustomError(
          instance,
          'EnumerableMap__IndexOutOfBounds',
        );

        // TODO: mint to different addresses
        await mint(instance.address, 1);
        await mint(instance.address, 2);

        expect(await instance.callStatic.tokenByIndex(index.add(0))).to.equal(
          1,
        );

        expect(await instance.callStatic.tokenByIndex(index.add(1))).to.equal(
          2,
        );
      });
    });
  });
}
