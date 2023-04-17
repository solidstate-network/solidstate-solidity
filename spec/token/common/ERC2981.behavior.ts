import { describeBehaviorOfERC165Base } from '../../introspection';
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

    describeBehaviorOfERC165Base(
      deploy,
      {
        interfaceIds: ['0x2a55205a'],
      },
      skips,
    );

    describe('#royaltyInfo()', () => {
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
