import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic';
import {
  UintUtilsMock,
  UintUtilsMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('UintUtils', () => {
  let instance: UintUtilsMock;
  const values = [
    0n,
    1n,
    0b10 - 1,
    0b10,
    0o10 - 1,
    0o10,
    10 - 1,
    10,
    0x10,
    0x10 - 1,
    1000n,
    85746201361230n,
    BigInt(ethers.MaxUint256),
  ];

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new UintUtilsMock__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#add(uint256,int256)', () => {
      it('adds unsigned and signed integers', async () => {
        expect(await instance.add.staticCall(1, 1)).to.equal(2);
        expect(await instance.add.staticCall(1, -1)).to.equal(0);
      });

      describe('reverts if', () => {
        it('signed integer is negative and has absolute value greater than unsigned integer', async () => {
          await expect(instance.add.staticCall(0, -1)).to.be.revertedWithPanic(
            PANIC_CODES.ARITHMETIC_UNDER_OR_OVERFLOW,
          );
        });
      });
    });

    describe('#sub(uint256,int256)', () => {
      it('subtracts unsigned and signed integers', async () => {
        expect(await instance.sub.staticCall(1, 1)).to.equal(0);
        expect(await instance.sub.staticCall(1, -1)).to.equal(2);
      });

      describe('reverts if', () => {
        it('signed integer is negative and has absolute value greater than unsigned integer', async () => {
          await expect(instance.sub.staticCall(0, 1)).to.be.revertedWithPanic(
            PANIC_CODES.ARITHMETIC_UNDER_OR_OVERFLOW,
          );
        });
      });
    });

    describe('#toString(uint256,uint256)', () => {
      it('returns 0 if input is 0', async () => {
        for (let radix = 2; radix <= 36; radix++) {
          expect(
            await instance['toString(uint256,uint256)'].staticCall(0n, radix),
          ).to.equal('0');
        }
      });

      it('returns string representation of number in given radix up to 36', async () => {
        for (let radix = 2; radix <= 36; radix++) {
          for (let i = 0; i < 12; i++) {
            const value = BigInt(i);
            const string = value.toString(radix);

            expect(
              await instance['toString(uint256,uint256)'].staticCall(
                value,
                radix,
              ),
            ).to.equal(string);
          }

          expect(
            await instance['toString(uint256,uint256)'].staticCall(
              ethers.MaxUint256,
              radix,
            ),
          ).to.equal(ethers.MaxUint256.toString(radix));
        }
      });

      describe('reverts if', () => {
        it('radix is 0', async () => {
          await expect(
            instance['toString(uint256,uint256)'].staticCall(0n, 0n),
          ).to.be.revertedWithCustomError(instance, 'UintUtils__InvalidBase');

          await expect(
            instance['toString(uint256,uint256)'].staticCall(1n, 0n),
          ).to.be.revertedWithCustomError(instance, 'UintUtils__InvalidBase');
        });

        it('radix is 1', async () => {
          await expect(
            instance['toString(uint256,uint256)'].staticCall(0n, 1n),
          ).to.be.revertedWithCustomError(instance, 'UintUtils__InvalidBase');

          await expect(
            instance['toString(uint256,uint256)'].staticCall(1n, 1n),
          ).to.be.revertedWithCustomError(instance, 'UintUtils__InvalidBase');
        });

        it('radix is greater than 36', async () => {
          await expect(
            instance['toString(uint256,uint256)'].staticCall(0n, 37n),
          ).to.be.revertedWithCustomError(instance, 'UintUtils__InvalidBase');

          await expect(
            instance['toString(uint256,uint256)'].staticCall(1n, 37n),
          ).to.be.revertedWithCustomError(instance, 'UintUtils__InvalidBase');
        });
      });
    });

    describe('#toString(uint256,uint256,uint256)', () => {
      it('returns empty string if input is 0 and length is 0', async () => {
        for (let radix = 2; radix <= 36; radix++) {
          expect(
            await instance['toString(uint256,uint256,uint256)'].staticCall(
              0n,
              radix,
              0n,
            ),
          ).to.equal('');
        }
      });

      it('returns string representation of number in given radix up to 36', async () => {
        for (let radix = 2; radix <= 36; radix++) {
          for (let value of values) {
            const string = value.toString(radix);
            const length = string.length;

            const result = await instance[
              'toString(uint256,uint256,uint256)'
            ].staticCall(value, radix, length);

            expect(result).to.equal(string);
          }
        }
      });

      it('returns string with specified zero padding', async () => {
        for (let radix = 2; radix <= 36; radix++) {
          const value = 1;
          const length = 100;

          const result = await instance[
            'toString(uint256,uint256,uint256)'
          ].staticCall(value, radix, length);

          expect(result).to.have.length(length);
        }
      });

      describe('reverts if', () => {
        it('radix is 0', async () => {
          await expect(
            instance['toString(uint256,uint256,uint256)'].staticCall(
              0n,
              0n,
              0n,
            ),
          ).to.be.revertedWithCustomError(instance, 'UintUtils__InvalidBase');

          await expect(
            instance['toString(uint256,uint256,uint256)'].staticCall(
              1n,
              0n,
              0n,
            ),
          ).to.be.revertedWithCustomError(instance, 'UintUtils__InvalidBase');
        });

        it('radix is 1', async () => {
          await expect(
            instance['toString(uint256,uint256,uint256)'].staticCall(
              0n,
              1n,
              0n,
            ),
          ).to.be.revertedWithCustomError(instance, 'UintUtils__InvalidBase');

          await expect(
            instance['toString(uint256,uint256,uint256)'].staticCall(
              1n,
              1n,
              0n,
            ),
          ).to.be.revertedWithCustomError(instance, 'UintUtils__InvalidBase');
        });

        it('radix is greater than 36', async () => {
          await expect(
            instance['toString(uint256,uint256,uint256)'].staticCall(
              0n,
              37n,
              0n,
            ),
          ).to.be.revertedWithCustomError(instance, 'UintUtils__InvalidBase');

          await expect(
            instance['toString(uint256,uint256,uint256)'].staticCall(
              1n,
              37n,
              0n,
            ),
          ).to.be.revertedWithCustomError(instance, 'UintUtils__InvalidBase');
        });
      });

      it('padding is insufficient', async () => {
        for (let radix = 2; radix <= 10; radix++) {
          await expect(
            instance['toString(uint256,uint256,uint256)'].staticCall(
              1n,
              radix,
              0n,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );

          await expect(
            instance['toString(uint256,uint256,uint256)'].staticCall(
              radix,
              radix,
              1n,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );
        }
      });
    });

    describe('#toBinString(uint256)', () => {
      it('returns 0b0 if input is 0', async () => {
        expect(await instance['toBinString(uint256)'].staticCall(0n)).to.equal(
          '0b0',
        );
      });

      it('returns binary string representation of a number', async () => {
        for (const value of values) {
          expect(
            await instance['toBinString(uint256)'].staticCall(value),
          ).to.equal(`0b${value.toString(2)}`);
        }
      });
    });

    describe('#toBinString(uint256,uint256)', () => {
      it('returns empty 0b-prefixed string if input is 0 and length is 0', async () => {
        expect(
          await instance['toBinString(uint256,uint256)'].staticCall(0n, 0n),
        ).to.equal('0b');
      });

      it('returns 0b-prefixed binary string representation of a number', async () => {
        for (let value of values) {
          const string = `0b${value.toString(2)}`;
          const length = string.length - 2;

          const result = await instance[
            'toBinString(uint256,uint256)'
          ].staticCall(value, length);

          expect(result).to.equal(string);
        }
      });

      it('returns string with specified zero padding', async () => {
        const value = 1;
        const length = 100;

        const result = await instance[
          'toBinString(uint256,uint256)'
        ].staticCall(value, length);

        expect(result).to.have.length(length + 2);
      });

      describe('reverts if', () => {
        it('padding is insufficient', async () => {
          await expect(
            instance['toBinString(uint256,uint256)'].staticCall(0b1, 0n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );

          await expect(
            instance['toBinString(uint256,uint256)'].staticCall(0b10, 1n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );
        });
      });
    });

    describe('#toOctString(uint256)', () => {
      it('returns 0o0 if input is 0', async () => {
        expect(await instance['toOctString(uint256)'].staticCall(0n)).to.equal(
          '0o0',
        );
      });

      it('returns octal string representation of a number', async () => {
        for (const value of values) {
          expect(
            await instance['toOctString(uint256)'].staticCall(value),
          ).to.equal(`0o${value.toString(8)}`);
        }
      });
    });

    describe('#toOctString(uint256,uint256)', () => {
      it('returns empty 0o-prefixed string if input is 0 and length is 0', async () => {
        expect(
          await instance['toOctString(uint256,uint256)'].staticCall(0n, 0n),
        ).to.equal('0o');
      });

      it('returns 0o-prefixed octal string representation of a number', async () => {
        for (let value of values) {
          const string = `0o${value.toString(8)}`;
          const length = string.length - 2;

          const result = await instance[
            'toOctString(uint256,uint256)'
          ].staticCall(value, length);

          expect(result).to.equal(string);
        }
      });

      it('returns string with specified zero padding', async () => {
        const value = 1;
        const length = 100;

        const result = await instance[
          'toOctString(uint256,uint256)'
        ].staticCall(value, length);

        expect(result).to.have.length(length + 2);
      });

      describe('reverts if', () => {
        it('padding is insufficient', async () => {
          await expect(
            instance['toOctString(uint256,uint256)'].staticCall(0o1, 0n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );

          await expect(
            instance['toOctString(uint256,uint256)'].staticCall(0o10, 1n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );
        });
      });
    });

    describe('#toDecString(uint256)', () => {
      it('returns 0 if input is 0', async () => {
        expect(await instance['toDecString(uint256)'].staticCall(0n)).to.equal(
          '0',
        );
      });

      it('returns decimal string representation of number', async () => {
        for (let i = 0; i < 12; i++) {
          const string = i.toString();
          const number = BigInt(string);
          expect(
            await instance['toDecString(uint256)'].staticCall(number),
          ).to.equal(string);
        }

        expect(
          await instance['toDecString(uint256)'].staticCall(ethers.MaxUint256),
        ).to.equal(ethers.MaxUint256.toString());
      });
    });

    describe('#toDecString(uint256,uint256)', () => {
      it('returns empty string if input is 0 and length is 0', async () => {
        expect(
          await instance['toDecString(uint256,uint256)'].staticCall(0n, 0n),
        ).to.equal('');
      });

      it('returns decimal string representation of a number', async () => {
        for (let value of values) {
          const string = value.toString();
          const length = string.length;

          const result = await instance[
            'toDecString(uint256,uint256)'
          ].staticCall(value, length);

          expect(result).to.equal(string);

          expect(BigInt(result)).to.equal(value);
          expect(result.length).to.equal(length);
        }
      });

      it('returns string with specified zero padding', async () => {
        const value = 1;
        const length = 100;

        const result = await instance[
          'toDecString(uint256,uint256)'
        ].staticCall(value, length);

        expect(result).to.have.length(length);
      });

      describe('reverts if', () => {
        it('padding is insufficient', async () => {
          await expect(
            instance['toDecString(uint256,uint256)'].staticCall(1n, 0n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );

          await expect(
            instance['toDecString(uint256,uint256)'].staticCall(10n, 1n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );
        });
      });
    });

    describe('#toHexString(uint256)', () => {
      it('returns 0x00 if input is 0', async () => {
        expect(await instance['toHexString(uint256)'].staticCall(0n)).to.equal(
          '0x00',
        );
      });

      it('returns hexadecimal string representation of a number', async () => {
        for (const value of values) {
          expect(
            await instance['toHexString(uint256)'].staticCall(value),
          ).to.equal(ethers.toBeHex(value));
        }
      });
    });

    describe('#toHexString(uint256,uint256)', () => {
      it('returns empty 0x-prefixed string if input is 0 and length is 0', async () => {
        expect(
          await instance['toHexString(uint256,uint256)'].staticCall(0n, 0n),
        ).to.equal('0x');
      });

      it('returns 0x-prefixed hexadecimal string representation of a number', async () => {
        for (let value of values) {
          const string = ethers.toBeHex(value);
          const length = (string.length - 2) / 2;

          const result = await instance[
            'toHexString(uint256,uint256)'
          ].staticCall(value, length);

          expect(result).to.equal(string);
        }
      });

      it('returns string with specified zero padding (in bytes)', async () => {
        const value = 1;
        const length = 100;

        const result = await instance[
          'toHexString(uint256,uint256)'
        ].staticCall(value, length);

        expect(result).to.have.length(length * 2 + 2);
      });

      describe('reverts if', () => {
        it('padding is insufficient', async () => {
          await expect(
            instance['toHexString(uint256,uint256)'].staticCall(1n, 0n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );

          await expect(
            instance['toHexString(uint256,uint256)'].staticCall(256n, 1n),
          ).to.be.revertedWithCustomError(
            instance,
            'UintUtils__InsufficientPadding',
          );
        });
      });
    });
  });
});
