import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { bnToBytes16 } from '@solidstate/library';
import {
  PackedDoublyLinkedListBytes16Mock,
  PackedDoublyLinkedListBytes16Mock__factory,
  PackedDoublyLinkedListUint128Mock,
  PackedDoublyLinkedListUint128Mock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe('PackedDoublyLinkedList', async () => {
  describe('Bytes16List', async () => {
    let instance: PackedDoublyLinkedListBytes16Mock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new PackedDoublyLinkedListBytes16Mock__factory(
        deployer,
      ).deploy();
    });

    describe('__internal', () => {
      const zeroBytes16 = bnToBytes16(ethers.constants.Zero);
      const oneBytes16 = bnToBytes16(ethers.constants.One);
      const twoBytes16 = bnToBytes16(ethers.constants.Two);
      const threeBytes16 = bnToBytes16(BigNumber.from('3'));

      describe('#contains(bytes16)', () => {
        it('returns true if the value has been added', async () => {
          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);

          expect(await instance['contains(bytes16)'](oneBytes16)).to.be.true;
          expect(await instance['contains(bytes16)'](twoBytes16)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance['contains(bytes16)'](oneBytes16)).to.be.false;
          await instance['push(bytes16)'](oneBytes16);
          expect(await instance['contains(bytes16)'](twoBytes16)).to.be.false;
        });

        it('returns false for zero value', async () => {
          expect(await instance['contains(bytes16)'](zeroBytes16)).to.be.false;
        });
      });

      describe('#prev(bytes16)', () => {
        it('returns the previous value in the list', async () => {
          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);

          expect(await instance['prev(bytes16)'](twoBytes16)).to.eq(oneBytes16);
        });

        it('returns zero if the value is at the beginning of the list', async () => {
          await instance['push(bytes16)'](oneBytes16);

          expect(await instance['prev(bytes16)'](oneBytes16)).to.eq(
            zeroBytes16,
          );
        });

        it('returns last value in list if input is zero', async () => {
          expect(await instance['next(bytes16)'](zeroBytes16)).to.eq(
            zeroBytes16,
          );

          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);

          expect(await instance['prev(bytes16)'](zeroBytes16)).to.eq(
            twoBytes16,
          );
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['prev(bytes16)'](oneBytes16),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#next(bytes16)', () => {
        it('returns the next value in the list', async () => {
          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);

          expect(await instance['next(bytes16)'](oneBytes16)).to.eq(twoBytes16);
        });

        it('returns zero if the value is at the end of the list', async () => {
          await instance['push(bytes16)'](oneBytes16);

          expect(await instance['next(bytes16)'](oneBytes16)).to.eq(
            zeroBytes16,
          );
        });

        it('returns first value in list if input is zero', async () => {
          expect(await instance['next(bytes16)'](zeroBytes16)).to.eq(
            zeroBytes16,
          );

          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);

          expect(await instance['next(bytes16)'](zeroBytes16)).to.eq(
            oneBytes16,
          );
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['next(bytes16)'](oneBytes16),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertBefore(bytes16,bytes16)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance.callStatic['insertBefore(bytes16,bytes16)'](
              zeroBytes16,
              oneBytes16,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['push(bytes16)'](oneBytes16);

          expect(
            await instance.callStatic['insertBefore(bytes16,bytes16)'](
              zeroBytes16,
              oneBytes16,
            ),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['insertBefore(bytes16,bytes16)'](
            zeroBytes16,
            oneBytes16,
          );

          expect(await instance['next(bytes16)'](oneBytes16)).to.eq(
            zeroBytes16,
          );

          await instance['insertBefore(bytes16,bytes16)'](
            oneBytes16,
            twoBytes16,
          );

          expect(await instance['next(bytes16)'](twoBytes16)).to.eq(oneBytes16);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['insertBefore(bytes16,bytes16)'](
                zeroBytes16,
                zeroBytes16,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['insertBefore(bytes16,bytes16)'](oneBytes16, twoBytes16),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertAfter(bytes16,bytes16)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance.callStatic['insertAfter(bytes16,bytes16)'](
              zeroBytes16,
              oneBytes16,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['push(bytes16)'](oneBytes16);

          expect(
            await instance.callStatic['insertAfter(bytes16,bytes16)'](
              zeroBytes16,
              oneBytes16,
            ),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['insertAfter(bytes16,bytes16)'](
            zeroBytes16,
            oneBytes16,
          );

          expect(await instance['prev(bytes16)'](oneBytes16)).to.eq(
            zeroBytes16,
          );

          await instance['insertAfter(bytes16,bytes16)'](
            oneBytes16,
            twoBytes16,
          );

          expect(await instance['prev(bytes16)'](twoBytes16)).to.eq(oneBytes16);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['insertAfter(bytes16,bytes16)'](
                zeroBytes16,
                zeroBytes16,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['insertAfter(bytes16,bytes16)'](oneBytes16, twoBytes16),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#push(bytes16)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.callStatic['push(bytes16)'](oneBytes16)).to.be
            .true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['push(bytes16)'](oneBytes16);

          expect(await instance.callStatic['push(bytes16)'](oneBytes16)).to.be
            .false;
        });

        it('adds new value to end of list', async () => {
          await instance['push(bytes16)'](oneBytes16);

          expect(await instance['next(bytes16)'](oneBytes16)).to.eq(
            zeroBytes16,
          );

          await instance['push(bytes16)'](twoBytes16);

          expect(await instance['next(bytes16)'](oneBytes16)).to.eq(twoBytes16);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['push(bytes16)'](zeroBytes16),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#pop()', () => {
        it('returns last value in list', async () => {
          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);

          expect(await instance.callStatic['pop()']()).to.eq(twoBytes16);
        });

        it('returns zero if list is empty', async () => {
          expect(await instance.callStatic['pop()']()).to.eq(zeroBytes16);
        });

        it('removes last value from list', async () => {
          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);

          await instance['pop()']();

          expect(await instance['contains(bytes16)'](twoBytes16)).to.be.false;

          expect(await instance['prev(bytes16)'](zeroBytes16)).to.eq(
            oneBytes16,
          );

          expect(await instance['next(bytes16)'](oneBytes16)).to.eq(
            zeroBytes16,
          );
        });
      });

      describe('#shift()', () => {
        it('returns first value in list', async () => {
          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);

          expect(await instance.callStatic['shift()']()).to.eq(oneBytes16);
        });

        it('returns zero if list is empty', async () => {
          expect(await instance.callStatic['shift()']()).to.eq(zeroBytes16);
        });

        it('removes first value from list', async () => {
          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);

          await instance['shift()']();

          expect(await instance['contains(bytes16)'](oneBytes16)).to.be.false;

          expect(await instance['next(bytes16)'](zeroBytes16)).to.eq(
            twoBytes16,
          );

          expect(await instance['prev(bytes16)'](twoBytes16)).to.eq(
            zeroBytes16,
          );
        });
      });

      describe('#unshift(bytes16)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.callStatic['unshift(bytes16)'](oneBytes16)).to
            .be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['unshift(bytes16)'](oneBytes16);

          expect(await instance.callStatic['unshift(bytes16)'](oneBytes16)).to
            .be.false;
        });

        it('adds new value to beginning of list', async () => {
          await instance['unshift(bytes16)'](oneBytes16);

          expect(await instance['prev(bytes16)'](oneBytes16)).to.eq(
            zeroBytes16,
          );

          await instance['unshift(bytes16)'](twoBytes16);

          expect(await instance['prev(bytes16)'](oneBytes16)).to.eq(twoBytes16);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['unshift(bytes16)'](zeroBytes16),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#remove(bytes16)', () => {
        it('returns true if value is removed from list', async () => {
          await instance['push(bytes16)'](oneBytes16);

          expect(await instance.callStatic['remove(bytes16)'](oneBytes16)).to.be
            .true;
        });

        it('returns false if value is not removed from list', async () => {
          expect(await instance.callStatic['remove(bytes16)'](oneBytes16)).to.be
            .false;
        });

        it('removes value from list', async () => {
          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);
          await instance['push(bytes16)'](threeBytes16);

          await instance['remove(bytes16)'](twoBytes16);

          expect(await instance['contains(bytes16)'](twoBytes16)).to.be.false;

          expect(await instance['next(bytes16)'](oneBytes16)).to.eq(
            threeBytes16,
          );

          expect(await instance['prev(bytes16)'](threeBytes16)).to.eq(
            oneBytes16,
          );
        });
      });

      describe('#replace(bytes16,bytes16)', () => {
        it('returns true if value is replaced', async () => {
          await instance['push(bytes16)'](oneBytes16);

          expect(
            await instance.callStatic['replace(bytes16,bytes16)'](
              oneBytes16,
              twoBytes16,
            ),
          ).to.be.true;
        });

        it('returns false if value is not replaced', async () => {
          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);

          expect(
            await instance.callStatic['replace(bytes16,bytes16)'](
              oneBytes16,
              twoBytes16,
            ),
          ).to.be.false;
        });

        it('replaces existing value with new value', async () => {
          const newValue = bnToBytes16(BigNumber.from('4'));

          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);
          await instance['push(bytes16)'](threeBytes16);

          expect(await instance['contains(bytes16)'](newValue)).to.be.false;

          await instance['replace(bytes16,bytes16)'](twoBytes16, newValue);

          expect(await instance['contains(bytes16)'](twoBytes16)).to.be.false;
          expect(await instance['contains(bytes16)'](newValue)).to.be.true;

          expect(await instance['next(bytes16)'](oneBytes16)).to.eq(newValue);
          expect(await instance['prev(bytes16)'](newValue)).to.eq(oneBytes16);
          expect(await instance['next(bytes16)'](newValue)).to.eq(threeBytes16);
          expect(await instance['prev(bytes16)'](threeBytes16)).to.eq(newValue);
        });

        it('does nothing if new value matches existing value', async () => {
          await instance['push(bytes16)'](oneBytes16);
          await instance['push(bytes16)'](twoBytes16);

          await instance['replace(bytes16,bytes16)'](oneBytes16, oneBytes16);

          expect(await instance['contains(bytes16)'](oneBytes16)).to.be.true;

          expect(await instance['next(bytes16)'](zeroBytes16)).to.eq(
            oneBytes16,
          );
          expect(await instance['prev(bytes16)'](oneBytes16)).to.eq(
            zeroBytes16,
          );
          expect(await instance['next(bytes16)'](oneBytes16)).to.eq(twoBytes16);
          expect(await instance['prev(bytes16)'](twoBytes16)).to.eq(oneBytes16);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await instance['push(bytes16)'](oneBytes16);

            await expect(
              instance['replace(bytes16,bytes16)'](oneBytes16, zeroBytes16),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('old value is not contained in list', async () => {
            await expect(
              instance.callStatic['replace(bytes16,bytes16)'](
                oneBytes16,
                twoBytes16,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });
    });
  });

  describe('Uint128List', async () => {
    let instance: PackedDoublyLinkedListUint128Mock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new PackedDoublyLinkedListUint128Mock__factory(
        deployer,
      ).deploy();
    });

    describe('__internal', () => {
      const zeroUint128 = ethers.constants.Zero;
      const oneUint128 = ethers.constants.One;
      const twoUint128 = ethers.constants.Two;
      const threeUint128 = BigNumber.from('3');

      describe('#contains(uint128)', () => {
        it('returns true if the value has been added', async () => {
          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);

          expect(await instance['contains(uint128)'](oneUint128)).to.be.true;
          expect(await instance['contains(uint128)'](twoUint128)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance['contains(uint128)'](oneUint128)).to.be.false;
          await instance['push(uint128)'](oneUint128);
          expect(await instance['contains(uint128)'](twoUint128)).to.be.false;
        });

        it('returns false for zero value', async () => {
          expect(await instance['contains(uint128)'](zeroUint128)).to.be.false;
        });
      });

      describe('#prev(uint128)', () => {
        it('returns the previous value in the list', async () => {
          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);

          expect(await instance['prev(uint128)'](twoUint128)).to.eq(oneUint128);
        });

        it('returns zero if the value is at the beginning of the list', async () => {
          await instance['push(uint128)'](oneUint128);

          expect(await instance['prev(uint128)'](oneUint128)).to.eq(
            zeroUint128,
          );
        });

        it('returns last value in list if input is zero', async () => {
          expect(await instance['next(uint128)'](zeroUint128)).to.eq(
            zeroUint128,
          );

          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);

          expect(await instance['prev(uint128)'](zeroUint128)).to.eq(
            twoUint128,
          );
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['prev(uint128)'](oneUint128),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#next(uint128)', () => {
        it('returns the next value in the list', async () => {
          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);

          expect(await instance['next(uint128)'](oneUint128)).to.eq(twoUint128);
        });

        it('returns zero if the value is at the end of the list', async () => {
          await instance['push(uint128)'](oneUint128);

          expect(await instance['next(uint128)'](oneUint128)).to.eq(
            zeroUint128,
          );
        });

        it('returns first value in list if input is zero', async () => {
          expect(await instance['next(uint128)'](zeroUint128)).to.eq(
            zeroUint128,
          );

          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);

          expect(await instance['next(uint128)'](zeroUint128)).to.eq(
            oneUint128,
          );
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance['next(uint128)'](oneUint128),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertBefore(uint128,uint128)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance.callStatic['insertBefore(uint128,uint128)'](
              zeroUint128,
              oneUint128,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['push(uint128)'](oneUint128);

          expect(
            await instance.callStatic['insertBefore(uint128,uint128)'](
              zeroUint128,
              oneUint128,
            ),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['insertBefore(uint128,uint128)'](
            zeroUint128,
            oneUint128,
          );

          expect(await instance['next(uint128)'](oneUint128)).to.eq(
            zeroUint128,
          );

          await instance['insertBefore(uint128,uint128)'](
            oneUint128,
            twoUint128,
          );

          expect(await instance['next(uint128)'](twoUint128)).to.eq(oneUint128);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['insertBefore(uint128,uint128)'](
                zeroUint128,
                zeroUint128,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['insertBefore(uint128,uint128)'](oneUint128, twoUint128),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertAfter(uint128,uint128)', () => {
        it('returns true if value is added to list', async () => {
          expect(
            await instance.callStatic['insertAfter(uint128,uint128)'](
              zeroUint128,
              oneUint128,
            ),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['push(uint128)'](oneUint128);

          expect(
            await instance.callStatic['insertAfter(uint128,uint128)'](
              zeroUint128,
              oneUint128,
            ),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance['insertAfter(uint128,uint128)'](
            zeroUint128,
            oneUint128,
          );

          expect(await instance['prev(uint128)'](oneUint128)).to.eq(
            zeroUint128,
          );

          await instance['insertAfter(uint128,uint128)'](
            oneUint128,
            twoUint128,
          );

          expect(await instance['prev(uint128)'](twoUint128)).to.eq(oneUint128);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['insertAfter(uint128,uint128)'](
                zeroUint128,
                zeroUint128,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance['insertAfter(uint128,uint128)'](oneUint128, twoUint128),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#push(uint128)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.callStatic['push(uint128)'](oneUint128)).to.be
            .true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['push(uint128)'](oneUint128);

          expect(await instance.callStatic['push(uint128)'](oneUint128)).to.be
            .false;
        });

        it('adds new value to end of list', async () => {
          await instance['push(uint128)'](oneUint128);

          expect(await instance['next(uint128)'](oneUint128)).to.eq(
            zeroUint128,
          );

          await instance['push(uint128)'](twoUint128);

          expect(await instance['next(uint128)'](oneUint128)).to.eq(twoUint128);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['push(uint128)'](zeroUint128),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#pop()', () => {
        it('returns last value in list', async () => {
          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);

          expect(await instance.callStatic['pop()']()).to.eq(twoUint128);
        });

        it('returns zero if list is empty', async () => {
          expect(await instance.callStatic['pop()']()).to.eq(zeroUint128);
        });

        it('removes last value from list', async () => {
          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);

          await instance['pop()']();

          expect(await instance['contains(uint128)'](twoUint128)).to.be.false;

          expect(await instance['prev(uint128)'](zeroUint128)).to.eq(
            oneUint128,
          );

          expect(await instance['next(uint128)'](oneUint128)).to.eq(
            zeroUint128,
          );
        });
      });

      describe('#shift()', () => {
        it('returns first value in list', async () => {
          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);

          expect(await instance.callStatic['shift()']()).to.eq(oneUint128);
        });

        it('returns zero if list is empty', async () => {
          expect(await instance.callStatic['shift()']()).to.eq(zeroUint128);
        });

        it('removes first value from list', async () => {
          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);

          await instance['shift()']();

          expect(await instance['contains(uint128)'](oneUint128)).to.be.false;

          expect(await instance['next(uint128)'](zeroUint128)).to.eq(
            twoUint128,
          );

          expect(await instance['prev(uint128)'](twoUint128)).to.eq(
            zeroUint128,
          );
        });
      });

      describe('#unshift(uint128)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.callStatic['unshift(uint128)'](oneUint128)).to
            .be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance['unshift(uint128)'](oneUint128);

          expect(await instance.callStatic['unshift(uint128)'](oneUint128)).to
            .be.false;
        });

        it('adds new value to beginning of list', async () => {
          await instance['unshift(uint128)'](oneUint128);

          expect(await instance['prev(uint128)'](oneUint128)).to.eq(
            zeroUint128,
          );

          await instance['unshift(uint128)'](twoUint128);

          expect(await instance['prev(uint128)'](oneUint128)).to.eq(twoUint128);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance['unshift(uint128)'](zeroUint128),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#remove(uint128)', () => {
        it('returns true if value is removed from list', async () => {
          await instance['push(uint128)'](oneUint128);

          expect(await instance.callStatic['remove(uint128)'](oneUint128)).to.be
            .true;
        });

        it('returns false if value is not removed from list', async () => {
          expect(await instance.callStatic['remove(uint128)'](oneUint128)).to.be
            .false;
        });

        it('removes value from list', async () => {
          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);
          await instance['push(uint128)'](threeUint128);

          await instance['remove(uint128)'](twoUint128);

          expect(await instance['contains(uint128)'](twoUint128)).to.be.false;

          expect(await instance['next(uint128)'](oneUint128)).to.eq(
            threeUint128,
          );

          expect(await instance['prev(uint128)'](threeUint128)).to.eq(
            oneUint128,
          );
        });
      });

      describe('#replace(uint128,uint128)', () => {
        it('returns true if value is replaced', async () => {
          await instance['push(uint128)'](oneUint128);

          expect(
            await instance.callStatic['replace(uint128,uint128)'](
              oneUint128,
              twoUint128,
            ),
          ).to.be.true;
        });

        it('returns false if value is not replaced', async () => {
          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);

          expect(
            await instance.callStatic['replace(uint128,uint128)'](
              oneUint128,
              twoUint128,
            ),
          ).to.be.false;
        });

        it('replaces existing value with new value', async () => {
          const newValue = BigNumber.from('4');

          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);
          await instance['push(uint128)'](threeUint128);

          expect(await instance['contains(uint128)'](newValue)).to.be.false;

          await instance['replace(uint128,uint128)'](twoUint128, newValue);

          expect(await instance['contains(uint128)'](twoUint128)).to.be.false;
          expect(await instance['contains(uint128)'](newValue)).to.be.true;

          expect(await instance['next(uint128)'](oneUint128)).to.eq(newValue);
          expect(await instance['prev(uint128)'](newValue)).to.eq(oneUint128);
          expect(await instance['next(uint128)'](newValue)).to.eq(threeUint128);
          expect(await instance['prev(uint128)'](threeUint128)).to.eq(newValue);
        });

        it('does nothing if new value matches existing value', async () => {
          await instance['push(uint128)'](oneUint128);
          await instance['push(uint128)'](twoUint128);

          await instance['replace(uint128,uint128)'](oneUint128, oneUint128);

          expect(await instance['contains(uint128)'](oneUint128)).to.be.true;

          expect(await instance['next(uint128)'](zeroUint128)).to.eq(
            oneUint128,
          );
          expect(await instance['prev(uint128)'](oneUint128)).to.eq(
            zeroUint128,
          );
          expect(await instance['next(uint128)'](oneUint128)).to.eq(twoUint128);
          expect(await instance['prev(uint128)'](twoUint128)).to.eq(oneUint128);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await instance['push(uint128)'](oneUint128);

            await expect(
              instance['replace(uint128,uint128)'](oneUint128, zeroUint128),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('old value is not contained in list', async () => {
            await expect(
              instance.callStatic['replace(uint128,uint128)'](
                oneUint128,
                twoUint128,
              ),
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
