import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { bnToBytes32, bnToAddress } from '@solidstate/library';
import {
  ArrayUtilsMock,
  ArrayUtilsMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

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
          await instance['min(bytes32[])'].staticCall([
            bnToBytes32(1),
            bnToBytes32(0),
            bnToBytes32(2),
          ]),
        ).to.equal(bnToBytes32(0));
      });

      it('returns the max bytes32 value if array is empty', async () => {
        expect(await instance['min(bytes32[])'].staticCall([])).to.equal(
          bnToBytes32(ethers.MaxUint256),
        );
      });
    });

    describe('#min(address[])', () => {
      it('returns the minimum address in given array', async () => {
        expect(
          await instance['min(address[])'].staticCall([
            bnToAddress(1),
            bnToAddress(0),
            bnToAddress(2),
          ]),
        ).to.equal(bnToAddress(0));
      });

      it('returns the max address if array is empty', async () => {
        expect(await instance['min(address[])'].staticCall([])).to.equal(
          bnToAddress(2n ** 160n - 1n),
        );
      });
    });

    describe('#min(uint256[])', () => {
      it('returns the minimum uint256 in given array', async () => {
        expect(await instance['min(uint256[])'].staticCall([1, 0, 2])).to.equal(
          0,
        );
      });

      it('returns the max uint256 if array is empty', async () => {
        expect(await instance['min(uint256[])'].staticCall([])).to.equal(
          ethers.MaxUint256,
        );
      });
    });

    describe('#max(bytes32[])', () => {
      it('returns the maximum bytes32 value in given array', async () => {
        expect(
          await instance['max(bytes32[])'].staticCall([
            bnToBytes32(1),
            bnToBytes32(0),
            bnToBytes32(2),
          ]),
        ).to.equal(bnToBytes32(2));
      });

      it('returns empty bytes if array is empty', async () => {
        expect(await instance['max(bytes32[])'].staticCall([])).to.equal(
          ethers.ZeroHash,
        );
      });
    });

    describe('#max(address[])', () => {
      it('returns the maximum address in given array', async () => {
        expect(
          await instance['max(address[])'].staticCall([
            bnToAddress(1),
            bnToAddress(0),
            bnToAddress(2),
          ]),
        ).to.equal(bnToAddress(2));
      });

      it('returns zero address if array is empty', async () => {
        expect(await instance['max(address[])'].staticCall([])).to.equal(
          ethers.ZeroAddress,
        );
      });
    });

    describe('#max(uint256[])', () => {
      it('returns the maximum uint256 in given array', async () => {
        expect(await instance['max(uint256[])'].staticCall([1, 0, 2])).to.equal(
          2,
        );
      });

      it('returns zero if array is empty', async () => {
        expect(await instance['max(uint256[])'].staticCall([])).to.equal(0);
      });
    });
  });
});
