import { expect } from 'chai';
import { describeFilter } from '@solidstate/library';
import { ethers } from 'hardhat';
import { ERC721Enumerable } from '../../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, ContractTransaction } from 'ethers';

interface ERC721EnumerableBehaviorArgs {
  deploy: () => Promise<ERC721Enumerable>;
  mint: (address: string, tokenId: BigNumber) => Promise<ContractTransaction>;
  burn: (tokenId: BigNumber) => Promise<ContractTransaction>;
  supply: BigNumber;
}

export function describeBehaviorOfERC721Enumerable(
  { deploy, mint, burn, supply }: ERC721EnumerableBehaviorArgs,
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

        await mint(instance.address, ethers.constants.Two);
        expect(await instance.totalSupply()).to.equal(
          supply.add(ethers.constants.One),
        );

        await burn(ethers.constants.Two);
        expect(await instance.totalSupply()).to.equal(supply);
      });
    });

    describe('#tokenOfOwnerByIndex(address,uint256)', function () {
      it('returns token id held by given account at given index', async function () {
        // TODO: query balance to determine starting index

        await expect(
          instance.callStatic.tokenOfOwnerByIndex(
            instance.address,
            ethers.constants.Zero,
          ),
        ).to.be.revertedWith('EnumerableSet: index out of bounds');

        await expect(
          instance.callStatic.tokenOfOwnerByIndex(
            instance.address,
            ethers.constants.One,
          ),
        ).to.be.revertedWith('EnumerableSet: index out of bounds');

        await mint(instance.address, ethers.constants.One);
        await mint(instance.address, ethers.constants.Two);

        expect(
          await instance.callStatic.tokenOfOwnerByIndex(
            instance.address,
            ethers.constants.Zero,
          ),
        ).to.equal(ethers.constants.One);

        expect(
          await instance.callStatic.tokenOfOwnerByIndex(
            instance.address,
            ethers.constants.One,
          ),
        ).to.equal(ethers.constants.Two);
      });
    });

    describe('#tokenByIndex(uint256)', function () {
      it('returns token id held globally at given index', async function () {
        const index = await instance.callStatic.totalSupply();

        await expect(
          instance.callStatic.tokenByIndex(index.add(ethers.constants.Zero)),
        ).to.be.revertedWith('EnumerableMap: index out of bounds');

        await expect(
          instance.callStatic.tokenByIndex(index.add(ethers.constants.One)),
        ).to.be.revertedWith('EnumerableMap: index out of bounds');

        // TODO: mint to different addresses
        await mint(instance.address, ethers.constants.One);
        await mint(instance.address, ethers.constants.Two);

        expect(
          await instance.callStatic.tokenByIndex(
            index.add(ethers.constants.Zero),
          ),
        ).to.equal(ethers.constants.One);

        expect(
          await instance.callStatic.tokenByIndex(
            index.add(ethers.constants.One),
          ),
        ).to.equal(ethers.constants.Two);
      });
    });
  });
}
