import {
  __hh_exposed_SafeCast,
  __hh_exposed_SafeCast__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('SafeCast', () => {
  let instance: __hh_exposed_SafeCast;

  before(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_SafeCast__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#toUint224(uint256)', () => {
      it('casts input without data loss', async () => {
        const input = 2n ** 224n - 1n;

        expect(await instance.__hh_exposed_toUint224.staticCall(input)).to.eq(
          input,
        );
        //  (uint224) {
        // if (value > type(uint224).max) revert SafeCast__ValueDoesNotFit();
      });
    });

    describe('#toUint128(uint256)', () => {
      it('casts input without data loss', async () => {
        const input = 2n ** 128n - 1n;

        expect(await instance.__hh_exposed_toUint128.staticCall(input)).to.eq(
          input,
        );
      });

      describe('reverts if', () => {
        it('value does not fit', async () => {
          const input = 2n ** 128n;

          await expect(
            instance.__hh_exposed_toUint128.staticCall(input),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
        });
      });
    });

    describe('#toUint96(uint256)', () => {
      it('casts input without data loss', async () => {
        const input = 2n ** 96n - 1n;

        expect(await instance.__hh_exposed_toUint96.staticCall(input)).to.eq(
          input,
        );
      });

      describe('reverts if', () => {
        it('value does not fit', async () => {
          const input = 2n ** 96n;

          await expect(
            instance.__hh_exposed_toUint96.staticCall(input),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
        });
      });
    });

    describe('#toUint64(uint256)', () => {
      it('casts input without data loss', async () => {
        const input = 2n ** 64n - 1n;

        expect(await instance.__hh_exposed_toUint64.staticCall(input)).to.eq(
          input,
        );
      });

      describe('reverts if', () => {
        it('value does not fit', async () => {
          const input = 2n ** 64n;

          await expect(
            instance.__hh_exposed_toUint64.staticCall(input),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
        });
      });
    });

    describe('#toUint32(uint256)', () => {
      it('casts input without data loss', async () => {
        const input = 2n ** 32n - 1n;

        expect(await instance.__hh_exposed_toUint32.staticCall(input)).to.eq(
          input,
        );
      });

      describe('reverts if', () => {
        it('value does not fit', async () => {
          const input = 2n ** 32n;

          await expect(
            instance.__hh_exposed_toUint32.staticCall(input),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
        });
      });
    });

    describe('#toUint16(uint256)', () => {
      it('casts input without data loss', async () => {
        const input = 2n ** 16n - 1n;

        expect(await instance.__hh_exposed_toUint16.staticCall(input)).to.eq(
          input,
        );
      });

      describe('reverts if', () => {
        it('value does not fit', async () => {
          const input = 2n ** 16n;

          await expect(
            instance.__hh_exposed_toUint16.staticCall(input),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
        });
      });
    });

    describe('#toUint8(uint256)', () => {
      it('casts input without data loss', async () => {
        const input = 2n ** 8n - 1n;

        expect(await instance.__hh_exposed_toUint8.staticCall(input)).to.eq(
          input,
        );
      });

      describe('reverts if', () => {
        it('value does not fit', async () => {
          const input = 2n ** 8n;

          await expect(
            instance.__hh_exposed_toUint8.staticCall(input),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
        });
      });
    });

    describe('#toInt256(uint256)', () => {
      it('casts input without data loss', async () => {
        const input = 2n ** 255n - 1n;

        expect(await instance.__hh_exposed_toInt256.staticCall(input)).to.eq(
          input,
        );
      });

      describe('reverts if', () => {
        it('value does not fit', async () => {
          const input = 2n ** 255n;

          await expect(
            instance.__hh_exposed_toInt256.staticCall(input),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
        });
      });
    });

    describe('#toInt128(int256)', () => {
      it('casts input without data loss', async () => {
        const inputPositive = 2n ** (128n - 1n) - 1n;
        const inputNegative = -(2n ** (128n - 1n));

        expect(
          await instance.__hh_exposed_toInt128.staticCall(inputPositive),
        ).to.eq(inputPositive);
        expect(
          await instance.__hh_exposed_toInt128.staticCall(inputNegative),
        ).to.eq(inputNegative);
      });

      describe('reverts if', () => {
        it('value does not fit', async () => {
          const inputPositive = 2n ** (128n - 1n);
          const inputNegative = -(2n ** (128n - 1n)) - 1n;

          await expect(
            instance.__hh_exposed_toInt128.staticCall(inputPositive),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
          await expect(
            instance.__hh_exposed_toInt128.staticCall(inputNegative),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
        });
      });
    });

    describe('#toInt64(int256)', () => {
      it('casts input without data loss', async () => {
        const inputPositive = 2n ** (64n - 1n) - 1n;
        const inputNegative = -(2n ** (64n - 1n));

        expect(
          await instance.__hh_exposed_toInt64.staticCall(inputPositive),
        ).to.eq(inputPositive);
        expect(
          await instance.__hh_exposed_toInt64.staticCall(inputNegative),
        ).to.eq(inputNegative);
      });

      describe('reverts if', () => {
        it('value does not fit', async () => {
          const inputPositive = 2n ** (64n - 1n);
          const inputNegative = -(2n ** (64n - 1n)) - 1n;

          await expect(
            instance.__hh_exposed_toInt64.staticCall(inputPositive),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
          await expect(
            instance.__hh_exposed_toInt64.staticCall(inputNegative),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
        });
      });
    });

    describe('#toInt32(int256)', () => {
      it('casts input without data loss', async () => {
        const inputPositive = 2n ** (32n - 1n) - 1n;
        const inputNegative = -(2n ** (32n - 1n));

        expect(
          await instance.__hh_exposed_toInt32.staticCall(inputPositive),
        ).to.eq(inputPositive);
        expect(
          await instance.__hh_exposed_toInt32.staticCall(inputNegative),
        ).to.eq(inputNegative);
      });

      describe('reverts if', () => {
        it('value does not fit', async () => {
          const inputPositive = 2n ** (32n - 1n);
          const inputNegative = -(2n ** (32n - 1n)) - 1n;

          await expect(
            instance.__hh_exposed_toInt32.staticCall(inputPositive),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
          await expect(
            instance.__hh_exposed_toInt32.staticCall(inputNegative),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
        });
      });
    });

    describe('#toInt16(int256)', () => {
      it('casts input without data loss', async () => {
        const inputPositive = 2n ** (16n - 1n) - 1n;
        const inputNegative = -(2n ** (16n - 1n));

        expect(
          await instance.__hh_exposed_toInt16.staticCall(inputPositive),
        ).to.eq(inputPositive);
        expect(
          await instance.__hh_exposed_toInt16.staticCall(inputNegative),
        ).to.eq(inputNegative);
      });

      describe('reverts if', () => {
        it('value does not fit', async () => {
          const inputPositive = 2n ** (16n - 1n);
          const inputNegative = -(2n ** (16n - 1n)) - 1n;

          await expect(
            instance.__hh_exposed_toInt16.staticCall(inputPositive),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
          await expect(
            instance.__hh_exposed_toInt16.staticCall(inputNegative),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
        });
      });
    });

    describe('#toInt8(int256)', () => {
      it('casts input without data loss', async () => {
        const inputPositive = 2n ** (8n - 1n) - 1n;
        const inputNegative = -(2n ** (8n - 1n));

        expect(
          await instance.__hh_exposed_toInt8.staticCall(inputPositive),
        ).to.eq(inputPositive);
        expect(
          await instance.__hh_exposed_toInt8.staticCall(inputNegative),
        ).to.eq(inputNegative);
      });

      describe('reverts if', () => {
        it('value does not fit', async () => {
          const inputPositive = 2n ** (8n - 1n);
          const inputNegative = -(2n ** (8n - 1n)) - 1n;

          await expect(
            instance.__hh_exposed_toInt8.staticCall(inputPositive),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
          await expect(
            instance.__hh_exposed_toInt8.staticCall(inputNegative),
          ).to.be.revertedWithCustomError(
            instance,
            'SafeCast__ValueDoesNotFit',
          );
        });
      });
    });

    describe('#toUint256(int256)', () => {
      it('casts input without data loss', async () => {
        const input = 2n ** 255n - 1n;

        expect(await instance.__hh_exposed_toUint256.staticCall(input)).to.eq(
          input,
        );
      });

      describe('reverts if', () => {
        it('value is negative', async () => {
          const input = -1n;

          await expect(
            instance.__hh_exposed_toUint256.staticCall(input),
          ).to.be.revertedWithCustomError(instance, 'SafeCast__NegativeValue');
        });
      });
    });
  });
});
