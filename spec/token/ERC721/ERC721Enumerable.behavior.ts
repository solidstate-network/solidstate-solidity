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
  supply: BigNumber,
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

    describe('#totalSupply', function () {
      it('returns total token supply', async function () {
        expect(await instance.totalSupply()).to.equal(supply);

        await mint(instance.address, ethers.constants.Two);
        expect(await instance.totalSupply()).to.equal(supply.add(ethers.constants.One));

        await burn(ethers.constants.Two);
        expect(await instance.totalSupply()).to.equal(supply);
      });
    });

    describe('#tokenOfOwnerByIndex', function () {
      it('todo');
    });

    describe('#tokenByIndex', function () {
      it('todo');
    });
  });
}
