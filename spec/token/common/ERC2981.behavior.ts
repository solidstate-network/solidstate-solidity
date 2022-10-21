import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { ERC2981Mock } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

export function describeBehaviorOfERC2981(
  deploy: () => Promise<ERC2981Mock>,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::ERC2981', function () {
    let tokenIdOne = BigNumber.from(1);
    let tokenIdTwo = BigNumber.from(2);
    let tokenIdThree = BigNumber.from(3);

    let receiver: SignerWithAddress;
    let instance: ERC2981Mock;

    before(async function () {
      receiver = (await ethers.getSigners())[1];
      instance = await deploy();
    });

    describe('#royaltyInfo()', () => {
      describe('reverts if', () => {
        it('royalty exceeds maximum', async function () {
          await expect(
            instance.royaltyInfo(tokenIdThree, ethers.constants.One),
          ).to.be.revertedWithCustomError(
            instance,
            'ERC2981Internal__RoyaltyExceedsMax',
          );
        });
      });

      it('returns 0 if salePrice is 0', async function () {
        const [, royaltyAmount] = await instance.royaltyInfo(
          0,
          BigNumber.from(0),
        );

        expect(royaltyAmount).to.equal(BigNumber.from(0));
      });

      it('returns receiver address', async function () {
        const [recipient] = await instance.royaltyInfo(0, BigNumber.from(0));
        expect(recipient).to.equal(await receiver.getAddress());
      });

      it('calculates royalty using global if local does not exist', async function () {
        let [, royaltyAmount] = await instance.royaltyInfo(0, 10000);
        expect(royaltyAmount).to.equal(BigNumber.from(10000));
      });

      it('calculates royalty using local', async function () {
        let [, royaltyAmount] = await instance.royaltyInfo(tokenIdOne, 10000);
        expect(royaltyAmount).to.equal(BigNumber.from(100));

        [, royaltyAmount] = await instance.royaltyInfo(tokenIdTwo, 10000);
        expect(royaltyAmount).to.equal(BigNumber.from(1000));
      });
    });
  });
}