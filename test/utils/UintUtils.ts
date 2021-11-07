import { expect } from 'chai';
import { ethers } from 'hardhat';
import { UintUtilsMock, UintUtilsMock__factory } from '../../typechain';

describe('UintUtils', function () {
  let instance: UintUtilsMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new UintUtilsMock__factory(deployer).deploy();
  });

  describe('__internal', function () {
    describe('#toString', function () {
      it('returns base-10 string representation of number', async function () {
        for (let i = 0; i < 12; i++) {
          const string = i.toString();
          const number = ethers.BigNumber.from(string);
          expect(
            await instance.callStatic['toString(uint256)'](number),
          ).to.equal(string);
        }

        expect(
          await instance.callStatic['toString(uint256)'](
            ethers.constants.MaxUint256,
          ),
        ).to.equal(ethers.constants.MaxUint256.toString());
      });
    });
  });
});
