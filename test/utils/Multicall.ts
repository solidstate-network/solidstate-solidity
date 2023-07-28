import {
  MulticallMock,
  MulticallMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BytesLike } from 'ethers';
import { ethers } from 'hardhat';

describe('Multicall', () => {
  let instance: MulticallMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new MulticallMock__factory(deployer).deploy();
  });

  // TODO: move to behavior tests

  describe('#multicall(bytes[])', () => {
    it('returns empty array if no call data is passed', async () => {
      expect(await instance.multicall.staticCall([])).to.deep.equal([]);
    });

    it('returns array of response data', async () => {
      const result = await instance.multicall.staticCall([
        (await instance.callTest.populateTransaction()).data as BytesLike,
      ]);

      expect(result).to.deep.equal([
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      ]);
    });

    describe('reverts if', () => {
      it('component function call reverts', async () => {
        await expect(
          instance.multicall([
            (await instance.callTest.populateTransaction()).data as BytesLike,
            (await instance.callRevertTest.populateTransaction())
              .data as BytesLike,
          ]),
        ).to.be.revertedWith('revert');
      });
    });
  });
});
