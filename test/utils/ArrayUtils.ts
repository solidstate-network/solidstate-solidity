import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { ArrayUtilsMock, ArrayUtilsMock__factory } from '../../typechain';

const bnToAddress = (bn: BigNumber) => {
  return ethers.utils.getAddress(
    ethers.utils.hexZeroPad(ethers.utils.hexlify(bn), 20),
  );
};

const bnToBytes32 = (bn: BigNumber) => {
  return ethers.utils.hexZeroPad(ethers.utils.hexlify(bn), 32);
};

describe('ArrayUtils', async () => {
  let instance: ArrayUtilsMock;
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new ArrayUtilsMock__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#min(bytes32[])', () => {
      it('returns the minimum bytes32 value in given array', async () => {
        expect(
          await instance.callStatic['min(bytes32[])']([
            bnToBytes32(ethers.constants.One),
            bnToBytes32(ethers.constants.Zero),
            bnToBytes32(ethers.constants.Two),
          ]),
        ).to.equal(bnToBytes32(ethers.constants.Zero));
      });

      it('returns the max bytes32 value if array is empty', async () => {
        expect(await instance.callStatic['min(bytes32[])']([])).to.equal(
          bnToBytes32(ethers.constants.MaxUint256),
        );
      });
    });

    describe('#min(address[])', () => {
      it('returns the minimum address in given array', async () => {
        expect(
          await instance.callStatic['min(address[])']([
            bnToAddress(ethers.constants.One),
            bnToAddress(ethers.constants.Zero),
            bnToAddress(ethers.constants.Two),
          ]),
        ).to.equal(bnToAddress(ethers.constants.Zero));
      });

      it('returns the max address if array is empty', async () => {
        expect(await instance.callStatic['min(address[])']([])).to.equal(
          bnToAddress(ethers.constants.Two.pow(160).sub(ethers.constants.One)),
        );
      });
    });

    describe('#min(uint256[])', () => {
      it('returns the minimum uint256 in given array', async () => {
        expect(
          await instance.callStatic['min(uint256[])']([
            ethers.constants.One,
            ethers.constants.Zero,
            ethers.constants.Two,
          ]),
        ).to.equal(ethers.constants.Zero);
      });

      it('returns the max uint256 if array is empty', async () => {
        expect(await instance.callStatic['min(uint256[])']([])).to.equal(
          ethers.constants.MaxUint256,
        );
      });
    });

    describe('#max(bytes32[])', () => {
      it('returns the maximum bytes32 value in given array', async () => {
        expect(
          await instance.callStatic['max(bytes32[])']([
            bnToBytes32(ethers.constants.One),
            bnToBytes32(ethers.constants.Zero),
            bnToBytes32(ethers.constants.Two),
          ]),
        ).to.equal(bnToBytes32(ethers.constants.Two));
      });

      it('returns empty bytes if array is empty', async () => {
        expect(await instance.callStatic['max(bytes32[])']([])).to.equal(
          ethers.constants.HashZero,
        );
      });
    });

    describe('#max(address[])', () => {
      it('returns the maximum address in given array', async () => {
        expect(
          await instance.callStatic['max(address[])']([
            bnToAddress(ethers.constants.One),
            bnToAddress(ethers.constants.Zero),
            bnToAddress(ethers.constants.Two),
          ]),
        ).to.equal(bnToAddress(ethers.constants.Two));
      });

      it('returns zero address if array is empty', async () => {
        expect(await instance.callStatic['max(address[])']([])).to.equal(
          ethers.constants.AddressZero,
        );
      });
    });

    describe('#max(uint256[])', () => {
      it('returns the maximum uint256 in given array', async () => {
        expect(
          await instance.callStatic['max(uint256[])']([
            ethers.constants.One,
            ethers.constants.Zero,
            ethers.constants.Two,
          ]),
        ).to.equal(ethers.constants.Two);
      });

      it('returns zero if array is empty', async () => {
        expect(await instance.callStatic['max(uint256[])']([])).to.equal(
          ethers.constants.Zero,
        );
      });
    });
  });
});
