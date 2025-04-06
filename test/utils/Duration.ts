import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  $Duration,
  $Duration__factory,
  DurationTest,
  DurationTest__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const ONE_SECOND = 1n;
const ONE_MINUTE = ONE_SECOND * 60n;
const ONE_HOUR = ONE_MINUTE * 60n;
const ONE_DAY = ONE_HOUR * 24n;
const ONE_WEEK = ONE_DAY * 7n;

const MAX_UINT48 = 2n ** 48n - 1n;

describe('Duration', async () => {
  let deployer: SignerWithAddress;
  let instance: $Duration;
  let testInstance: DurationTest;

  before(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $Duration__factory(deployer).deploy();
    testInstance = await new DurationTest__factory(deployer).deploy();
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

    describe('#add(uint256,uint256)', () => {
      it('adds two durations', async () => {
        expect(await testInstance.add.staticCall(2n, 1n)).to.eq(3n);
      });
    });

    describe('#sub(uint256,uint256)', () => {
      it('subtracts one duration from another', async () => {
        expect(await testInstance.sub.staticCall(2n, 1n)).to.eq(1n);
      });

      describe('reverts if', () => {
        it('second duration is greater than first duration', async () => {
          await expect(testInstance.sub(0n, 1n)).to.be.revertedWithPanic(
            PANIC_CODES.ARITHMETIC_OVERFLOW,
          );
        });
      });
    });
  });

  describe('library', () => {
    describe('#fromUint256(uint256)', () => {
      it('converts uint256 to duration', async () => {
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

    describe('#ofSeconds(uint256)', () => {
      it('converts seconds to duration', async () => {
        expect(await instance.$ofSeconds.staticCall(1n)).to.eq(ONE_SECOND);
      });

      describe('reverts if', () => {
        it('input is too large for uint48', async () => {
          await expect(
            instance.$ofSeconds.staticCall(MAX_UINT48 / ONE_SECOND + 1n),
          ).to.be.revertedWithPanic(PANIC_CODES.ARITHMETIC_OVERFLOW);
        });
      });
    });

    describe('#ofMinutes(uint256)', () => {
      it('converts minutes to duration', async () => {
        expect(await instance.$ofMinutes.staticCall(1n)).to.eq(ONE_MINUTE);
      });

      describe('reverts if', () => {
        it('input is too large for uint48', async () => {
          await expect(
            instance.$ofMinutes.staticCall(MAX_UINT48 / ONE_MINUTE + 1n),
          ).to.be.revertedWithPanic(PANIC_CODES.ARITHMETIC_OVERFLOW);
        });
      });
    });

    describe('#ofHours(uint256)', () => {
      it('converts hours to duration', async () => {
        expect(await instance.$ofHours.staticCall(1n)).to.eq(ONE_HOUR);
      });

      describe('reverts if', () => {
        it('input is too large for uint48', async () => {
          await expect(
            instance.$ofHours.staticCall(MAX_UINT48 / ONE_HOUR + 1n),
          ).to.be.revertedWithPanic(PANIC_CODES.ARITHMETIC_OVERFLOW);
        });
      });
    });

    describe('#ofDays(uint256)', () => {
      it('converts days to duration', async () => {
        expect(await instance.$ofDays.staticCall(1n)).to.eq(ONE_DAY);
      });

      describe('reverts if', () => {
        it('input is too large for uint48', async () => {
          await expect(
            instance.$ofDays.staticCall(MAX_UINT48 / ONE_DAY + 1n),
          ).to.be.revertedWithPanic(PANIC_CODES.ARITHMETIC_OVERFLOW);
        });
      });
    });

    describe('#ofWeeks(uint256)', () => {
      it('converts weeks to duration', async () => {
        expect(await instance.$ofWeeks.staticCall(1n)).to.eq(ONE_WEEK);
      });

      describe('reverts if', () => {
        it('input is too large for uint48', async () => {
          await expect(
            instance.$ofWeeks.staticCall(MAX_UINT48 / ONE_WEEK + 1n),
          ).to.be.revertedWithPanic(PANIC_CODES.ARITHMETIC_OVERFLOW);
        });
      });
    });
  });
});
