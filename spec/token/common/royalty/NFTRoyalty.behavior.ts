import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeFilter } from '@solidstate/library';
import { describeBehaviorOfIntrospectable } from '@solidstate/spec';
import { INFTRoyalty } from '@solidstate/typechain-types';
import { expect } from 'chai';
import type { NetworkConnection } from 'hardhat/types/network';

export interface NFTRoyaltyBehaviorArgs {}

export function describeBehaviorOfNFTRoyalty(
  connection: NetworkConnection,
  deploy: () => Promise<INFTRoyalty>,
  args: NFTRoyaltyBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::NFTRoyalty', () => {
    let tokenIdOne = 1;
    let tokenIdTwo = 2;
    let tokenIdThree = 3;

    let receiver: HardhatEthersSigner;
    let instance: INFTRoyalty;

    beforeEach(async () => {
      receiver = (await connection.ethers.getSigners())[1];
      instance = await deploy();
    });

    describeBehaviorOfIntrospectable(
      connection,
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
