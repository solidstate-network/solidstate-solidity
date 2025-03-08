import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { bigintToBytes32, bigintToAddress } from '@solidstate/library';
import {
  __hh_exposed_DoublyLinkedList,
  __hh_exposed_DoublyLinkedList__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

// data structures can be defined at any storage slot
// it doesn't matter which slot is used as long as it's consistent
const STORAGE_SLOT = 0n;

describe('DoublyLinkedList', async () => {
  describe('Bytes32List', async () => {
    let instance: __hh_exposed_DoublyLinkedList;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new __hh_exposed_DoublyLinkedList__factory(
        deployer,
      ).deploy();
    });

    describe('__internal', () => {
      const zeroBytes32 = bigintToBytes32(0);
      const oneBytes32 = bigintToBytes32(1);
      const twoBytes32 = bigintToBytes32(2);
      const threeBytes32 = bigintToBytes32(3);

      describe('#contains(bytes32)', () => {
        it('returns true if the value has been added', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.be.true;
          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.be.false;
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.be.false;
        });

        it('returns false for zero value', async () => {
          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.be.false;
        });
      });

      describe('#prev(bytes32)', () => {
        it('returns the previous value in the list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.eq(oneBytes32);
        });

        it('returns zero if the value is at the beginning of the list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(zeroBytes32);
        });

        it('returns last value in list if input is zero', async () => {
          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.eq(zeroBytes32);

          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.eq(twoBytes32);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
                STORAGE_SLOT,
                oneBytes32,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#next(bytes32)', () => {
        it('returns the next value in the list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(twoBytes32);
        });

        it('returns zero if the value is at the end of the list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );

          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(zeroBytes32);
        });

        it('returns first value in list if input is zero', async () => {
          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.eq(zeroBytes32);

          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.eq(oneBytes32);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
                STORAGE_SLOT,
                oneBytes32,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertBefore(bytes32,bytes32)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance[
              '__hh_exposed_insertBefore(uint256,bytes32,bytes32)'
            ].staticCall(STORAGE_SLOT, zeroBytes32, oneBytes32),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );

          expect(
            await instance[
              '__hh_exposed_insertBefore(uint256,bytes32,bytes32)'
            ].staticCall(STORAGE_SLOT, zeroBytes32, oneBytes32),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['__hh_exposed_insertBefore(uint256,bytes32,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
            oneBytes32,
          );

          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(zeroBytes32);

          await instance['__hh_exposed_insertBefore(uint256,bytes32,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.eq(oneBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['__hh_exposed_insertBefore(uint256,bytes32,bytes32)'](
                STORAGE_SLOT,
                zeroBytes32,
                zeroBytes32,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['__hh_exposed_insertBefore(uint256,bytes32,bytes32)'](
                STORAGE_SLOT,
                oneBytes32,
                twoBytes32,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertAfter(bytes32,bytes32)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance[
              '__hh_exposed_insertAfter(uint256,bytes32,bytes32)'
            ].staticCall(STORAGE_SLOT, zeroBytes32, oneBytes32),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );

          expect(
            await instance[
              '__hh_exposed_insertAfter(uint256,bytes32,bytes32)'
            ].staticCall(STORAGE_SLOT, zeroBytes32, oneBytes32),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['__hh_exposed_insertAfter(uint256,bytes32,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
            oneBytes32,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(zeroBytes32);

          await instance['__hh_exposed_insertAfter(uint256,bytes32,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.eq(oneBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['__hh_exposed_insertAfter(uint256,bytes32,bytes32)'](
                STORAGE_SLOT,
                zeroBytes32,
                zeroBytes32,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['__hh_exposed_insertAfter(uint256,bytes32,bytes32)'](
                STORAGE_SLOT,
                oneBytes32,
                twoBytes32,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#push(bytes32)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['__hh_exposed_push(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );

          expect(
            await instance['__hh_exposed_push(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.be.false;
        });

        it('adds new value to end of list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );

          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(zeroBytes32);

          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(twoBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['__hh_exposed_push(uint256,bytes32)'](
                STORAGE_SLOT,
                zeroBytes32,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#pop()', () => {
        it('returns last value in list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance.__hh_exposed_pop_DoublyLinkedList_Bytes32List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(twoBytes32);
        });

        it('returns zero if list is empty', async () => {
          expect(
            await instance.__hh_exposed_pop_DoublyLinkedList_Bytes32List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(zeroBytes32);
        });

        it('removes last value from list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          await instance.__hh_exposed_pop_DoublyLinkedList_Bytes32List(
            STORAGE_SLOT,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.be.false;

          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.eq(oneBytes32);

          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(zeroBytes32);
        });
      });

      describe('#shift()', () => {
        it('returns first value in list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance.__hh_exposed_shift_DoublyLinkedList_Bytes32List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(oneBytes32);
        });

        it('returns zero if list is empty', async () => {
          expect(
            await instance.__hh_exposed_shift_DoublyLinkedList_Bytes32List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(zeroBytes32);
        });

        it('removes first value from list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          await instance.__hh_exposed_shift_DoublyLinkedList_Bytes32List(
            STORAGE_SLOT,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.be.false;

          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.eq(twoBytes32);

          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.eq(zeroBytes32);
        });
      });

      describe('#unshift(bytes32)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['__hh_exposed_unshift(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['__hh_exposed_unshift(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );

          expect(
            await instance['__hh_exposed_unshift(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.be.false;
        });

        it('adds new value to beginning of list', async () => {
          await instance['__hh_exposed_unshift(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(zeroBytes32);

          await instance['__hh_exposed_unshift(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(twoBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['__hh_exposed_unshift(uint256,bytes32)'](
                STORAGE_SLOT,
                zeroBytes32,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#remove(bytes32)', () => {
        it('returns true if value is removed from list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );

          expect(
            await instance['__hh_exposed_remove(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.be.true;
        });

        it('returns false if value is not removed from list', async () => {
          expect(
            await instance['__hh_exposed_remove(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.be.false;
        });

        it('removes value from list', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            threeBytes32,
          );

          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.be.false;

          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(threeBytes32);

          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              threeBytes32,
            ),
          ).to.eq(oneBytes32);
        });
      });

      describe('#replace(bytes32,bytes32)', () => {
        it('returns true if value is replaced', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );

          expect(
            await instance[
              '__hh_exposed_replace(uint256,bytes32,bytes32)'
            ].staticCall(STORAGE_SLOT, oneBytes32, twoBytes32),
          ).to.be.true;
        });

        it('returns false if value is not replaced', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance[
              '__hh_exposed_replace(uint256,bytes32,bytes32)'
            ].staticCall(STORAGE_SLOT, oneBytes32, twoBytes32),
          ).to.be.false;
        });

        it('replaces existing value with new value', async () => {
          const newValue = bigintToBytes32(4);

          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            threeBytes32,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.be.false;

          await instance['__hh_exposed_replace(uint256,bytes32,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
            newValue,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.be.false;
          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.be.true;

          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(newValue);
          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.eq(oneBytes32);
          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.eq(threeBytes32);
          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              threeBytes32,
            ),
          ).to.eq(newValue);
        });

        it('does nothing if new value matches existing value', async () => {
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_push(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          await instance['__hh_exposed_replace(uint256,bytes32,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
            oneBytes32,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.be.true;

          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.eq(oneBytes32);
          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(zeroBytes32);
          expect(
            await instance['__hh_exposed_next(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.eq(twoBytes32);
          expect(
            await instance['__hh_exposed_prev(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.eq(oneBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await instance['__hh_exposed_push(uint256,bytes32)'](
              STORAGE_SLOT,
              oneBytes32,
            );

            await expect(
              instance['__hh_exposed_replace(uint256,bytes32,bytes32)'](
                STORAGE_SLOT,
                oneBytes32,
                zeroBytes32,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('old value is not contained in list', async () => {
            await expect(
              instance[
                '__hh_exposed_replace(uint256,bytes32,bytes32)'
              ].staticCall(STORAGE_SLOT, oneBytes32, twoBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });
    });
  });

  describe('AddressList', async () => {
    let instance: __hh_exposed_DoublyLinkedList;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new __hh_exposed_DoublyLinkedList__factory(
        deployer,
      ).deploy();
    });

    describe('__internal', () => {
      const zeroAddress = bigintToAddress(0);
      const oneAddress = bigintToAddress(1);
      const twoAddress = bigintToAddress(2);
      const threeAddress = bigintToAddress(3);

      describe('#contains(address)', () => {
        it('returns true if the value has been added', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.be.true;
          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.be.false;
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.be.false;
        });

        it('returns false for zero value', async () => {
          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.be.false;
        });
      });

      describe('#prev(address)', () => {
        it('returns the previous value in the list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.eq(oneAddress);
        });

        it('returns zero if the value is at the beginning of the list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(zeroAddress);
        });

        it('returns last value in list if input is zero', async () => {
          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.eq(zeroAddress);

          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.eq(twoAddress);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['__hh_exposed_prev(uint256,address)'].staticCall(
                STORAGE_SLOT,
                oneAddress,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#next(address)', () => {
        it('returns the next value in the list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(twoAddress);
        });

        it('returns zero if the value is at the end of the list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(zeroAddress);
        });

        it('returns first value in list if input is zero', async () => {
          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.eq(zeroAddress);

          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.eq(oneAddress);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['__hh_exposed_next(uint256,address)'].staticCall(
                STORAGE_SLOT,
                oneAddress,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertBefore(address,address)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance[
              '__hh_exposed_insertBefore(uint256,address,address)'
            ].staticCall(STORAGE_SLOT, zeroAddress, oneAddress),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance[
              '__hh_exposed_insertBefore(uint256,address,address)'
            ].staticCall(STORAGE_SLOT, zeroAddress, oneAddress),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['__hh_exposed_insertBefore(uint256,address,address)'](
            STORAGE_SLOT,
            zeroAddress,
            oneAddress,
          );

          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(zeroAddress);

          await instance['__hh_exposed_insertBefore(uint256,address,address)'](
            STORAGE_SLOT,
            oneAddress,
            twoAddress,
          );

          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.eq(oneAddress);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['__hh_exposed_insertBefore(uint256,address,address)'](
                STORAGE_SLOT,
                zeroAddress,
                zeroAddress,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['__hh_exposed_insertBefore(uint256,address,address)'](
                STORAGE_SLOT,
                oneAddress,
                twoAddress,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertAfter(address,address)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance[
              '__hh_exposed_insertAfter(uint256,address,address)'
            ].staticCall(STORAGE_SLOT, zeroAddress, oneAddress),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance[
              '__hh_exposed_insertAfter(uint256,address,address)'
            ].staticCall(STORAGE_SLOT, zeroAddress, oneAddress),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['__hh_exposed_insertAfter(uint256,address,address)'](
            STORAGE_SLOT,
            zeroAddress,
            oneAddress,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(zeroAddress);

          await instance['__hh_exposed_insertAfter(uint256,address,address)'](
            STORAGE_SLOT,
            oneAddress,
            twoAddress,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.eq(oneAddress);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['__hh_exposed_insertAfter(uint256,address,address)'](
                STORAGE_SLOT,
                zeroAddress,
                zeroAddress,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['__hh_exposed_insertAfter(uint256,address,address)'](
                STORAGE_SLOT,
                oneAddress,
                twoAddress,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#push(address)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['__hh_exposed_push(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance['__hh_exposed_push(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.be.false;
        });

        it('adds new value to end of list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(zeroAddress);

          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(twoAddress);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['__hh_exposed_push(uint256,address)'](
                STORAGE_SLOT,
                zeroAddress,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#pop()', () => {
        it('returns last value in list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance.__hh_exposed_pop_DoublyLinkedList_AddressList.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(twoAddress);
        });

        it('returns zero if list is empty', async () => {
          expect(
            await instance.__hh_exposed_pop_DoublyLinkedList_AddressList.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(zeroAddress);
        });

        it('removes last value from list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          await instance.__hh_exposed_pop_DoublyLinkedList_AddressList(
            STORAGE_SLOT,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.be.false;

          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.eq(oneAddress);

          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(zeroAddress);
        });
      });

      describe('#shift()', () => {
        it('returns first value in list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance.__hh_exposed_shift_DoublyLinkedList_AddressList.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(oneAddress);
        });

        it('returns zero if list is empty', async () => {
          expect(
            await instance.__hh_exposed_shift_DoublyLinkedList_AddressList.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(zeroAddress);
        });

        it('removes first value from list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          await instance.__hh_exposed_shift_DoublyLinkedList_AddressList(
            STORAGE_SLOT,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.be.false;

          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.eq(twoAddress);

          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.eq(zeroAddress);
        });
      });

      describe('#unshift(address)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['__hh_exposed_unshift(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['__hh_exposed_unshift(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance['__hh_exposed_unshift(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.be.false;
        });

        it('adds new value to beginning of list', async () => {
          await instance['__hh_exposed_unshift(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(zeroAddress);

          await instance['__hh_exposed_unshift(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(twoAddress);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['__hh_exposed_unshift(uint256,address)'](
                STORAGE_SLOT,
                zeroAddress,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#remove(address)', () => {
        it('returns true if value is removed from list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance['__hh_exposed_remove(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.be.true;
        });

        it('returns false if value is not removed from list', async () => {
          expect(
            await instance['__hh_exposed_remove(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.be.false;
        });

        it('removes value from list', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            threeAddress,
          );

          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.be.false;

          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(threeAddress);

          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              threeAddress,
            ),
          ).to.eq(oneAddress);
        });
      });

      describe('#replace(address,address)', () => {
        it('returns true if value is replaced', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance[
              '__hh_exposed_replace(uint256,address,address)'
            ].staticCall(STORAGE_SLOT, oneAddress, twoAddress),
          ).to.be.true;
        });

        it('returns false if value is not replaced', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance[
              '__hh_exposed_replace(uint256,address,address)'
            ].staticCall(STORAGE_SLOT, oneAddress, twoAddress),
          ).to.be.false;
        });

        it('replaces existing value with new value', async () => {
          const newValue = bigintToAddress(4);

          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            threeAddress,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.be.false;

          await instance['__hh_exposed_replace(uint256,address,address)'](
            STORAGE_SLOT,
            twoAddress,
            newValue,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.be.false;
          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.be.true;

          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(newValue);
          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.eq(oneAddress);
          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.eq(threeAddress);
          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              threeAddress,
            ),
          ).to.eq(newValue);
        });

        it('does nothing if new value matches existing value', async () => {
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_push(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          await instance['__hh_exposed_replace(uint256,address,address)'](
            STORAGE_SLOT,
            oneAddress,
            oneAddress,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.be.true;

          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.eq(oneAddress);
          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(zeroAddress);
          expect(
            await instance['__hh_exposed_next(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.eq(twoAddress);
          expect(
            await instance['__hh_exposed_prev(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.eq(oneAddress);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await instance['__hh_exposed_push(uint256,address)'](
              STORAGE_SLOT,
              oneAddress,
            );

            await expect(
              instance['__hh_exposed_replace(uint256,address,address)'](
                STORAGE_SLOT,
                oneAddress,
                zeroAddress,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('old value is not contained in list', async () => {
            await expect(
              instance[
                '__hh_exposed_replace(uint256,address,address)'
              ].staticCall(STORAGE_SLOT, oneAddress, twoAddress),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });
    });
  });

  describe('Uint256List', async () => {
    let instance: __hh_exposed_DoublyLinkedList;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new __hh_exposed_DoublyLinkedList__factory(
        deployer,
      ).deploy();
    });

    describe('__internal', () => {
      const zeroUint256 = 0;
      const oneUint256 = 1;
      const twoUint256 = 2;
      const threeUint256 = 3;

      describe('#contains(uint256)', () => {
        it('returns true if the value has been added', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.be.true;
          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              twoUint256,
            ),
          ).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.be.false;
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              twoUint256,
            ),
          ).to.be.false;
        });

        it('returns false for zero value', async () => {
          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zeroUint256,
            ),
          ).to.be.false;
        });
      });

      describe('#prev(uint256)', () => {
        it('returns the previous value in the list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              twoUint256,
            ),
          ).to.eq(oneUint256);
        });

        it('returns zero if the value is at the beginning of the list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(zeroUint256);
        });

        it('returns last value in list if input is zero', async () => {
          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zeroUint256,
            ),
          ).to.eq(zeroUint256);

          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zeroUint256,
            ),
          ).to.eq(twoUint256);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
                STORAGE_SLOT,
                oneUint256,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#next(uint256)', () => {
        it('returns the next value in the list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(twoUint256);
        });

        it('returns zero if the value is at the end of the list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );

          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(zeroUint256);
        });

        it('returns first value in list if input is zero', async () => {
          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zeroUint256,
            ),
          ).to.eq(zeroUint256);

          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zeroUint256,
            ),
          ).to.eq(oneUint256);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['__hh_exposed_next(uint256,uint256)'].staticCall(
                STORAGE_SLOT,
                oneUint256,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertBefore(uint256,uint256)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance[
              '__hh_exposed_insertBefore(uint256,uint256,uint256)'
            ].staticCall(STORAGE_SLOT, zeroUint256, oneUint256),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );

          expect(
            await instance[
              '__hh_exposed_insertBefore(uint256,uint256,uint256)'
            ].staticCall(STORAGE_SLOT, zeroUint256, oneUint256),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['__hh_exposed_insertBefore(uint256,uint256,uint256)'](
            STORAGE_SLOT,
            zeroUint256,
            oneUint256,
          );

          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(zeroUint256);

          await instance['__hh_exposed_insertBefore(uint256,uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
            twoUint256,
          );

          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              twoUint256,
            ),
          ).to.eq(oneUint256);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['__hh_exposed_insertBefore(uint256,uint256,uint256)'](
                STORAGE_SLOT,
                zeroUint256,
                zeroUint256,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['__hh_exposed_insertBefore(uint256,uint256,uint256)'](
                STORAGE_SLOT,
                oneUint256,
                twoUint256,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertAfter(uint256,uint256)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance[
              '__hh_exposed_insertAfter(uint256,uint256,uint256)'
            ].staticCall(STORAGE_SLOT, zeroUint256, oneUint256),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );

          expect(
            await instance[
              '__hh_exposed_insertAfter(uint256,uint256,uint256)'
            ].staticCall(STORAGE_SLOT, zeroUint256, oneUint256),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['__hh_exposed_insertAfter(uint256,uint256,uint256)'](
            STORAGE_SLOT,
            zeroUint256,
            oneUint256,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(zeroUint256);

          await instance['__hh_exposed_insertAfter(uint256,uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
            twoUint256,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              twoUint256,
            ),
          ).to.eq(oneUint256);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['__hh_exposed_insertAfter(uint256,uint256,uint256)'](
                STORAGE_SLOT,
                zeroUint256,
                zeroUint256,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['__hh_exposed_insertAfter(uint256,uint256,uint256)'](
                STORAGE_SLOT,
                oneUint256,
                twoUint256,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#push(uint256)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['__hh_exposed_push(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );

          expect(
            await instance['__hh_exposed_push(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.be.false;
        });

        it('adds new value to end of list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );

          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(zeroUint256);

          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(twoUint256);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['__hh_exposed_push(uint256,uint256)'](
                STORAGE_SLOT,
                zeroUint256,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#pop()', () => {
        it('returns last value in list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          expect(
            await instance.__hh_exposed_pop_DoublyLinkedList_Uint256List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(twoUint256);
        });

        it('returns zero if list is empty', async () => {
          expect(
            await instance.__hh_exposed_pop_DoublyLinkedList_Uint256List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(zeroUint256);
        });

        it('removes last value from list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          await instance.__hh_exposed_pop_DoublyLinkedList_Uint256List(
            STORAGE_SLOT,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              twoUint256,
            ),
          ).to.be.false;

          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zeroUint256,
            ),
          ).to.eq(oneUint256);

          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(zeroUint256);
        });
      });

      describe('#shift()', () => {
        it('returns first value in list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          expect(
            await instance.__hh_exposed_shift_DoublyLinkedList_Uint256List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(oneUint256);
        });

        it('returns zero if list is empty', async () => {
          expect(
            await instance.__hh_exposed_shift_DoublyLinkedList_Uint256List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(zeroUint256);
        });

        it('removes first value from list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          await instance.__hh_exposed_shift_DoublyLinkedList_Uint256List(
            STORAGE_SLOT,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.be.false;

          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zeroUint256,
            ),
          ).to.eq(twoUint256);

          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              twoUint256,
            ),
          ).to.eq(zeroUint256);
        });
      });

      describe('#unshift(uint256)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['__hh_exposed_unshift(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['__hh_exposed_unshift(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );

          expect(
            await instance['__hh_exposed_unshift(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.be.false;
        });

        it('adds new value to beginning of list', async () => {
          await instance['__hh_exposed_unshift(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(zeroUint256);

          await instance['__hh_exposed_unshift(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(twoUint256);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['__hh_exposed_unshift(uint256,uint256)'](
                STORAGE_SLOT,
                zeroUint256,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#remove(uint256)', () => {
        it('returns true if value is removed from list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );

          expect(
            await instance['__hh_exposed_remove(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.be.true;
        });

        it('returns false if value is not removed from list', async () => {
          expect(
            await instance['__hh_exposed_remove(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.be.false;
        });

        it('removes value from list', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            threeUint256,
          );

          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              twoUint256,
            ),
          ).to.be.false;

          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(threeUint256);

          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              threeUint256,
            ),
          ).to.eq(oneUint256);
        });
      });

      describe('#replace(uint256,uint256)', () => {
        it('returns true if value is replaced', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );

          expect(
            await instance[
              '__hh_exposed_replace(uint256,uint256,uint256)'
            ].staticCall(STORAGE_SLOT, oneUint256, twoUint256),
          ).to.be.true;
        });

        it('returns false if value is not replaced', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          expect(
            await instance[
              '__hh_exposed_replace(uint256,uint256,uint256)'
            ].staticCall(STORAGE_SLOT, oneUint256, twoUint256),
          ).to.be.false;
        });

        it('replaces existing value with new value', async () => {
          const newValue = 4;

          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            threeUint256,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.be.false;

          await instance['__hh_exposed_replace(uint256,uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
            newValue,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              twoUint256,
            ),
          ).to.be.false;
          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.be.true;

          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(newValue);
          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.eq(oneUint256);
          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.eq(threeUint256);
          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              threeUint256,
            ),
          ).to.eq(newValue);
        });

        it('does nothing if new value matches existing value', async () => {
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
          );
          await instance['__hh_exposed_push(uint256,uint256)'](
            STORAGE_SLOT,
            twoUint256,
          );

          await instance['__hh_exposed_replace(uint256,uint256,uint256)'](
            STORAGE_SLOT,
            oneUint256,
            oneUint256,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.be.true;

          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zeroUint256,
            ),
          ).to.eq(oneUint256);
          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(zeroUint256);
          expect(
            await instance['__hh_exposed_next(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              oneUint256,
            ),
          ).to.eq(twoUint256);
          expect(
            await instance['__hh_exposed_prev(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              twoUint256,
            ),
          ).to.eq(oneUint256);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await instance['__hh_exposed_push(uint256,uint256)'](
              STORAGE_SLOT,
              oneUint256,
            );

            await expect(
              instance['__hh_exposed_replace(uint256,uint256,uint256)'](
                STORAGE_SLOT,
                oneUint256,
                zeroUint256,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('old value is not contained in list', async () => {
            await expect(
              instance[
                '__hh_exposed_replace(uint256,uint256,uint256)'
              ].staticCall(STORAGE_SLOT, oneUint256, twoUint256),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });
    });
  });
});
