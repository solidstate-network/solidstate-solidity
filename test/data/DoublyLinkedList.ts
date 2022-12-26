import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { bnToBytes32, bnToAddress } from '@solidstate/library';
import {
  DoublyLinkedListBytes32Mock,
  DoublyLinkedListBytes32Mock__factory,
  DoublyLinkedListAddressMock,
  DoublyLinkedListAddressMock__factory,
  DoublyLinkedListUintMock,
  DoublyLinkedListUintMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe('DoublyLinkedList', async () => {
  describe('Bytes32List', async () => {
    let instance: DoublyLinkedListBytes32Mock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new DoublyLinkedListBytes32Mock__factory(
        deployer,
      ).deploy();
    });

    describe('__internal', () => {
      const zeroBytes32 = bnToBytes32(ethers.constants.Zero);
      const oneBytes32 = bnToBytes32(ethers.constants.One);
      const twoBytes32 = bnToBytes32(ethers.constants.Two);
      const threeBytes32 = bnToBytes32(BigNumber.from('3'));

      describe('#contains(bytes32)', () => {
        it('returns true if the value has been added', async () => {
          await instance['push(bytes32)'](oneBytes32);
          await instance['push(bytes32)'](twoBytes32);

          expect(await instance['contains(bytes32)'](oneBytes32)).to.be.true;
          expect(await instance['contains(bytes32)'](twoBytes32)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance['contains(bytes32)'](oneBytes32)).to.be.false;
          await instance['push(bytes32)'](oneBytes32);
          expect(await instance['contains(bytes32)'](twoBytes32)).to.be.false;
        });

        it('returns false for zero value', async () => {
          expect(await instance['contains(bytes32)'](zeroBytes32)).to.be.false;
        });
      });

      describe('#prev(bytes32)', () => {
        it('returns the previous value in the list', async () => {
          await instance['push(bytes32)'](oneBytes32);
          await instance['push(bytes32)'](twoBytes32);

          expect(await instance['prev(bytes32)'](twoBytes32)).to.eq(oneBytes32);
        });

        it('returns zero if the value is at the beginning of the list', async () => {
          await instance['push(bytes32)'](oneBytes32);

          expect(await instance['prev(bytes32)'](oneBytes32)).to.eq(
            zeroBytes32,
          );
        });

        it('returns last value in list if input is zero', async () => {
          expect(await instance['next(bytes32)'](zeroBytes32)).to.eq(
            zeroBytes32,
          );

          await instance['push(bytes32)'](oneBytes32);
          await instance['push(bytes32)'](twoBytes32);

          expect(await instance['prev(bytes32)'](zeroBytes32)).to.eq(
            twoBytes32,
          );
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['prev(bytes32)'](oneBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidValue',
            );
          });
        });
      });

      describe('#next(bytes32)', () => {
        it('returns the next value in the list', async () => {
          await instance['push(bytes32)'](oneBytes32);
          await instance['push(bytes32)'](twoBytes32);

          expect(await instance['next(bytes32)'](oneBytes32)).to.eq(twoBytes32);
        });

        it('returns zero if the value is at the end of the list', async () => {
          await instance['push(bytes32)'](oneBytes32);

          expect(await instance['next(bytes32)'](oneBytes32)).to.eq(
            zeroBytes32,
          );
        });

        it('returns first value in list if input is zero', async () => {
          expect(await instance['next(bytes32)'](zeroBytes32)).to.eq(
            zeroBytes32,
          );

          await instance['push(bytes32)'](oneBytes32);
          await instance['push(bytes32)'](twoBytes32);

          expect(await instance['next(bytes32)'](zeroBytes32)).to.eq(
            oneBytes32,
          );
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['next(bytes32)'](oneBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidValue',
            );
          });
        });
      });

      describe('#insertBefore(bytes32,bytes32)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance.callStatic['insertBefore(bytes32,bytes32)'](
              zeroBytes32,
              oneBytes32,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['push(bytes32)'](oneBytes32);

          expect(
            await instance.callStatic['insertBefore(bytes32,bytes32)'](
              zeroBytes32,
              oneBytes32,
            ),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['insertBefore(bytes32,bytes32)'](
            zeroBytes32,
            oneBytes32,
          );

          expect(await instance['next(bytes32)'](oneBytes32)).to.eq(
            zeroBytes32,
          );

          await instance['insertBefore(bytes32,bytes32)'](
            oneBytes32,
            twoBytes32,
          );

          expect(await instance['next(bytes32)'](twoBytes32)).to.eq(oneBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['insertBefore(bytes32,bytes32)'](
                zeroBytes32,
                zeroBytes32,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidValue',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['insertBefore(bytes32,bytes32)'](oneBytes32, twoBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidValue',
            );
          });
        });
      });

      describe('#insertAfter(bytes32,bytes32)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance.callStatic['insertAfter(bytes32,bytes32)'](
              zeroBytes32,
              oneBytes32,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['push(bytes32)'](oneBytes32);

          expect(
            await instance.callStatic['insertAfter(bytes32,bytes32)'](
              zeroBytes32,
              oneBytes32,
            ),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['insertAfter(bytes32,bytes32)'](
            zeroBytes32,
            oneBytes32,
          );

          expect(await instance['prev(bytes32)'](oneBytes32)).to.eq(
            zeroBytes32,
          );

          await instance['insertAfter(bytes32,bytes32)'](
            oneBytes32,
            twoBytes32,
          );

          expect(await instance['prev(bytes32)'](twoBytes32)).to.eq(oneBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['insertAfter(bytes32,bytes32)'](
                zeroBytes32,
                zeroBytes32,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidValue',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['insertAfter(bytes32,bytes32)'](oneBytes32, twoBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidValue',
            );
          });
        });
      });

      describe('#push(bytes32)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.callStatic['push(bytes32)'](oneBytes32)).to.be
            .true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['push(bytes32)'](oneBytes32);

          expect(await instance.callStatic['push(bytes32)'](oneBytes32)).to.be
            .false;
        });

        it('adds new value to end of list', async () => {
          await instance['push(bytes32)'](oneBytes32);

          expect(await instance['next(bytes32)'](oneBytes32)).to.eq(
            zeroBytes32,
          );

          await instance['push(bytes32)'](twoBytes32);

          expect(await instance['next(bytes32)'](oneBytes32)).to.eq(twoBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['push(bytes32)'](zeroBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidValue',
            );
          });
        });
      });

      describe('#pop()', () => {
        it('returns last value in list', async () => {
          await instance['push(bytes32)'](oneBytes32);
          await instance['push(bytes32)'](twoBytes32);

          expect(await instance.callStatic['pop()']()).to.eq(twoBytes32);
        });

        it('returns zero if list is empty', async () => {
          expect(await instance.callStatic['pop()']()).to.eq(zeroBytes32);
        });

        it('removes last value from list', async () => {
          await instance['push(bytes32)'](oneBytes32);
          await instance['push(bytes32)'](twoBytes32);

          await instance['pop()']();

          expect(await instance['contains(bytes32)'](twoBytes32)).to.be.false;

          expect(await instance['prev(bytes32)'](zeroBytes32)).to.eq(
            oneBytes32,
          );

          expect(await instance['next(bytes32)'](oneBytes32)).to.eq(
            zeroBytes32,
          );
        });
      });

      describe('#shift()', () => {
        it('returns first value in list', async () => {
          await instance['push(bytes32)'](oneBytes32);
          await instance['push(bytes32)'](twoBytes32);

          expect(await instance.callStatic['shift()']()).to.eq(oneBytes32);
        });

        it('returns zero if list is empty', async () => {
          expect(await instance.callStatic['shift()']()).to.eq(zeroBytes32);
        });

        it('removes first value from list', async () => {
          await instance['push(bytes32)'](oneBytes32);
          await instance['push(bytes32)'](twoBytes32);

          await instance['shift()']();

          expect(await instance['contains(bytes32)'](oneBytes32)).to.be.false;

          expect(await instance['next(bytes32)'](zeroBytes32)).to.eq(
            twoBytes32,
          );

          expect(await instance['prev(bytes32)'](twoBytes32)).to.eq(
            zeroBytes32,
          );
        });
      });

      describe('#unshift(bytes32)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.callStatic['unshift(bytes32)'](oneBytes32)).to
            .be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['unshift(bytes32)'](oneBytes32);

          expect(await instance.callStatic['unshift(bytes32)'](oneBytes32)).to
            .be.false;
        });

        it('adds new value to beginning of list', async () => {
          await instance['unshift(bytes32)'](oneBytes32);

          expect(await instance['prev(bytes32)'](oneBytes32)).to.eq(
            zeroBytes32,
          );

          await instance['unshift(bytes32)'](twoBytes32);

          expect(await instance['prev(bytes32)'](oneBytes32)).to.eq(twoBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['unshift(bytes32)'](zeroBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidValue',
            );
          });
        });
      });

      describe('#remove(bytes32)', () => {
        it('returns true if value is removed from list', async () => {
          await instance['push(bytes32)'](oneBytes32);

          expect(await instance.callStatic['remove(bytes32)'](oneBytes32)).to.be
            .true;
        });

        it('returns false if value is not removed from list', async () => {
          expect(await instance.callStatic['remove(bytes32)'](oneBytes32)).to.be
            .false;
        });

        it('removes value from list', async () => {
          await instance['push(bytes32)'](oneBytes32);
          await instance['push(bytes32)'](twoBytes32);
          await instance['push(bytes32)'](threeBytes32);

          await instance['remove(bytes32)'](twoBytes32);

          expect(await instance['contains(bytes32)'](twoBytes32)).to.be.false;

          expect(await instance['next(bytes32)'](oneBytes32)).to.eq(
            threeBytes32,
          );

          expect(await instance['prev(bytes32)'](threeBytes32)).to.eq(
            oneBytes32,
          );
        });
      });

      describe('#replace(bytes32,bytes32)', () => {
        it('returns true if value is replaced', async () => {
          await instance['push(bytes32)'](oneBytes32);

          expect(
            await instance.callStatic['replace(bytes32,bytes32)'](
              oneBytes32,
              twoBytes32,
            ),
          ).to.be.true;
        });

        it('returns false if value is not replaced', async () => {
          expect(
            await instance.callStatic['replace(bytes32,bytes32)'](
              oneBytes32,
              twoBytes32,
            ),
          ).to.be.false;

          await instance['push(bytes32)'](oneBytes32);
          await instance['push(bytes32)'](twoBytes32);

          expect(
            await instance.callStatic['replace(bytes32,bytes32)'](
              oneBytes32,
              twoBytes32,
            ),
          ).to.be.false;
        });

        it('replaces existing value with new value', async () => {
          const newValue = bnToBytes32(BigNumber.from('4'));

          await instance['push(bytes32)'](oneBytes32);
          await instance['push(bytes32)'](twoBytes32);
          await instance['push(bytes32)'](threeBytes32);

          expect(await instance['contains(bytes32)'](newValue)).to.be.false;

          await instance['replace(bytes32,bytes32)'](twoBytes32, newValue);

          expect(await instance['contains(bytes32)'](twoBytes32)).to.be.false;
          expect(await instance['contains(bytes32)'](newValue)).to.be.true;

          expect(await instance['next(bytes32)'](oneBytes32)).to.eq(newValue);
          expect(await instance['prev(bytes32)'](newValue)).to.eq(oneBytes32);
          expect(await instance['next(bytes32)'](newValue)).to.eq(threeBytes32);
          expect(await instance['prev(bytes32)'](threeBytes32)).to.eq(newValue);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['replace(bytes32,bytes32)'](oneBytes32, zeroBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidValue',
            );
          });
        });
      });
    });
  });
});
