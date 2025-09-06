import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic';
import { $Math, $Math__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Math', () => {
  let instance: $Math;

  before(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $Math__factory(deployer).deploy();
  });

  describe('#add(uint256,int256)', () => {
    it('adds unsigned and signed integers', async () => {
      expect(await instance.$add.staticCall(1, 1)).to.equal(2);
      expect(await instance.$add.staticCall(1, -1)).to.equal(0);
    });

    describe('reverts if', () => {
      it('signed integer is negative and has absolute value greater than unsigned integer', async () => {
        await expect(instance.$add.staticCall(0, -1)).to.be.revertedWithPanic(
          PANIC_CODES.ARITHMETIC_OVERFLOW,
        );
      });
    });
  });

  describe('#sub(uint256,int256)', () => {
    it('subtracts unsigned and signed integers', async () => {
      expect(await instance.$sub.staticCall(1, 1)).to.equal(0);
      expect(await instance.$sub.staticCall(1, -1)).to.equal(2);
    });

    describe('reverts if', () => {
      it('signed integer is negative and has absolute value greater than unsigned integer', async () => {
        await expect(instance.$sub.staticCall(0, 1)).to.be.revertedWithPanic(
          PANIC_CODES.ARITHMETIC_OVERFLOW,
        );
      });
    });
  });

  describe('#abs(int256)', () => {
    it('returns the absolute value of a number', async () => {
      expect(await instance.$abs.staticCall(-1)).to.equal(1);
      expect(await instance.$abs.staticCall(0)).to.equal(0);
      expect(await instance.$abs.staticCall(1)).to.equal(1);
    });
  });

  describe('#max(uint256,uint256)', () => {
    it('returns the greater of two numbers', async () => {
      expect(await instance.$max.staticCall(1, 2)).to.equal(2);

      expect(await instance.$max.staticCall(2, 1)).to.equal(2);

      expect(await instance.$max.staticCall(1, 1)).to.equal(1);

      expect(await instance.$max.staticCall(0, ethers.MaxUint256)).to.equal(
        ethers.MaxUint256,
      );
    });
  });

  describe('#min(uint256,uint256)', () => {
    it('returns the lesser of two numbers', async () => {
      expect(await instance.$min.staticCall(1, 2)).to.equal(1);

      expect(await instance.$min.staticCall(2, 1)).to.equal(1);

      expect(await instance.$min.staticCall(1, 1)).to.equal(1);

      expect(await instance.$min.staticCall(0, ethers.MaxUint256)).to.equal(0);
    });
  });

  describe('#average(uint256,uint256)', () => {
    it('returns the average of two positive numbers from 0 to maxUint256', async () => {
      expect(await instance.$average.staticCall(11, 5)).to.equal(8);

      expect(await instance.$average.staticCall(6, 5)).to.equal(5);

      expect(await instance.$average.staticCall(0, 0)).to.equal(0);

      expect(
        await instance.$average.staticCall(
          ethers.MaxUint256,
          ethers.MaxUint256,
        ),
      ).to.equal(ethers.MaxUint256);

      expect(
        await instance.$average.staticCall(
          ethers.MaxUint256,
          ethers.MaxUint256 - 1n,
        ),
      ).to.equal(ethers.MaxUint256 - 1n);
    });
  });

  describe('#sqrt(uint256)', () => {
    it('returns the square root of 0', async () => {
      expect(await instance.$sqrt.staticCall(0n)).to.eq(0n);
    });

    it('returns the square root of 1', async () => {
      expect(await instance.$sqrt.staticCall(1n)).to.eq(1n);
    });

    it('returns the square root of 2', async () => {
      expect(await instance.$sqrt.staticCall(2n)).to.eq(1n);
    });

    it('returns the square root of positive integers', async () => {
      for (let i = 2; i < 16; i++) {
        expect(await instance.$sqrt.staticCall(BigInt(i))).to.eq(
          Math.floor(Math.sqrt(i)),
        );
      }
    });

    it('returns the square root of powers of 2', async () => {
      for (let i = 0; i < 256; i++) {
        const input = 2n ** BigInt(i);
        const output = await instance.$sqrt.staticCall(input);
        expect(output ** 2n).to.be.lte(input);
        expect((output + 1n) ** 2n).to.be.gt(input);
      }
    });

    it('returns the square root of max values', async () => {
      expect(await instance.$sqrt.staticCall(ethers.MaxUint256 - 1n)).to.eq(
        340282366920938463463374607431768211455n,
      );

      expect(await instance.$sqrt.staticCall(ethers.MaxUint256)).to.eq(
        340282366920938463463374607431768211455n,
      );
    });
  });

  describe('#log2(uint256)', () => {
    it('returns 0 for input of 0', async () => {
      // this is not mathematically correct, but checking within the log2 function would be inefficient
      expect(await instance.$log2.staticCall(0n)).to.eq(0n);
    });

    it('returns 0 for input of 1', async () => {
      expect(await instance.$log2.staticCall(1n)).to.eq(0n);
    });

    it('returns log base 2 of input, rounded down', async () => {
      for (let i = 1n; i < 256n; i++) {
        // test powers of 2
        expect(await instance.$log2.staticCall(2n ** i)).to.eq(i);

        // test rounding
        expect(await instance.$log2.staticCall(2n ** i - 1n)).to.eq(i - 1n);
      }
    });
  });
});
