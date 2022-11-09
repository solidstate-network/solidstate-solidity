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

    describe('#toString(uint256)', function () {
      it('returns decimal string representation of number', async function () {
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

    describe('#toString(uint256,uint256)', function () {
      it('returns decimal string representation of a number with specified padding', async () => {
        const values = ['1000', '1', '12345', '85746201361230', '999983'].map(
          (v) => ethers.BigNumber.from(v),
        );

        for (let i = 0; i < values.length; i++) {
          const value = values[i];

          const string = await instance.callStatic['toString(uint256,uint256)'](
            value,
            value.toString().length + i,
          );

          expect(string.length).to.equal(value.toString().length + i);

          expect(BigInt(string)).to.equal(
            BigInt(await instance.callStatic['toString(uint256)'](value)),
          );
        }
      });

      describe('reverts if', function () {
        it('padding is insufficient', async () => {
          await expect(
            instance.callStatic['toString(uint256,uint256)'](1n, 0n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );

          await expect(
            instance.callStatic['toString(uint256,uint256)'](10n, 1n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );
        });
      });
    });

    describe('#toHexString(uint256)', function () {
      it('returns 0 if input is 0', async () => {
        expect(
          await instance.callStatic['toHexString(uint256)'](
            ethers.constants.Zero,
          ),
        ).to.equal('0x00');
      });

      it('returns correct hexadecimal string representation of a number', async () => {
        const values = ['1000', '1', '12345', '85746201361230', '999983'].map(
          (v) => ethers.BigNumber.from(v),
        );

        for (const value of values) {
          expect(
            await instance.callStatic['toHexString(uint256)'](value),
          ).to.equal(value.toHexString());
        }
      });
    });

    describe('#toHexString(uint256,uint256)', function () {
      it('returns hexadecimal string representation of a number with specified padding', async () => {
        const values = ['1000', '1', '12345', '85746201361230', '999983'].map(
          (v) => ethers.BigNumber.from(v),
        );

        for (let i = 0; i < values.length; i++) {
          const value = values[i];

          const string = await instance.callStatic[
            'toHexString(uint256,uint256)'
          ](value, (value.toHexString().length - 2) / 2 + i);

          expect(string.length).to.equal(value.toHexString().length + i * 2);

          expect(string).to.hexEqual(
            await instance.callStatic['toHexString(uint256)'](value),
          );
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
