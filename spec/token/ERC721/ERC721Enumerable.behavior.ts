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
}

export function describeBehaviorOfERC721Enumerable(
  { deploy, mint, burn }: ERC721EnumerableBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC721Enumerable', function () {
    let instance: ERC721Enumerable;

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#totalSupply', function () {
      it('todo');
    });

    describe('#tokenOfOwnerByIndex', function () {
      it('todo');
    });

    describe('#tokenByIndex', function () {
      it('todo');
    });
  });
}
