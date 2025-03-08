import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic';
import { bigintToBytes32, bigintToAddress } from '@solidstate/library';
import {
  __hh_exposed_BinaryHeap,
  __hh_exposed_BinaryHeap__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

// data structures can be defined at any storage slot
// it doesn't matter which slot is used as long as it's consistent
const STORAGE_SLOT = 0n;

const numbers = [0, 1, 2].map((n) => n);

const constants = {
  bytes32: numbers.map((n) => bigintToBytes32(n)),
  address: numbers.map((n) => bigintToAddress(n)),
  uint256: numbers,
};

const randomBytes32 = () => ethers.hexlify(ethers.randomBytes(32));

const randomAddress = () =>
  ethers.getAddress(ethers.zeroPadValue(ethers.randomBytes(20), 20));

const randomUint256 = () => BigInt(ethers.toQuantity(ethers.randomBytes(32)));

// checks that the parent node is greater than or equal to the children nodes
function checkNodes(nodes: any[]) {
  nodes.forEach((node, index) => {
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left < nodes.length && nodes[left] != null) {
      expect(BigInt(node)).to.be.gte(BigInt(nodes[left]));
    }

    if (right < nodes.length && nodes[right] != null) {
      expect(BigInt(node)).to.be.gte(BigInt(nodes[right]));
    }
  });
}

