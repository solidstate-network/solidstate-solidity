import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { ArrayUtilsMock, ArrayUtilsMock__factory } from '../../typechain';

describe('ArrayUtils', async () => {
  let instance: ArrayUtilsMock;
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new ArrayUtilsMock__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#min(uint256[])', () => {
      it('returns the minimum value in given array', async () => {
        expect(
          await instance.callStatic.min([
            ethers.constants.One,
            ethers.constants.Zero,
            ethers.constants.Two,
          ]),
        ).to.equal(ethers.constants.Zero);
      });

      it('returns the max uint256 if array is empty', async () => {
        expect(await instance.callStatic.min([])).to.equal(
          ethers.constants.MaxUint256,
        );
      });
    });

    describe('#max(uint256[])', () => {
      it('returns the maximum value in given array', async () => {
        expect(
          await instance.callStatic.max([
            ethers.constants.One,
            ethers.constants.Zero,
            ethers.constants.Two,
          ]),
        ).to.equal(ethers.constants.Two);
      });

      it('returns zero if array is empty', async () => {
        expect(await instance.callStatic.max([])).to.equal(
          ethers.constants.Zero,
        );
      });
    });
  });
});
