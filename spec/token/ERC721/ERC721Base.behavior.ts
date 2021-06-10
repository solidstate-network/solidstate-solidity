import { expect } from 'chai';
import { describeFilter } from '@solidstate/library';
import { ethers } from 'hardhat';
import { ERC721Base } from '../../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, ContractTransaction } from 'ethers';

interface ERC721BaseBehaviorArgs {
  deploy: () => Promise<ERC721Base>;
  supply: BigNumber;
  mint: (address: string, tokenId: BigNumber) => Promise<ContractTransaction>;
  burn: (tokenId: BigNumber) => Promise<ContractTransaction>;
}

export function describeBehaviorOfERC721Base(
  { deploy, mint, burn }: ERC721BaseBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC721Base', function () {
    let holder: SignerWithAddress;
    let spender: SignerWithAddress;
    let receiver: SignerWithAddress;
    let sender: SignerWithAddress;
    let instance: ERC721Base;

    before(async function () {
      [holder, spender, receiver, sender] = await ethers.getSigners();
    });

    beforeEach(async function () {
      instance = await deploy();
    });

    describe('#balanceOf', function () {
      it('returns the token balance of given address', async function () {
        expect(
          await instance.callStatic['balanceOf(address)'](
            ethers.constants.AddressZero,
          ),
        ).to.equal(ethers.constants.Zero);

        const tokenId = ethers.constants.Two;

        await expect(() => mint(holder.address, tokenId)).to.changeTokenBalance(
          instance,
          holder,
          ethers.constants.One,
        );

        await expect(() => burn(tokenId)).to.changeTokenBalance(
          instance,
          holder,
          -ethers.constants.One,
        );
      });
    });

    describe('#ownerOf', function () {
      it('returns the owner of given token', async function () {
        expect(
          await instance.callStatic['ownerOf(uint)'](ethers.constants.Two),
        ).to.equal(ethers.constants.AddressZero);

        await mint(holder.address, ethers.constants.Two);

        expect(
          await instance.callStatic['ownerOf(uint)'](ethers.constants.Two),
        ).to.equal(holder.address);
      });
    });

    describe('#getApproved', function () {
      it('TODO: returns the approved spenders of given token');
    });

    describe('#isApprovedForAll', function () {
      it(
        'TODO: returns true if operator is approved for all tokens of given holder',
      );
    });

    describe('#isApprovedForAll', function () {
      it(
        'TODO: returns true if operator is approved for all tokens of given holder',
      );
    });

    describe('#transferFrom', function () {
      it('TODO: transfers tokenId from a to b');
    });
  });
}
