import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BytesLike } from 'ethers';
import { MulticallMock, MulticallMock__factory } from '../../typechain';

describe('Multicall', function () {
  let instance: MulticallMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new MulticallMock__factory(deployer).deploy();
  });

  // TODO: move to behavior tests

  describe('#multicall', function () {
    it('returns empty array if no call data is passed', async function () {
      expect(await instance.callStatic.multicall([])).to.deep.equal([]);
    });

    it('returns array of response data', async function () {
      const result = await instance.callStatic.multicall([
        (await instance.populateTransaction.callTest()).data as BytesLike,
      ]);

      expect(result).to.deep.equal([
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      ]);

      expect(result.map(ethers.BigNumber.from)).to.deep.equal([
        ethers.constants.One,
      ]);
    });

    describe('reverts if', function () {
      it('component function call reverts', async function () {
        await expect(
          instance.multicall([
            (await instance.populateTransaction.callTest()).data as BytesLike,
            (
              await instance.populateTransaction.callRevertTest()
            ).data as BytesLike,
          ]),
        ).to.be.revertedWith('revert');
      });
    });
  });
});
