import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { bigintToBytes16 } from '@solidstate/library';
import {
  $PackedDoublyLinkedList,
  $PackedDoublyLinkedList__factory,
} from '@solidstate/typechain-types';
import { storageUtilsSol } from '@solidstate/typechain-types/exposed/utils';
import { expect } from 'chai';
import { ethers } from 'hardhat';

// data structures can be defined at any storage slot
// it doesn't matter which slot is used as long as it's consistent
const STORAGE_SLOT = 0n;

describe('PackedDoublyLinkedList', async () => {
  describe('Bytes16List', async () => {
    let instance: $PackedDoublyLinkedList;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new $PackedDoublyLinkedList__factory(deployer).deploy();
    });

    describe('__internal', () => {
      const zeroBytes16 = bigintToBytes16(0);
      const oneBytes16 = bigintToBytes16(1);
      const twoBytes16 = bigintToBytes16(2);
      const threeBytes16 = bigintToBytes16(3);

      describe('#contains(bytes16)', () => {
        it('returns true if the value has been added', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          expect(
            await instance['$contains(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.be.true;
          expect(
            await instance['$contains(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              twoBytes16,
            ),
          ).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(
            await instance['$contains(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.be.false;
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          expect(
            await instance['$contains(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              twoBytes16,
            ),
          ).to.be.false;
        });

        it('returns false for zero value', async () => {
          expect(
            await instance['$contains(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              zeroBytes16,
            ),
          ).to.be.false;
        });
      });

      describe('#prev(bytes16)', () => {
        it('returns the previous value in the list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              twoBytes16,
            ),
          ).to.eq(oneBytes16);
        });

        it('returns zero if the value is at the beginning of the list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);

          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(zeroBytes16);
        });

        it('returns last value in list if input is zero', async () => {
          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              zeroBytes16,
            ),
          ).to.eq(zeroBytes16);

          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              zeroBytes16,
            ),
          ).to.eq(twoBytes16);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['$prev(uint256,bytes16)'].staticCall(
                STORAGE_SLOT,
                oneBytes16,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#next(bytes16)', () => {
        it('returns the next value in the list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(twoBytes16);
        });

        it('returns zero if the value is at the end of the list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);

          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(zeroBytes16);
        });

        it('returns first value in list if input is zero', async () => {
          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              zeroBytes16,
            ),
          ).to.eq(zeroBytes16);

          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              zeroBytes16,
            ),
          ).to.eq(oneBytes16);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['$next(uint256,bytes16)'].staticCall(
                STORAGE_SLOT,
                oneBytes16,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertBefore(bytes16,bytes16)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['$insertBefore(uint256,bytes16,bytes16)'].staticCall(
              STORAGE_SLOT,
              zeroBytes16,
              oneBytes16,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);

          expect(
            await instance['$insertBefore(uint256,bytes16,bytes16)'].staticCall(
              STORAGE_SLOT,
              zeroBytes16,
              oneBytes16,
            ),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['$insertBefore(uint256,bytes16,bytes16)'](
            STORAGE_SLOT,
            zeroBytes16,
            oneBytes16,
          );

          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(zeroBytes16);

          await instance['$insertBefore(uint256,bytes16,bytes16)'](
            STORAGE_SLOT,
            oneBytes16,
            twoBytes16,
          );

          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              twoBytes16,
            ),
          ).to.eq(oneBytes16);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['$insertBefore(uint256,bytes16,bytes16)'](
                STORAGE_SLOT,
                zeroBytes16,
                zeroBytes16,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['$insertBefore(uint256,bytes16,bytes16)'](
                STORAGE_SLOT,
                oneBytes16,
                twoBytes16,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertAfter(bytes16,bytes16)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['$insertAfter(uint256,bytes16,bytes16)'].staticCall(
              STORAGE_SLOT,
              zeroBytes16,
              oneBytes16,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);

          expect(
            await instance['$insertAfter(uint256,bytes16,bytes16)'].staticCall(
              STORAGE_SLOT,
              zeroBytes16,
              oneBytes16,
            ),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['$insertAfter(uint256,bytes16,bytes16)'](
            STORAGE_SLOT,
            zeroBytes16,
            oneBytes16,
          );

          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(zeroBytes16);

          await instance['$insertAfter(uint256,bytes16,bytes16)'](
            STORAGE_SLOT,
            oneBytes16,
            twoBytes16,
          );

          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              twoBytes16,
            ),
          ).to.eq(oneBytes16);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['$insertAfter(uint256,bytes16,bytes16)'](
                STORAGE_SLOT,
                zeroBytes16,
                zeroBytes16,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['$insertAfter(uint256,bytes16,bytes16)'](
                STORAGE_SLOT,
                oneBytes16,
                twoBytes16,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#push(bytes16)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['$push(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);

          expect(
            await instance['$push(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.be.false;
        });

        it('adds new value to end of list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);

          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(zeroBytes16);

          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(twoBytes16);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['$push(uint256,bytes16)'](STORAGE_SLOT, zeroBytes16),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#pop()', () => {
        it('returns last value in list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          expect(
            await instance.$pop_PackedDoublyLinkedList_Bytes16List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(twoBytes16);
        });

        it('returns zero if list is empty', async () => {
          expect(
            await instance.$pop_PackedDoublyLinkedList_Bytes16List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(zeroBytes16);
        });

        it('removes last value from list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          await instance.$pop_PackedDoublyLinkedList_Bytes16List(STORAGE_SLOT);

          expect(
            await instance['$contains(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              twoBytes16,
            ),
          ).to.be.false;

          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              zeroBytes16,
            ),
          ).to.eq(oneBytes16);

          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(zeroBytes16);
        });
      });

      describe('#shift()', () => {
        it('returns first value in list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          expect(
            await instance.$shift_PackedDoublyLinkedList_Bytes16List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(oneBytes16);
        });

        it('returns zero if list is empty', async () => {
          expect(
            await instance.$shift_PackedDoublyLinkedList_Bytes16List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(zeroBytes16);
        });

        it('removes first value from list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          await instance.$shift_PackedDoublyLinkedList_Bytes16List(
            STORAGE_SLOT,
          );

          expect(
            await instance['$contains(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.be.false;

          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              zeroBytes16,
            ),
          ).to.eq(twoBytes16);

          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              twoBytes16,
            ),
          ).to.eq(zeroBytes16);
        });
      });

      describe('#unshift(bytes16)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['$unshift(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['$unshift(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);

          expect(
            await instance['$unshift(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.be.false;
        });

        it('adds new value to beginning of list', async () => {
          await instance['$unshift(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);

          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(zeroBytes16);

          await instance['$unshift(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(twoBytes16);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['$unshift(uint256,bytes16)'](STORAGE_SLOT, zeroBytes16),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#remove(bytes16)', () => {
        it('returns true if value is removed from list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);

          expect(
            await instance['$remove(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.be.true;
        });

        it('returns false if value is not removed from list', async () => {
          expect(
            await instance['$remove(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.be.false;
        });

        it('removes value from list', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, threeBytes16);

          await instance['$remove(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          expect(
            await instance['$contains(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              twoBytes16,
            ),
          ).to.be.false;

          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(threeBytes16);

          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              threeBytes16,
            ),
          ).to.eq(oneBytes16);
        });
      });

      describe('#replace(bytes16,bytes16)', () => {
        it('returns true if value is replaced', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);

          expect(
            await instance['$replace(uint256,bytes16,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
              twoBytes16,
            ),
          ).to.be.true;
        });

        it('returns false if value is not replaced', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          expect(
            await instance['$replace(uint256,bytes16,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
              twoBytes16,
            ),
          ).to.be.false;
        });

        it('replaces existing value with new value', async () => {
          const newValue = bigintToBytes16(4);

          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, threeBytes16);

          expect(
            await instance['$contains(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.be.false;

          await instance['$replace(uint256,bytes16,bytes16)'](
            STORAGE_SLOT,
            twoBytes16,
            newValue,
          );

          expect(
            await instance['$contains(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              twoBytes16,
            ),
          ).to.be.false;
          expect(
            await instance['$contains(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.be.true;

          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(newValue);
          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.eq(oneBytes16);
          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.eq(threeBytes16);
          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              threeBytes16,
            ),
          ).to.eq(newValue);
        });

        it('does nothing if new value matches existing value', async () => {
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);
          await instance['$push(uint256,bytes16)'](STORAGE_SLOT, twoBytes16);

          await instance['$replace(uint256,bytes16,bytes16)'](
            STORAGE_SLOT,
            oneBytes16,
            oneBytes16,
          );

          expect(
            await instance['$contains(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.be.true;

          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              zeroBytes16,
            ),
          ).to.eq(oneBytes16);
          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(zeroBytes16);
          expect(
            await instance['$next(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              oneBytes16,
            ),
          ).to.eq(twoBytes16);
          expect(
            await instance['$prev(uint256,bytes16)'].staticCall(
              STORAGE_SLOT,
              twoBytes16,
            ),
          ).to.eq(oneBytes16);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await instance['$push(uint256,bytes16)'](STORAGE_SLOT, oneBytes16);

            await expect(
              instance['$replace(uint256,bytes16,bytes16)'](
                STORAGE_SLOT,
                oneBytes16,
                zeroBytes16,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__InvalidInput',
            );
          });

          it('old value is not contained in list', async () => {
            await expect(
              instance['$replace(uint256,bytes16,bytes16)'](
                STORAGE_SLOT,
                oneBytes16,
                twoBytes16,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });
    });
  });

  describe('Uint128List', async () => {
    let instance: $PackedDoublyLinkedList;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new $PackedDoublyLinkedList__factory(deployer).deploy();
    });

    describe('__internal', () => {
      const zeroUint128 = 0;
      const oneUint128 = 1;
      const twoUint128 = 2;
      const threeUint128 = 3;

      describe('#contains(uint128)', () => {
        it('returns true if the value has been added', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          expect(
            await instance['$contains(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.be.true;
          expect(
            await instance['$contains(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              twoUint128,
            ),
          ).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(
            await instance['$contains(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.be.false;
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          expect(
            await instance['$contains(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              twoUint128,
            ),
          ).to.be.false;
        });

        it('returns false for zero value', async () => {
          expect(
            await instance['$contains(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              zeroUint128,
            ),
          ).to.be.false;
        });
      });

      describe('#prev(uint128)', () => {
        it('returns the previous value in the list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              twoUint128,
            ),
          ).to.eq(oneUint128);
        });

        it('returns zero if the value is at the beginning of the list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);

          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(zeroUint128);
        });

        it('returns last value in list if input is zero', async () => {
          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              zeroUint128,
            ),
          ).to.eq(zeroUint128);

          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              zeroUint128,
            ),
          ).to.eq(twoUint128);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['$prev(uint256,uint128)'].staticCall(
                STORAGE_SLOT,
                oneUint128,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#next(uint128)', () => {
        it('returns the next value in the list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(twoUint128);
        });

        it('returns zero if the value is at the end of the list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);

          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(zeroUint128);
        });

        it('returns first value in list if input is zero', async () => {
          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              zeroUint128,
            ),
          ).to.eq(zeroUint128);

          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              zeroUint128,
            ),
          ).to.eq(oneUint128);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['$next(uint256,uint128)'].staticCall(
                STORAGE_SLOT,
                oneUint128,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertBefore(uint128,uint128)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['$insertBefore(uint256,uint128,uint128)'].staticCall(
              STORAGE_SLOT,
              zeroUint128,
              oneUint128,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);

          expect(
            await instance['$insertBefore(uint256,uint128,uint128)'].staticCall(
              STORAGE_SLOT,
              zeroUint128,
              oneUint128,
            ),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['$insertBefore(uint256,uint128,uint128)'](
            STORAGE_SLOT,
            zeroUint128,
            oneUint128,
          );

          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(zeroUint128);

          await instance['$insertBefore(uint256,uint128,uint128)'](
            STORAGE_SLOT,
            oneUint128,
            twoUint128,
          );

          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              twoUint128,
            ),
          ).to.eq(oneUint128);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['$insertBefore(uint256,uint128,uint128)'](
                STORAGE_SLOT,
                zeroUint128,
                zeroUint128,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['$insertBefore(uint256,uint128,uint128)'](
                STORAGE_SLOT,
                oneUint128,
                twoUint128,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertAfter(uint128,uint128)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['$insertAfter(uint256,uint128,uint128)'].staticCall(
              STORAGE_SLOT,
              zeroUint128,
              oneUint128,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);

          expect(
            await instance['$insertAfter(uint256,uint128,uint128)'].staticCall(
              STORAGE_SLOT,
              zeroUint128,
              oneUint128,
            ),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['$insertAfter(uint256,uint128,uint128)'](
            STORAGE_SLOT,
            zeroUint128,
            oneUint128,
          );

          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(zeroUint128);

          await instance['$insertAfter(uint256,uint128,uint128)'](
            STORAGE_SLOT,
            oneUint128,
            twoUint128,
          );

          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              twoUint128,
            ),
          ).to.eq(oneUint128);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['$insertAfter(uint256,uint128,uint128)'](
                STORAGE_SLOT,
                zeroUint128,
                zeroUint128,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['$insertAfter(uint256,uint128,uint128)'](
                STORAGE_SLOT,
                oneUint128,
                twoUint128,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#push(uint128)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['$push(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);

          expect(
            await instance['$push(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.be.false;
        });

        it('adds new value to end of list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);

          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(zeroUint128);

          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(twoUint128);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['$push(uint256,uint128)'](STORAGE_SLOT, zeroUint128),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#pop()', () => {
        it('returns last value in list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          expect(
            await instance.$pop_PackedDoublyLinkedList_Uint128List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(twoUint128);
        });

        it('returns zero if list is empty', async () => {
          expect(
            await instance.$pop_PackedDoublyLinkedList_Uint128List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(zeroUint128);
        });

        it('removes last value from list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          await instance.$pop_PackedDoublyLinkedList_Uint128List(STORAGE_SLOT);

          expect(
            await instance['$contains(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              twoUint128,
            ),
          ).to.be.false;

          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              zeroUint128,
            ),
          ).to.eq(oneUint128);

          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(zeroUint128);
        });
      });

      describe('#shift()', () => {
        it('returns first value in list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          expect(
            await instance.$shift_PackedDoublyLinkedList_Uint128List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(oneUint128);
        });

        it('returns zero if list is empty', async () => {
          expect(
            await instance.$shift_PackedDoublyLinkedList_Uint128List.staticCall(
              STORAGE_SLOT,
            ),
          ).to.eq(zeroUint128);
        });

        it('removes first value from list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          await instance.$shift_PackedDoublyLinkedList_Uint128List(
            STORAGE_SLOT,
          );

          expect(
            await instance['$contains(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.be.false;

          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              zeroUint128,
            ),
          ).to.eq(twoUint128);

          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              twoUint128,
            ),
          ).to.eq(zeroUint128);
        });
      });

      describe('#unshift(uint128)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance['$unshift(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['$unshift(uint256,uint128)'](STORAGE_SLOT, oneUint128);

          expect(
            await instance['$unshift(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.be.false;
        });

        it('adds new value to beginning of list', async () => {
          await instance['$unshift(uint256,uint128)'](STORAGE_SLOT, oneUint128);

          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(zeroUint128);

          await instance['$unshift(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(twoUint128);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['$unshift(uint256,uint128)'](STORAGE_SLOT, zeroUint128),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#remove(uint128)', () => {
        it('returns true if value is removed from list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);

          expect(
            await instance['$remove(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.be.true;
        });

        it('returns false if value is not removed from list', async () => {
          expect(
            await instance['$remove(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.be.false;
        });

        it('removes value from list', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, threeUint128);

          await instance['$remove(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          expect(
            await instance['$contains(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              twoUint128,
            ),
          ).to.be.false;

          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(threeUint128);

          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              threeUint128,
            ),
          ).to.eq(oneUint128);
        });
      });

      describe('#replace(uint128,uint128)', () => {
        it('returns true if value is replaced', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);

          expect(
            await instance['$replace(uint256,uint128,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
              twoUint128,
            ),
          ).to.be.true;
        });

        it('returns false if value is not replaced', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          expect(
            await instance['$replace(uint256,uint128,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
              twoUint128,
            ),
          ).to.be.false;
        });

        it('replaces existing value with new value', async () => {
          const newValue = 4;

          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, threeUint128);

          expect(
            await instance['$contains(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.be.false;

          await instance['$replace(uint256,uint128,uint128)'](
            STORAGE_SLOT,
            twoUint128,
            newValue,
          );

          expect(
            await instance['$contains(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              twoUint128,
            ),
          ).to.be.false;
          expect(
            await instance['$contains(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.be.true;

          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(newValue);
          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.eq(oneUint128);
          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              newValue,
            ),
          ).to.eq(threeUint128);
          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              threeUint128,
            ),
          ).to.eq(newValue);
        });

        it('does nothing if new value matches existing value', async () => {
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);
          await instance['$push(uint256,uint128)'](STORAGE_SLOT, twoUint128);

          await instance['$replace(uint256,uint128,uint128)'](
            STORAGE_SLOT,
            oneUint128,
            oneUint128,
          );

          expect(
            await instance['$contains(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.be.true;

          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              zeroUint128,
            ),
          ).to.eq(oneUint128);
          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(zeroUint128);
          expect(
            await instance['$next(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              oneUint128,
            ),
          ).to.eq(twoUint128);
          expect(
            await instance['$prev(uint256,uint128)'].staticCall(
              STORAGE_SLOT,
              twoUint128,
            ),
          ).to.eq(oneUint128);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await instance['$push(uint256,uint128)'](STORAGE_SLOT, oneUint128);

            await expect(
              instance['$replace(uint256,uint128,uint128)'](
                STORAGE_SLOT,
                oneUint128,
                zeroUint128,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__InvalidInput',
            );
          });

          it('old value is not contained in list', async () => {
            await expect(
              instance['$replace(uint256,uint128,uint128)'](
                STORAGE_SLOT,
                oneUint128,
                twoUint128,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'PackedDoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });
    });
  });
});
