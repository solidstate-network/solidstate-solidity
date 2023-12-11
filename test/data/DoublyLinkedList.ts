import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { bigintToBytes32, bigintToAddress } from '@solidstate/library';
import {
  DoublyLinkedListBytes32Mock,
  DoublyLinkedListBytes32Mock__factory,
  DoublyLinkedListAddressMock,
  DoublyLinkedListAddressMock__factory,
  DoublyLinkedListUint256Mock,
  DoublyLinkedListUint256Mock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
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
      const zeroBytes32 = bigintToBytes32(0);
      const oneBytes32 = bigintToBytes32(1);
      const twoBytes32 = bigintToBytes32(2);
      const threeBytes32 = bigintToBytes32(3);

      describe('#contains(bytes32)', () => {
        it('returns true if the value has been added', async () => {
          await instance.push(oneBytes32);
          await instance.push(twoBytes32);

          expect(await instance.contains(oneBytes32)).to.be.true;
          expect(await instance.contains(twoBytes32)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance.contains(oneBytes32)).to.be.false;
          await instance.push(oneBytes32);
          expect(await instance.contains(twoBytes32)).to.be.false;
        });

        it('returns false for zero value', async () => {
          expect(await instance.contains(zeroBytes32)).to.be.false;
        });
      });

      describe('#prev(bytes32)', () => {
        it('returns the previous value in the list', async () => {
          await instance.push(oneBytes32);
          await instance.push(twoBytes32);

          expect(await instance.prev(twoBytes32)).to.eq(oneBytes32);
        });

        it('returns zero if the value is at the beginning of the list', async () => {
          await instance.push(oneBytes32);

          expect(await instance.prev(oneBytes32)).to.eq(zeroBytes32);
        });

        it('returns last value in list if input is zero', async () => {
          expect(await instance.next(zeroBytes32)).to.eq(zeroBytes32);

          await instance.push(oneBytes32);
          await instance.push(twoBytes32);

          expect(await instance.prev(zeroBytes32)).to.eq(twoBytes32);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance.prev(oneBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#next(bytes32)', () => {
        it('returns the next value in the list', async () => {
          await instance.push(oneBytes32);
          await instance.push(twoBytes32);

          expect(await instance.next(oneBytes32)).to.eq(twoBytes32);
        });

        it('returns zero if the value is at the end of the list', async () => {
          await instance.push(oneBytes32);

          expect(await instance.next(oneBytes32)).to.eq(zeroBytes32);
        });

        it('returns first value in list if input is zero', async () => {
          expect(await instance.next(zeroBytes32)).to.eq(zeroBytes32);

          await instance.push(oneBytes32);
          await instance.push(twoBytes32);

          expect(await instance.next(zeroBytes32)).to.eq(oneBytes32);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance.next(oneBytes32),
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
            await instance.insertBefore.staticCall(zeroBytes32, oneBytes32),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance.push(oneBytes32);

          expect(
            await instance.insertBefore.staticCall(zeroBytes32, oneBytes32),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance.insertBefore(zeroBytes32, oneBytes32);

          expect(await instance.next(oneBytes32)).to.eq(zeroBytes32);

          await instance.insertBefore(oneBytes32, twoBytes32);

          expect(await instance.next(twoBytes32)).to.eq(oneBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance.insertBefore(zeroBytes32, zeroBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance.insertBefore(oneBytes32, twoBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertAfter(bytes32,bytes32)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.insertAfter.staticCall(zeroBytes32, oneBytes32))
            .to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance.push(oneBytes32);

          expect(await instance.insertAfter.staticCall(zeroBytes32, oneBytes32))
            .to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance.insertAfter(zeroBytes32, oneBytes32);

          expect(await instance.prev(oneBytes32)).to.eq(zeroBytes32);

          await instance.insertAfter(oneBytes32, twoBytes32);

          expect(await instance.prev(twoBytes32)).to.eq(oneBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance.insertAfter(zeroBytes32, zeroBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance.insertAfter(oneBytes32, twoBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#push(bytes32)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.push.staticCall(oneBytes32)).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance.push(oneBytes32);

          expect(await instance.push.staticCall(oneBytes32)).to.be.false;
        });

        it('adds new value to end of list', async () => {
          await instance.push(oneBytes32);

          expect(await instance.next(oneBytes32)).to.eq(zeroBytes32);

          await instance.push(twoBytes32);

          expect(await instance.next(oneBytes32)).to.eq(twoBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance.push(zeroBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#pop()', () => {
        it('returns last value in list', async () => {
          await instance.push(oneBytes32);
          await instance.push(twoBytes32);

          expect(await instance.pop.staticCall()).to.eq(twoBytes32);
        });

        it('returns zero if list is empty', async () => {
          expect(await instance.pop.staticCall()).to.eq(zeroBytes32);
        });

        it('removes last value from list', async () => {
          await instance.push(oneBytes32);
          await instance.push(twoBytes32);

          await instance.pop();

          expect(await instance.contains(twoBytes32)).to.be.false;

          expect(await instance.prev(zeroBytes32)).to.eq(oneBytes32);

          expect(await instance.next(oneBytes32)).to.eq(zeroBytes32);
        });
      });

      describe('#shift()', () => {
        it('returns first value in list', async () => {
          await instance.push(oneBytes32);
          await instance.push(twoBytes32);

          expect(await instance.shift.staticCall()).to.eq(oneBytes32);
        });

        it('returns zero if list is empty', async () => {
          expect(await instance.shift.staticCall()).to.eq(zeroBytes32);
        });

        it('removes first value from list', async () => {
          await instance.push(oneBytes32);
          await instance.push(twoBytes32);

          await instance.shift();

          expect(await instance.contains(oneBytes32)).to.be.false;

          expect(await instance.next(zeroBytes32)).to.eq(twoBytes32);

          expect(await instance.prev(twoBytes32)).to.eq(zeroBytes32);
        });
      });

      describe('#unshift(bytes32)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.unshift.staticCall(oneBytes32)).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance.unshift(oneBytes32);

          expect(await instance.unshift.staticCall(oneBytes32)).to.be.false;
        });

        it('adds new value to beginning of list', async () => {
          await instance.unshift(oneBytes32);

          expect(await instance.prev(oneBytes32)).to.eq(zeroBytes32);

          await instance.unshift(twoBytes32);

          expect(await instance.prev(oneBytes32)).to.eq(twoBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance.unshift(zeroBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#remove(bytes32)', () => {
        it('returns true if value is removed from list', async () => {
          await instance.push(oneBytes32);

          expect(await instance.remove.staticCall(oneBytes32)).to.be.true;
        });

        it('returns false if value is not removed from list', async () => {
          expect(await instance.remove.staticCall(oneBytes32)).to.be.false;
        });

        it('removes value from list', async () => {
          await instance.push(oneBytes32);
          await instance.push(twoBytes32);
          await instance.push(threeBytes32);

          await instance.remove(twoBytes32);

          expect(await instance.contains(twoBytes32)).to.be.false;

          expect(await instance.next(oneBytes32)).to.eq(threeBytes32);

          expect(await instance.prev(threeBytes32)).to.eq(oneBytes32);
        });
      });

      describe('#replace(bytes32,bytes32)', () => {
        it('returns true if value is replaced', async () => {
          await instance.push(oneBytes32);

          expect(await instance.replace.staticCall(oneBytes32, twoBytes32)).to
            .be.true;
        });

        it('returns false if value is not replaced', async () => {
          await instance.push(oneBytes32);
          await instance.push(twoBytes32);

          expect(await instance.replace.staticCall(oneBytes32, twoBytes32)).to
            .be.false;
        });

        it('replaces existing value with new value', async () => {
          const newValue = bigintToBytes32(4);

          await instance.push(oneBytes32);
          await instance.push(twoBytes32);
          await instance.push(threeBytes32);

          expect(await instance.contains(newValue)).to.be.false;

          await instance.replace(twoBytes32, newValue);

          expect(await instance.contains(twoBytes32)).to.be.false;
          expect(await instance.contains(newValue)).to.be.true;

          expect(await instance.next(oneBytes32)).to.eq(newValue);
          expect(await instance.prev(newValue)).to.eq(oneBytes32);
          expect(await instance.next(newValue)).to.eq(threeBytes32);
          expect(await instance.prev(threeBytes32)).to.eq(newValue);
        });

        it('does nothing if new value matches existing value', async () => {
          await instance.push(oneBytes32);
          await instance.push(twoBytes32);

          await instance.replace(oneBytes32, oneBytes32);

          expect(await instance.contains(oneBytes32)).to.be.true;

          expect(await instance.next(zeroBytes32)).to.eq(oneBytes32);
          expect(await instance.prev(oneBytes32)).to.eq(zeroBytes32);
          expect(await instance.next(oneBytes32)).to.eq(twoBytes32);
          expect(await instance.prev(twoBytes32)).to.eq(oneBytes32);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await instance.push(oneBytes32);

            await expect(
              instance.replace(oneBytes32, zeroBytes32),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('old value is not contained in list', async () => {
            await expect(
              instance.replace.staticCall(oneBytes32, twoBytes32),
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
    let instance: DoublyLinkedListAddressMock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new DoublyLinkedListAddressMock__factory(
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
          await instance.push(oneAddress);
          await instance.push(twoAddress);

          expect(await instance.contains(oneAddress)).to.be.true;
          expect(await instance.contains(twoAddress)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance.contains(oneAddress)).to.be.false;
          await instance.push(oneAddress);
          expect(await instance.contains(twoAddress)).to.be.false;
        });

        it('returns false for zero value', async () => {
          expect(await instance.contains(zeroAddress)).to.be.false;
        });
      });

      describe('#prev(address)', () => {
        it('returns the previous value in the list', async () => {
          await instance.push(oneAddress);
          await instance.push(twoAddress);

          expect(await instance.prev(twoAddress)).to.eq(oneAddress);
        });

        it('returns zero if the value is at the beginning of the list', async () => {
          await instance.push(oneAddress);

          expect(await instance.prev(oneAddress)).to.eq(zeroAddress);
        });

        it('returns last value in list if input is zero', async () => {
          expect(await instance.next(zeroAddress)).to.eq(zeroAddress);

          await instance.push(oneAddress);
          await instance.push(twoAddress);

          expect(await instance.prev(zeroAddress)).to.eq(twoAddress);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance.prev(oneAddress),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#next(address)', () => {
        it('returns the next value in the list', async () => {
          await instance.push(oneAddress);
          await instance.push(twoAddress);

          expect(await instance.next(oneAddress)).to.eq(twoAddress);
        });

        it('returns zero if the value is at the end of the list', async () => {
          await instance.push(oneAddress);

          expect(await instance.next(oneAddress)).to.eq(zeroAddress);
        });

        it('returns first value in list if input is zero', async () => {
          expect(await instance.next(zeroAddress)).to.eq(zeroAddress);

          await instance.push(oneAddress);
          await instance.push(twoAddress);

          expect(await instance.next(zeroAddress)).to.eq(oneAddress);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance.next(oneAddress),
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
            await instance.insertBefore.staticCall(zeroAddress, oneAddress),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance.push(oneAddress);

          expect(
            await instance.insertBefore.staticCall(zeroAddress, oneAddress),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance.insertBefore(zeroAddress, oneAddress);

          expect(await instance.next(oneAddress)).to.eq(zeroAddress);

          await instance.insertBefore(oneAddress, twoAddress);

          expect(await instance.next(twoAddress)).to.eq(oneAddress);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance.insertBefore(zeroAddress, zeroAddress),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance.insertBefore(oneAddress, twoAddress),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertAfter(address,address)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.insertAfter.staticCall(zeroAddress, oneAddress))
            .to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance.push(oneAddress);

          expect(await instance.insertAfter.staticCall(zeroAddress, oneAddress))
            .to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance.insertAfter(zeroAddress, oneAddress);

          expect(await instance.prev(oneAddress)).to.eq(zeroAddress);

          await instance.insertAfter(oneAddress, twoAddress);

          expect(await instance.prev(twoAddress)).to.eq(oneAddress);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance.insertAfter(zeroAddress, zeroAddress),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance.insertAfter(oneAddress, twoAddress),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#push(address)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.push.staticCall(oneAddress)).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance.push(oneAddress);

          expect(await instance.push.staticCall(oneAddress)).to.be.false;
        });

        it('adds new value to end of list', async () => {
          await instance.push(oneAddress);

          expect(await instance.next(oneAddress)).to.eq(zeroAddress);

          await instance.push(twoAddress);

          expect(await instance.next(oneAddress)).to.eq(twoAddress);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance.push(zeroAddress),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#pop()', () => {
        it('returns last value in list', async () => {
          await instance.push(oneAddress);
          await instance.push(twoAddress);

          expect(await instance.pop.staticCall()).to.eq(twoAddress);
        });

        it('returns zero if list is empty', async () => {
          expect(await instance.pop.staticCall()).to.eq(zeroAddress);
        });

        it('removes last value from list', async () => {
          await instance.push(oneAddress);
          await instance.push(twoAddress);

          await instance.pop();

          expect(await instance.contains(twoAddress)).to.be.false;

          expect(await instance.prev(zeroAddress)).to.eq(oneAddress);

          expect(await instance.next(oneAddress)).to.eq(zeroAddress);
        });
      });

      describe('#shift()', () => {
        it('returns first value in list', async () => {
          await instance.push(oneAddress);
          await instance.push(twoAddress);

          expect(await instance.shift.staticCall()).to.eq(oneAddress);
        });

        it('returns zero if list is empty', async () => {
          expect(await instance.shift.staticCall()).to.eq(zeroAddress);
        });

        it('removes first value from list', async () => {
          await instance.push(oneAddress);
          await instance.push(twoAddress);

          await instance.shift();

          expect(await instance.contains(oneAddress)).to.be.false;

          expect(await instance.next(zeroAddress)).to.eq(twoAddress);

          expect(await instance.prev(twoAddress)).to.eq(zeroAddress);
        });
      });

      describe('#unshift(address)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.unshift.staticCall(oneAddress)).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance.unshift(oneAddress);

          expect(await instance.unshift.staticCall(oneAddress)).to.be.false;
        });

        it('adds new value to beginning of list', async () => {
          await instance.unshift(oneAddress);

          expect(await instance.prev(oneAddress)).to.eq(zeroAddress);

          await instance.unshift(twoAddress);

          expect(await instance.prev(oneAddress)).to.eq(twoAddress);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance.unshift(zeroAddress),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#remove(address)', () => {
        it('returns true if value is removed from list', async () => {
          await instance.push(oneAddress);

          expect(await instance.remove.staticCall(oneAddress)).to.be.true;
        });

        it('returns false if value is not removed from list', async () => {
          expect(await instance.remove.staticCall(oneAddress)).to.be.false;
        });

        it('removes value from list', async () => {
          await instance.push(oneAddress);
          await instance.push(twoAddress);
          await instance.push(threeAddress);

          await instance.remove(twoAddress);

          expect(await instance.contains(twoAddress)).to.be.false;

          expect(await instance.next(oneAddress)).to.eq(threeAddress);

          expect(await instance.prev(threeAddress)).to.eq(oneAddress);
        });
      });

      describe('#replace(address,address)', () => {
        it('returns true if value is replaced', async () => {
          await instance.push(oneAddress);

          expect(await instance.replace.staticCall(oneAddress, twoAddress)).to
            .be.true;
        });

        it('returns false if value is not replaced', async () => {
          await instance.push(oneAddress);
          await instance.push(twoAddress);

          expect(await instance.replace.staticCall(oneAddress, twoAddress)).to
            .be.false;
        });

        it('replaces existing value with new value', async () => {
          const newValue = bigintToAddress(4);

          await instance.push(oneAddress);
          await instance.push(twoAddress);
          await instance.push(threeAddress);

          expect(await instance.contains(newValue)).to.be.false;

          await instance.replace(twoAddress, newValue);

          expect(await instance.contains(twoAddress)).to.be.false;
          expect(await instance.contains(newValue)).to.be.true;

          expect(await instance.next(oneAddress)).to.eq(newValue);
          expect(await instance.prev(newValue)).to.eq(oneAddress);
          expect(await instance.next(newValue)).to.eq(threeAddress);
          expect(await instance.prev(threeAddress)).to.eq(newValue);
        });

        it('does nothing if new value matches existing value', async () => {
          await instance.push(oneAddress);
          await instance.push(twoAddress);

          await instance.replace(oneAddress, oneAddress);

          expect(await instance.contains(oneAddress)).to.be.true;

          expect(await instance.next(zeroAddress)).to.eq(oneAddress);
          expect(await instance.prev(oneAddress)).to.eq(zeroAddress);
          expect(await instance.next(oneAddress)).to.eq(twoAddress);
          expect(await instance.prev(twoAddress)).to.eq(oneAddress);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await instance.push(oneAddress);

            await expect(
              instance.replace(oneAddress, zeroAddress),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('old value is not contained in list', async () => {
            await expect(
              instance.replace.staticCall(oneAddress, twoAddress),
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
    let instance: DoublyLinkedListUint256Mock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new DoublyLinkedListUint256Mock__factory(
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
          await instance.push(oneUint256);
          await instance.push(twoUint256);

          expect(await instance.contains(oneUint256)).to.be.true;
          expect(await instance.contains(twoUint256)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance.contains(oneUint256)).to.be.false;
          await instance.push(oneUint256);
          expect(await instance.contains(twoUint256)).to.be.false;
        });

        it('returns false for zero value', async () => {
          expect(await instance.contains(zeroUint256)).to.be.false;
        });
      });

      describe('#prev(uint256)', () => {
        it('returns the previous value in the list', async () => {
          await instance.push(oneUint256);
          await instance.push(twoUint256);

          expect(await instance.prev(twoUint256)).to.eq(oneUint256);
        });

        it('returns zero if the value is at the beginning of the list', async () => {
          await instance.push(oneUint256);

          expect(await instance.prev(oneUint256)).to.eq(zeroUint256);
        });

        it('returns last value in list if input is zero', async () => {
          expect(await instance.next(zeroUint256)).to.eq(zeroUint256);

          await instance.push(oneUint256);
          await instance.push(twoUint256);

          expect(await instance.prev(zeroUint256)).to.eq(twoUint256);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance.prev(oneUint256),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#next(uint256)', () => {
        it('returns the next value in the list', async () => {
          await instance.push(oneUint256);
          await instance.push(twoUint256);

          expect(await instance.next(oneUint256)).to.eq(twoUint256);
        });

        it('returns zero if the value is at the end of the list', async () => {
          await instance.push(oneUint256);

          expect(await instance.next(oneUint256)).to.eq(zeroUint256);
        });

        it('returns first value in list if input is zero', async () => {
          expect(await instance.next(zeroUint256)).to.eq(zeroUint256);

          await instance.push(oneUint256);
          await instance.push(twoUint256);

          expect(await instance.next(zeroUint256)).to.eq(oneUint256);
        });

        describe('reverts if', () => {
          it('value is not contained in list', async () => {
            await expect(
              instance.next(oneUint256),
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
            await instance.insertBefore.staticCall(zeroUint256, oneUint256),
          ).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance.push(oneUint256);

          expect(
            await instance.insertBefore.staticCall(zeroUint256, oneUint256),
          ).to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance.insertBefore(zeroUint256, oneUint256);

          expect(await instance.next(oneUint256)).to.eq(zeroUint256);

          await instance.insertBefore(oneUint256, twoUint256);

          expect(await instance.next(twoUint256)).to.eq(oneUint256);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance.insertBefore(zeroUint256, zeroUint256),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance.insertBefore(oneUint256, twoUint256),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#insertAfter(uint256,uint256)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.insertAfter.staticCall(zeroUint256, oneUint256))
            .to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance.push(oneUint256);

          expect(await instance.insertAfter.staticCall(zeroUint256, oneUint256))
            .to.be.false;
        });

        it('adds new value to list in position before existing value', async () => {
          await instance.insertAfter(zeroUint256, oneUint256);

          expect(await instance.prev(oneUint256)).to.eq(zeroUint256);

          await instance.insertAfter(oneUint256, twoUint256);

          expect(await instance.prev(twoUint256)).to.eq(oneUint256);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance.insertAfter(zeroUint256, zeroUint256),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('value is not contained in list', async () => {
            await expect(
              instance.insertAfter(oneUint256, twoUint256),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__NonExistentEntry',
            );
          });
        });
      });

      describe('#push(uint256)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.push.staticCall(oneUint256)).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance.push(oneUint256);

          expect(await instance.push.staticCall(oneUint256)).to.be.false;
        });

        it('adds new value to end of list', async () => {
          await instance.push(oneUint256);

          expect(await instance.next(oneUint256)).to.eq(zeroUint256);

          await instance.push(twoUint256);

          expect(await instance.next(oneUint256)).to.eq(twoUint256);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance.push(zeroUint256),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#pop()', () => {
        it('returns last value in list', async () => {
          await instance.push(oneUint256);
          await instance.push(twoUint256);

          expect(await instance.pop.staticCall()).to.eq(twoUint256);
        });

        it('returns zero if list is empty', async () => {
          expect(await instance.pop.staticCall()).to.eq(zeroUint256);
        });

        it('removes last value from list', async () => {
          await instance.push(oneUint256);
          await instance.push(twoUint256);

          await instance.pop();

          expect(await instance.contains(twoUint256)).to.be.false;

          expect(await instance.prev(zeroUint256)).to.eq(oneUint256);

          expect(await instance.next(oneUint256)).to.eq(zeroUint256);
        });
      });

      describe('#shift()', () => {
        it('returns first value in list', async () => {
          await instance.push(oneUint256);
          await instance.push(twoUint256);

          expect(await instance.shift.staticCall()).to.eq(oneUint256);
        });

        it('returns zero if list is empty', async () => {
          expect(await instance.shift.staticCall()).to.eq(zeroUint256);
        });

        it('removes first value from list', async () => {
          await instance.push(oneUint256);
          await instance.push(twoUint256);

          await instance.shift();

          expect(await instance.contains(oneUint256)).to.be.false;

          expect(await instance.next(zeroUint256)).to.eq(twoUint256);

          expect(await instance.prev(twoUint256)).to.eq(zeroUint256);
        });
      });

      describe('#unshift(uint256)', () => {
        it('returns true if value is added to list', async () => {
          expect(await instance.unshift.staticCall(oneUint256)).to.be.true;
        });

        it('returns false if value is not added to list', async () => {
          await instance.unshift(oneUint256);

          expect(await instance.unshift.staticCall(oneUint256)).to.be.false;
        });

        it('adds new value to beginning of list', async () => {
          await instance.unshift(oneUint256);

          expect(await instance.prev(oneUint256)).to.eq(zeroUint256);

          await instance.unshift(twoUint256);

          expect(await instance.prev(oneUint256)).to.eq(twoUint256);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await expect(
              instance.unshift(zeroUint256),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });
        });
      });

      describe('#remove(uint256)', () => {
        it('returns true if value is removed from list', async () => {
          await instance.push(oneUint256);

          expect(await instance.remove.staticCall(oneUint256)).to.be.true;
        });

        it('returns false if value is not removed from list', async () => {
          expect(await instance.remove.staticCall(oneUint256)).to.be.false;
        });

        it('removes value from list', async () => {
          await instance.push(oneUint256);
          await instance.push(twoUint256);
          await instance.push(threeUint256);

          await instance.remove(twoUint256);

          expect(await instance.contains(twoUint256)).to.be.false;

          expect(await instance.next(oneUint256)).to.eq(threeUint256);

          expect(await instance.prev(threeUint256)).to.eq(oneUint256);
        });
      });

      describe('#replace(uint256,uint256)', () => {
        it('returns true if value is replaced', async () => {
          await instance.push(oneUint256);

          expect(await instance.replace.staticCall(oneUint256, twoUint256)).to
            .be.true;
        });

        it('returns false if value is not replaced', async () => {
          await instance.push(oneUint256);
          await instance.push(twoUint256);

          expect(await instance.replace.staticCall(oneUint256, twoUint256)).to
            .be.false;
        });

        it('replaces existing value with new value', async () => {
          const newValue = 4;

          await instance.push(oneUint256);
          await instance.push(twoUint256);
          await instance.push(threeUint256);

          expect(await instance.contains(newValue)).to.be.false;

          await instance.replace(twoUint256, newValue);

          expect(await instance.contains(twoUint256)).to.be.false;
          expect(await instance.contains(newValue)).to.be.true;

          expect(await instance.next(oneUint256)).to.eq(newValue);
          expect(await instance.prev(newValue)).to.eq(oneUint256);
          expect(await instance.next(newValue)).to.eq(threeUint256);
          expect(await instance.prev(threeUint256)).to.eq(newValue);
        });

        it('does nothing if new value matches existing value', async () => {
          await instance.push(oneUint256);
          await instance.push(twoUint256);

          await instance.replace(oneUint256, oneUint256);

          expect(await instance.contains(oneUint256)).to.be.true;

          expect(await instance.next(zeroUint256)).to.eq(oneUint256);
          expect(await instance.prev(oneUint256)).to.eq(zeroUint256);
          expect(await instance.next(oneUint256)).to.eq(twoUint256);
          expect(await instance.prev(twoUint256)).to.eq(oneUint256);
        });

        describe('reverts if', () => {
          it('new value is zero', async () => {
            await instance.push(oneUint256);

            await expect(
              instance.replace(oneUint256, zeroUint256),
            ).to.be.revertedWithCustomError(
              instance,
              'DoublyLinkedList__InvalidInput',
            );
          });

          it('old value is not contained in list', async () => {
            await expect(
              instance.replace.staticCall(oneUint256, twoUint256),
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
