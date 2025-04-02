import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfIntrospectable } from '@solidstate/spec';
import { INFTRoyalty } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

export interface NFTRoyaltyBehaviorArgs {}

export function describeBehaviorOfNFTRoyalty(
  deploy: () => Promise<INFTRoyalty>,
  args: NFTRoyaltyBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::NFTRoyalty', () => {
    let tokenIdOne = 1;
    let tokenIdTwo = 2;
    let tokenIdThree = 3;

    let receiver: SignerWithAddress;
    let instance: INFTRoyalty;

    beforeEach(async () => {
      receiver = (await ethers.getSigners())[1];
      instance = await deploy();
    });

    describeBehaviorOfIntrospectable(
      deploy,
      {
        interfaceIds: ['0x2a55205a'],
      },
      skips,
    );

    describe('#royaltyInfo()', () => {
      it('returns 0 if salePrice is 0', async () => {
        const [, royaltyAmount] = await instance.royaltyInfo(0, 0);

        expect(royaltyAmount).to.equal(0);
      });

      it('returns receiver address', async () => {
        const [recipient] = await instance.royaltyInfo(0, 0);
        expect(recipient).to.equal(await receiver.getAddress());
      });

      it('calculates royalty using global if local does not exist', async () => {
        let [, royaltyAmount] = await instance.royaltyInfo(0, 10000);
        expect(royaltyAmount).to.equal(10000);
      });

      it('calculates royalty using local', async () => {
        let [, royaltyAmount] = await instance.royaltyInfo(tokenIdOne, 10000);
        expect(royaltyAmount).to.equal(100);

        [, royaltyAmount] = await instance.royaltyInfo(tokenIdTwo, 10000);
        expect(royaltyAmount).to.equal(1000);
      });
    });
  });
}