describe('BinaryHeap', async () => {
  describe('Bytes32Heap', async () => {
    let instance: __hh_exposed_BinaryHeap;

    beforeEach(async () => {
      const [deployer] = await ethers.getSigners();
      instance = await new __hh_exposed_BinaryHeap__factory(deployer).deploy();
    });

    describe('__internal', () => {
      describe('#at(bytes32)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            randomBytes32(),
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            randomBytes32(),
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            randomBytes32(),
          );

          const array =
            await instance.__hh_exposed_toArray_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            );

          for (const key in array) {
            const value =
              await instance.__hh_exposed_at_BinaryHeap_Bytes32Heap.staticCall(
                STORAGE_SLOT,
                key,
              );
            expect(value).to.equal(array[key]);
          }
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(
              instance.__hh_exposed_at_BinaryHeap_Bytes32Heap(STORAGE_SLOT, 0n),
            ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
          });
        });
      });

      describe('#contains(bytes32)', () => {
        it('returns true if the value has been added', async () => {
          const value = randomBytes32();

          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            value,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              value,
            ),
          ).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'](
              STORAGE_SLOT,
              randomBytes32(),
            ),
          ).to.be.false;
        });
      });

      describe('#indexOf(bytes32)', () => {
        it('returns index of the value', async () => {
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            randomBytes32(),
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            randomBytes32(),
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            randomBytes32(),
          );

          const array =
            await instance.__hh_exposed_toArray_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            );

          for (const key in array) {
            const value = array[key];
            const index = await instance[
              '__hh_exposed_indexOf(uint256,bytes32)'
            ].staticCall(STORAGE_SLOT, value);
            expect(index).to.equal(key);
          }
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(
            await instance['__hh_exposed_indexOf(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              randomBytes32(),
            ),
          ).to.equal(ethers.MaxUint256);
        });
      });

      describe('#length()', () => {
        it('returns length of binary heap', async () => {
          const values = [randomBytes32(), randomBytes32(), randomBytes32()];

          expect(
            await instance.__hh_exposed_length_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(0);

          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            values[0],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            values[1],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(2);

          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            values[2],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(3);

          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            values[0],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(2);

          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            values[1],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            values[2],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(0);
        });
      });

      describe('#root()', () => {
        it('returns the highest value in the heap', async () => {
          const [min, mid, max] = constants.bytes32;

          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            min,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            mid,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            max,
          );

          expect(
            await instance.__hh_exposed_root_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(max);

          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            max,
          );

          expect(
            await instance.__hh_exposed_root_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(mid);

          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            mid,
          );

          expect(
            await instance.__hh_exposed_root_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(min);
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(
              instance.__hh_exposed_root_BinaryHeap_Bytes32Heap.staticCall(
                STORAGE_SLOT,
              ),
            ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
          });
        });
      });

      describe('#add(bytes32)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is added', async () => {
          for (let index = 0; index < 10; index++) {
            const value = randomBytes32();
            await instance['__hh_exposed_add(uint256,bytes32)'](
              STORAGE_SLOT,
              value,
            );
            const nodes =
              await instance.__hh_exposed_toArray_BinaryHeap_Bytes32Heap.staticCall(
                STORAGE_SLOT,
              );
            checkNodes(Array.from(nodes));
          }
        });

        it('returns true if value is added', async () => {
          expect(
            await instance['__hh_exposed_add(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              randomBytes32(),
            ),
          ).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          const value = randomBytes32();

          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            value,
          );

          expect(
            await instance['__hh_exposed_add(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              value,
            ),
          ).to.be.false;
        });
      });

      describe('#remove(bytes32)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is removed', async () => {
          const values: string[] = [];

          for (let index = 0; index < 10; index++) {
            const value = randomBytes32();
            await instance['__hh_exposed_add(uint256,bytes32)'](
              STORAGE_SLOT,
              value,
            );
            values.push(value);
          }

          for (const value of values) {
            await instance['__hh_exposed_remove(uint256,bytes32)'](
              STORAGE_SLOT,
              value,
            );
            checkNodes(
              await instance.__hh_exposed_toArray_BinaryHeap_Bytes32Heap.staticCall(
                STORAGE_SLOT,
              ),
            );
          }
        });

        it('returns true if value is removed', async () => {
          const value = randomBytes32();

          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            value,
          );

          expect(
            await instance['__hh_exposed_remove(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              value,
            ),
          ).to.be.true;
        });

        it('returns false if value does not exist', async () => {
          expect(
            await instance['__hh_exposed_remove(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              randomBytes32(),
            ),
          ).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the max heap as an array', async () => {
          const [min, mid, max] = constants.bytes32;

          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            min,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            mid,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            max,
          );

          const array =
            await instance.__hh_exposed_toArray_BinaryHeap_Bytes32Heap.staticCall(
              STORAGE_SLOT,
            );

          expect(array.length).to.equal(3);
          expect(array).to.deep.equal([max, min, mid]);
        });
      });
    });
  });

  describe('AddressHeap', async () => {
    let instance: __hh_exposed_BinaryHeap;

    beforeEach(async () => {
      const [deployer] = await ethers.getSigners();
      instance = await new __hh_exposed_BinaryHeap__factory(deployer).deploy();
    });

    describe('__internal', () => {
      describe('#at(address)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            randomAddress(),
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            randomAddress(),
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            randomAddress(),
          );

          const array =
            await instance.__hh_exposed_toArray_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            );

          for (const key in array) {
            const value =
              await instance.__hh_exposed_at_BinaryHeap_AddressHeap.staticCall(
                STORAGE_SLOT,
                key,
              );
            expect(value).to.equal(array[key]);
          }
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(
              instance.__hh_exposed_at_BinaryHeap_AddressHeap.staticCall(
                STORAGE_SLOT,
                0n,
              ),
            ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
          });
        });
      });

      describe('#contains(address)', () => {
        it('returns true if the value has been added', async () => {
          const value = randomAddress();

          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            value,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              value,
            ),
          ).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              randomAddress(),
            ),
          ).to.be.false;
        });
      });

      describe('#indexOf(address)', () => {
        it('returns index of the value', async () => {
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            randomAddress(),
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            randomAddress(),
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            randomAddress(),
          );

          const array =
            await instance.__hh_exposed_toArray_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            );

          for (const key in array) {
            const value = array[key];
            const index = await instance[
              '__hh_exposed_indexOf(uint256,address)'
            ].staticCall(STORAGE_SLOT, value);
            expect(index).to.equal(key);
          }
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(
            await instance['__hh_exposed_indexOf(uint256,address)'](
              STORAGE_SLOT,
              randomAddress(),
            ),
          ).to.equal(ethers.MaxUint256);
        });
      });

      describe('#length()', () => {
        it('returns length of binary heap', async () => {
          const values = [randomAddress(), randomAddress(), randomAddress()];

          expect(
            await instance.__hh_exposed_length_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(0);

          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            values[0],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            values[1],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(2);

          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            values[2],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(3);

          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            values[0],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(2);

          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            values[1],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            values[2],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(0);
        });
      });

      describe('#root()', () => {
        it('returns the highest value in the heap', async () => {
          const [min, mid, max] = constants.address;

          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            min,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            mid,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            max,
          );

          expect(
            await instance.__hh_exposed_root_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(max);

          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            max,
          );

          expect(
            await instance.__hh_exposed_root_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(mid);

          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            mid,
          );

          expect(
            await instance.__hh_exposed_root_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(min);
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(
              instance.__hh_exposed_root_BinaryHeap_AddressHeap.staticCall(
                STORAGE_SLOT,
              ),
            ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
          });
        });
      });

      describe('#add(address)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is added', async () => {
          for (let index = 0; index < 10; index++) {
            const value = randomAddress();
            await instance['__hh_exposed_add(uint256,address)'](
              STORAGE_SLOT,
              value,
            );
            const nodes =
              await instance.__hh_exposed_toArray_BinaryHeap_AddressHeap.staticCall(
                STORAGE_SLOT,
              );
            checkNodes(Array.from(nodes));
          }
        });

        it('returns true if value is added', async () => {
          expect(
            await instance['__hh_exposed_add(uint256,address)'].staticCall(
              STORAGE_SLOT,
              randomAddress(),
            ),
          ).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          const value = randomAddress();

          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            value,
          );

          expect(
            await instance['__hh_exposed_add(uint256,address)'].staticCall(
              STORAGE_SLOT,
              value,
            ),
          ).to.be.false;
        });
      });

      describe('#remove(address)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is removed', async () => {
          const values: string[] = [];

          for (let index = 0; index < 10; index++) {
            const value = randomAddress();
            await instance['__hh_exposed_add(uint256,address)'](
              STORAGE_SLOT,
              value,
            );
            values.push(value);
          }

          for (const value of values) {
            await instance['__hh_exposed_remove(uint256,address)'](
              STORAGE_SLOT,
              value,
            );
            checkNodes(
              await instance.__hh_exposed_toArray_BinaryHeap_AddressHeap.staticCall(
                STORAGE_SLOT,
              ),
            );
          }
        });

        it('returns true if value is removed', async () => {
          const value = randomAddress();

          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            value,
          );

          expect(
            await instance['__hh_exposed_remove(uint256,address)'].staticCall(
              STORAGE_SLOT,
              value,
            ),
          ).to.be.true;
        });

        it('returns false if value does not exist', async () => {
          expect(
            await instance['__hh_exposed_remove(uint256,address)'].staticCall(
              STORAGE_SLOT,
              randomAddress(),
            ),
          ).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the max heap as an array', async () => {
          const [min, mid, max] = constants.address;

          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            min,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            mid,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            max,
          );

          const array =
            await instance.__hh_exposed_toArray_BinaryHeap_AddressHeap.staticCall(
              STORAGE_SLOT,
            );

          expect(array.length).to.equal(3);
          expect(array).to.deep.equal([max, min, mid]);
        });
      });
    });
  });

  describe('UintHeap', async () => {
    let instance: __hh_exposed_BinaryHeap;

    beforeEach(async () => {
      const [deployer] = await ethers.getSigners();
      instance = await new __hh_exposed_BinaryHeap__factory(deployer).deploy();
    });

    describe('__internal', () => {
      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            randomUint256(),
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            randomUint256(),
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            randomUint256(),
          );

          const array =
            await instance.__hh_exposed_toArray_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            );

          for (const key in array) {
            const value =
              await instance.__hh_exposed_at_BinaryHeap_UintHeap.staticCall(
                STORAGE_SLOT,
                key,
              );
            expect(value).to.equal(array[key]);
          }
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(
              instance.__hh_exposed_at_BinaryHeap_UintHeap.staticCall(
                STORAGE_SLOT,
                0n,
              ),
            ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
          });
        });
      });

      describe('#contains(uint256)', () => {
        it('returns true if the value has been added', async () => {
          const value = randomUint256();

          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            value,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              value,
            ),
          ).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              randomUint256(),
            ),
          ).to.be.false;
        });
      });

      describe('#indexOf(uint256)', () => {
        it('returns index of the value', async () => {
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            randomUint256(),
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            randomUint256(),
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            randomUint256(),
          );

          const array =
            await instance.__hh_exposed_toArray_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            );

          for (const key in array) {
            const value = array[key];
            const index = await instance[
              '__hh_exposed_indexOf(uint256,uint256)'
            ].staticCall(STORAGE_SLOT, value);
            expect(index).to.equal(key);
          }
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(
            await instance['__hh_exposed_indexOf(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              randomUint256(),
            ),
          ).to.equal(ethers.MaxUint256);
        });
      });

      describe('#length()', () => {
        it('returns length of binary heap', async () => {
          const values = [randomUint256(), randomUint256(), randomUint256()];

          expect(
            await instance.__hh_exposed_length_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(0);

          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            values[0],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            values[1],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(2);

          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            values[2],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(3);

          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            values[0],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(2);

          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            values[1],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            values[2],
          );
          expect(
            await instance.__hh_exposed_length_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(0);
        });
      });

      describe('#root()', () => {
        it('returns the highest value in the heap', async () => {
          const [min, mid, max] = constants.uint256;

          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            min,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            mid,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            max,
          );

          expect(
            await instance.__hh_exposed_root_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(max);

          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            max,
          );

          expect(
            await instance.__hh_exposed_root_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(mid);

          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            mid,
          );

          expect(
            await instance.__hh_exposed_root_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(min);
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(
              instance.__hh_exposed_root_BinaryHeap_UintHeap.staticCall(
                STORAGE_SLOT,
              ),
            ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
          });
        });
      });

      describe('#add(uint256)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is added', async () => {
          for (let index = 0; index < 10; index++) {
            const value = randomUint256();
            await instance['__hh_exposed_add(uint256,uint256)'](
              STORAGE_SLOT,
              value,
            );
            const nodes =
              await instance.__hh_exposed_toArray_BinaryHeap_UintHeap.staticCall(
                STORAGE_SLOT,
              );
            checkNodes(Array.from(nodes));
          }
        });

        it('returns true if value is added', async () => {
          expect(
            await instance['__hh_exposed_add(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              randomUint256(),
            ),
          ).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          const value = randomUint256();

          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            value,
          );

          expect(
            await instance['__hh_exposed_add(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              value,
            ),
          ).to.be.false;
        });
      });

      describe('#remove(uint256)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is removed', async () => {
          const values: bigint[] = [];

          for (let index = 0; index < 10; index++) {
            const value = randomUint256();
            await instance['__hh_exposed_add(uint256,uint256)'](
              STORAGE_SLOT,
              value,
            );
            values.push(value);
          }

          for (const value of values) {
            await instance['__hh_exposed_remove(uint256,uint256)'](
              STORAGE_SLOT,
              value,
            );
            checkNodes(
              await instance.__hh_exposed_toArray_BinaryHeap_UintHeap.staticCall(
                STORAGE_SLOT,
              ),
            );
          }
        });

        it('returns true if value is removed', async () => {
          const value = randomUint256();

          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            value,
          );

          expect(
            await instance['__hh_exposed_remove(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              value,
            ),
          ).to.be.true;
        });

        it('returns false if value does not exist', async () => {
          expect(
            await instance['__hh_exposed_remove(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              randomUint256(),
            ),
          ).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the max heap as an array', async () => {
          const [min, mid, max] = constants.uint256;

          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            min,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            mid,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            max,
          );

          const array =
            await instance.__hh_exposed_toArray_BinaryHeap_UintHeap.staticCall(
              STORAGE_SLOT,
            );

          expect(array.length).to.equal(3);
          expect(array).to.deep.equal([max, min, mid]);
        });
      });
    });
  });
});
