import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic';
import {
  UintUtilsMock,
  UintUtilsMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('UintUtils', function () {
  let instance: UintUtilsMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new UintUtilsMock__factory(deployer).deploy();
  });

  describe('__internal', function () {
    describe('#add(uint256,int256)', function () {
      it('adds unsigned and signed integers', async () => {
        expect(await instance.callStatic.add(1, 1)).to.equal(2);
        expect(await instance.callStatic.add(1, -1)).to.equal(0);
      });

      describe('reverts if', () => {
        it('signed integer is negative and has absolute value greater than unsigned integer', async () => {
          await expect(instance.callStatic.add(0, -1)).to.be.revertedWithPanic(
            PANIC_CODES.ARITHMETIC_UNDER_OR_OVERFLOW,
          );
        });
      });
    });

    describe('#sub(uint256,int256)', function () {
      it('subtracts unsigned and signed integers', async () => {
        expect(await instance.callStatic.sub(1, 1)).to.equal(0);
        expect(await instance.callStatic.sub(1, -1)).to.equal(2);
      });

      describe('reverts if', () => {
        it('signed integer is negative and has absolute value greater than unsigned integer', async () => {
          await expect(instance.callStatic.sub(0, 1)).to.be.revertedWithPanic(
            PANIC_CODES.ARITHMETIC_UNDER_OR_OVERFLOW,
          );
        });
      });
    });

    describe('#toString(uint256,uint256)', function () {
      it('returns string representation of number in given base');
    });

    describe('#toString(uint256,uint256,uint256)', function () {
      it(
        'returns string representation of number in given base with specified padding',
      );

      describe('reverts if', () => {
        it('padding is insufficient');
      });
    });

    describe('#toBinString(uint256)', function () {
      it('returns binary string representation of number', async function () {
        for (let i = 0; i < 12; i++) {
          const value = BigInt(i);
          const string = value.toString(2);

          expect(
            await instance.callStatic['toBinString(uint256)'](value),
          ).to.equal(string);
        }

        expect(
          await instance.callStatic['toBinString(uint256)'](
            ethers.constants.MaxUint256,
          ),
        ).to.equal(ethers.constants.MaxUint256.toBigInt().toString(2));
      });
    });

    describe('#toBinString(uint256,uint256)', function () {
      it('returns binary string representation of a number with specified padding', async () => {
        const values = [1000n, 1n, 12345n, 85746201361230n, 999983n];

        for (let value of values) {
          const string = value.toString(2);
          const length = string.length;

          const result = await instance.callStatic[
            'toBinString(uint256,uint256)'
          ](value, length);

          expect(BigInt(`0b${result}`)).to.equal(value);
          expect(result.length).to.equal(length);
        }
      });

      describe('reverts if', function () {
        it('padding is insufficient', async () => {
          await expect(
            instance.callStatic['toBinString(uint256,uint256)'](0b1, 0n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );

          await expect(
            instance.callStatic['toBinString(uint256,uint256)'](0b10, 1n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );
        });
      });
    });

    describe('#toDecString(uint256)', function () {
      it('returns decimal string representation of number', async function () {
        for (let i = 0; i < 12; i++) {
          const value = BigInt(i);
          const string = value.toString();

          expect(
            await instance.callStatic['toDecString(uint256)'](value),
          ).to.equal(string);
        }

        expect(
          await instance.callStatic['toDecString(uint256)'](
            ethers.constants.MaxUint256,
          ),
        ).to.equal(ethers.constants.MaxUint256.toString());
      });
    });

    describe('#toDecString(uint256,uint256)', function () {
      it('returns decimal string representation of a number with specified padding', async () => {
        const values = [1000n, 1n, 12345n, 85746201361230n, 999983n];

        for (let value of values) {
          const string = value.toString();
          const length = string.length;

          const result = await instance.callStatic[
            'toDecString(uint256,uint256)'
          ](value, length);

          expect(BigInt(result)).to.equal(value);
          expect(result.length).to.equal(length);
        }
      });

      describe('reverts if', function () {
        it('padding is insufficient', async () => {
          await expect(
            instance.callStatic['toDecString(uint256,uint256)'](1n, 0n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );

          await expect(
            instance.callStatic['toDecString(uint256,uint256)'](10n, 1n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );
        });
      });
    });

    describe('#toHexString(uint256)', function () {
      it('returns 0x00 if input is 0', async () => {
        expect(
          await instance.callStatic['toHexString(uint256)'](
            ethers.constants.Zero,
          ),
        ).to.equal('0x00');
      });

      it('returns correct hexadecimal string representation of a number', async () => {
        const values = [1000n, 1n, 12345n, 85746201361230n, 999983n];

        for (const value of values) {
          expect(
            await instance.callStatic['toHexString(uint256)'](value),
          ).to.equal(ethers.utils.hexlify(value));
        }
      });
    });

    describe('#toHexString(uint256,uint256)', function () {
      it('returns hexadecimal string representation of a number with specified padding', async () => {
        const values = [1000n, 1n, 12345n, 85746201361230n, 999983n];

        for (let value of values) {
          const string = ethers.utils.hexlify(value);
          const length = string.length - 2;

          const result = await instance.callStatic[
            'toHexString(uint256,uint256)'
          ](value, length);

          expect(BigInt(result)).to.equal(value);
          expect(result.length - 2).to.equal(length);
        }
      });

      describe('reverts if', () => {
        it('padding is insufficient', async () => {
          await expect(
            instance.callStatic['toHexString(uint256,uint256)'](1n, 0n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );

          await expect(
            instance.callStatic['toHexString(uint256,uint256)'](256n, 1n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );
        });
      });
    });
  });
});
