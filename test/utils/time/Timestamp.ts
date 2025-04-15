import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  $Timestamp,
  $Timestamp__factory,
  TimestampTest,
  TimestampTest__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const MAX_UINT48 = 2n ** 48n - 1n;

describe('Timestamp', async () => {
  let deployer: SignerWithAddress;
  let instance: $Timestamp;
  let testInstance: TimestampTest;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $Timestamp__factory(deployer).deploy();
    testInstance = await new TimestampTest__factory(deployer).deploy();
  });

  describe('free functions', () => {
    describe('#eq(uint256,uint256)', () => {
      it('returns eq comparison between durations', async () => {
        expect(await testInstance.eq.staticCall(1n, 1n)).to.be.true;
        expect(await testInstance.eq.staticCall(1n, 0n)).to.be.false;
      });
    });

    describe('#notEq(uint256,uint256)', () => {
      it('returns notEq comparison between durations', async () => {
        expect(await testInstance.notEq.staticCall(1n, 0n)).to.be.true;
        expect(await testInstance.notEq.staticCall(1n, 1n)).to.be.false;
      });
    });

    describe('#gt(uint256,uint256)', () => {
      it('returns gt comparison between durations', async () => {
        expect(await testInstance.gt.staticCall(1n, 0n)).to.be.true;
        expect(await testInstance.gt.staticCall(1n, 1n)).to.be.false;
      });
    });

    describe('#lt(uint256,uint256)', () => {
      it('returns lt comparison between durations', async () => {
        expect(await testInstance.lt.staticCall(0n, 1n)).to.be.true;
        expect(await testInstance.lt.staticCall(1n, 1n)).to.be.false;
      });
    });

    describe('#gte(uint256,uint256)', () => {
      it('returns gte comparison between durations', async () => {
        expect(await testInstance.gte.staticCall(1n, 0n)).to.be.true;
        expect(await testInstance.gte.staticCall(1n, 1n)).to.be.true;
        expect(await testInstance.gte.staticCall(1n, 2n)).to.be.false;
      });
    });

    describe('#lte(uint256,uint256)', () => {
      it('returns lte comparison between durations', async () => {
        expect(await testInstance.lte.staticCall(0n, 1n)).to.be.true;
        expect(await testInstance.lte.staticCall(1n, 1n)).to.be.true;
        expect(await testInstance.lte.staticCall(2n, 1n)).to.be.false;
      });
    });
  });

  describe('library', () => {
    describe('#fromUint256(uint256)', () => {
      it('converts uint256 to timestamp', async () => {
        expect(await instance.$fromUint256.staticCall(1n)).to.eq(1n);
      });

      describe('reverts if', () => {
        it('input is too large for uint48', async () => {
          await expect(
            instance.$fromUint256.staticCall(MAX_UINT48 + 1n),
          ).to.be.revertedWithPanic(PANIC_CODES.ARITHMETIC_OVERFLOW);
        });
      });
    });

    describe('#add(uint256,uint256)', () => {
      it('adds duration to timestamp', async () => {
        expect(await instance.$add.staticCall(1n, 1n)).to.eq(2n);
      });
    });

    describe('#sub(uint256,uint256)', () => {
      it('subtracts duration from timestamp', async () => {
        expect(await instance.$sub.staticCall(2n, 1n)).to.eq(1n);
      });

      describe('reverts if', () => {
        it('duration is greater than timestamp', async () => {
          await expect(
            instance.$sub.staticCall(1n, 2n),
          ).to.be.revertedWithPanic(PANIC_CODES.ARITHMETIC_OVERFLOW);
        });
      });
    });
  });
});
