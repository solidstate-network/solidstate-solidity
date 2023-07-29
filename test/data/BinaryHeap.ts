import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { bigintToBytes32, bigintToAddress } from '@solidstate/library';
import {
  BinaryHeapAddressMock,
  BinaryHeapBytes32Mock,
  BinaryHeapUintMock,
  BinaryHeapAddressMock__factory,
  BinaryHeapBytes32Mock__factory,
  BinaryHeapUintMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { Bytes } from 'ethers';
import { ethers } from 'hardhat';

const numbers = [0, 1, 2].map((n) => n);

const constants = {
  bytes32: numbers.map((n) => bigintToBytes32(n)),
  address: numbers.map((n) => bigintToAddress(n)),
  uint256: numbers,
};

const randomBytes32 = () => ethers.randomBytes(32);

const randomAddress = () =>
  ethers.getAddress(ethers.zeroPadValue(ethers.randomBytes(20), 20));

const randomUint256 = () => BigInt(ethers.toQuantity(ethers.randomBytes(32)));

// checks that the parent node is greater than or equal to the children nodes
function checkNodes(nodes: bigint[]) {
  nodes.forEach((node, index) => {
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (nodes[left] != null) {
      expect(BigInt(node)).to.be.gte(BigInt(nodes[left]));
    }

    if (nodes[right] != null) {
      expect(BigInt(node)).to.be.gte(BigInt(nodes[right]));
    }
  });
}

describe('BinaryHeap', async () => {
  describe('Bytes32Heap', async () => {
    let instance: BinaryHeapBytes32Mock;

    beforeEach(async () => {
      const [deployer] = await ethers.getSigners();
      instance = await new BinaryHeapBytes32Mock__factory(deployer).deploy();
    });

    describe('__internal', () => {
      describe('#at(bytes32)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance.add(randomBytes32());
          await instance.add(randomBytes32());
          await instance.add(randomBytes32());

          const array = await instance.toArray.staticCall();

          for (const key in array) {
            const value = await instance.at.staticCall(key);
            expect(value).to.equal(array[key]);
          }
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(instance.at(0)).to.be.revertedWithPanic(
              PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS,
            );
          });
        });
      });

      describe('#contains(bytes32)', () => {
        it('returns true if the value has been added', async () => {
          const value = randomBytes32();

          await instance.add(value);

          expect(await instance.contains(value)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance.contains(randomBytes32())).to.be.false;
        });
      });

      describe('#indexOf(bytes32)', () => {
        it('returns index of the value', async () => {
          await instance.add(randomBytes32());
          await instance.add(randomBytes32());
          await instance.add(randomBytes32());

          const array = await instance.toArray.staticCall();

          for (const key in array) {
            const value = array[key];
            const index = await instance.indexOf.staticCall(value);
            expect(index).to.equal(key);
          }
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance.indexOf(randomBytes32())).to.equal(
            ethers.MaxUint256,
          );
        });
      });

      describe('#length()', () => {
        it('returns length of binary heap', async () => {
          const values = [randomBytes32(), randomBytes32(), randomBytes32()];

          expect(await instance.length()).to.equal(0);

          await instance.add(values[0]);
          expect(await instance.length()).to.equal(1);

          await instance.add(values[1]);
          expect(await instance.length()).to.equal(2);

          await instance.add(values[2]);
          expect(await instance.length()).to.equal(3);

          await instance.remove(values[0]);
          expect(await instance.length()).to.equal(2);

          await instance.remove(values[1]);
          expect(await instance.length()).to.equal(1);

          await instance.remove(values[2]);
          expect(await instance.length()).to.equal(0);
        });
      });

      describe('#root()', () => {
        it('returns the highest value in the heap', async () => {
          const [min, mid, max] = constants.bytes32;

          await instance.add(min);
          await instance.add(mid);
          await instance.add(max);

          expect(await instance.root.staticCall()).to.equal(max);

          await instance.remove(max);

          expect(await instance.root.staticCall()).to.equal(mid);

          await instance.remove(mid);

          expect(await instance.root.staticCall()).to.equal(min);
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(instance.root.staticCall()).to.be.revertedWithPanic(
              PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS,
            );
          });
        });
      });

      describe('#add(bytes32)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is added', async () => {
          for (let index = 0; index < 10; index++) {
            const value = randomBytes32();
            await instance.add(value);
            const nodes = await instance.toArray.staticCall();
            checkNodes(Array.from(nodes));
          }
        });

        it('returns true if value is added', async () => {
          expect(await instance.add.staticCall(randomBytes32())).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          const value = randomBytes32();

          await instance.add(value);

          expect(await instance.add.staticCall(value)).to.be.false;
        });
      });

      describe('#remove(bytes32)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is removed', async () => {
          const values: Bytes[] = [];

          for (let index = 0; index < 10; index++) {
            const value = randomBytes32();
            await instance.add(value);
          }

          for (const value of values) {
            await instance.remove(value);
            checkNodes(await instance.toArray.staticCall());
          }
        });

        it('returns true if value is removed', async () => {
          const value = randomBytes32();

          await instance.add(value);

          expect(await instance.remove.staticCall(value)).to.be.true;
        });

        it('returns false if value does not exist', async () => {
          expect(await instance.remove.staticCall(randomBytes32())).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the max heap as an array', async () => {
          const [min, mid, max] = constants.bytes32;

          await instance.add(min);
          await instance.add(mid);
          await instance.add(max);

          const array = await instance.toArray.staticCall();

          expect(array.length).to.equal(3);
          expect(array).to.deep.equal([max, min, mid]);
        });
      });
    });
  });

  describe('AddressHeap', async () => {
    let instance: BinaryHeapAddressMock;

    beforeEach(async () => {
      const [deployer] = await ethers.getSigners();
      instance = await new BinaryHeapAddressMock__factory(deployer).deploy();
    });

    describe('__internal', () => {
      describe('#at(address)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance.add(randomAddress());
          await instance.add(randomAddress());
          await instance.add(randomAddress());

          const array = await instance.toArray.staticCall();

          for (const key in array) {
            const value = await instance.at.staticCall(key);
            expect(value).to.equal(array[key]);
          }
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(instance.at(0)).to.be.revertedWithPanic(
              PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS,
            );
          });
        });
      });

      describe('#contains(address)', () => {
        it('returns true if the value has been added', async () => {
          const value = randomAddress();

          await instance.add(value);

          expect(await instance.contains(value)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance.contains(randomAddress())).to.be.false;
        });
      });

      describe('#indexOf(address)', () => {
        it('returns index of the value', async () => {
          await instance.add(randomAddress());
          await instance.add(randomAddress());
          await instance.add(randomAddress());

          const array = await instance.toArray.staticCall();

          for (const key in array) {
            const value = array[key];
            const index = await instance.indexOf.staticCall(value);
            expect(index).to.equal(key);
          }
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance.indexOf(randomAddress())).to.equal(
            ethers.MaxUint256,
          );
        });
      });

      describe('#length()', () => {
        it('returns length of binary heap', async () => {
          const values = [randomAddress(), randomAddress(), randomAddress()];

          expect(await instance.length()).to.equal(0);

          await instance.add(values[0]);
          expect(await instance.length()).to.equal(1);

          await instance.add(values[1]);
          expect(await instance.length()).to.equal(2);

          await instance.add(values[2]);
          expect(await instance.length()).to.equal(3);

          await instance.remove(values[0]);
          expect(await instance.length()).to.equal(2);

          await instance.remove(values[1]);
          expect(await instance.length()).to.equal(1);

          await instance.remove(values[2]);
          expect(await instance.length()).to.equal(0);
        });
      });

      describe('#root()', () => {
        it('returns the highest value in the heap', async () => {
          const [min, mid, max] = constants.address;

          await instance.add(min);
          await instance.add(mid);
          await instance.add(max);

          expect(await instance.root.staticCall()).to.equal(max);

          await instance.remove(max);

          expect(await instance.root.staticCall()).to.equal(mid);

          await instance.remove(mid);

          expect(await instance.root.staticCall()).to.equal(min);
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(instance.root.staticCall()).to.be.revertedWithPanic(
              PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS,
            );
          });
        });
      });

      describe('#add(address)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is added', async () => {
          for (let index = 0; index < 10; index++) {
            const value = randomAddress();
            await instance.add(value);
            const nodes = await instance.toArray.staticCall();
            checkNodes(Array.from(nodes));
          }
        });

        it('returns true if value is added', async () => {
          expect(await instance.add.staticCall(randomAddress())).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          const value = randomAddress();

          await instance.add(value);

          expect(await instance.add.staticCall(value)).to.be.false;
        });
      });

      describe('#remove(address)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is removed', async () => {
          const values: string[] = [];

          for (let index = 0; index < 10; index++) {
            const value = randomAddress();
            await instance.add(value);
          }

          for (const value of values) {
            await instance.remove(value);
            checkNodes(await instance.toArray.staticCall());
          }
        });

        it('returns true if value is removed', async () => {
          const value = randomAddress();

          await instance.add(value);

          expect(await instance.remove.staticCall(value)).to.be.true;
        });

        it('returns false if value does not exist', async () => {
          expect(await instance.remove.staticCall(randomAddress())).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the max heap as an array', async () => {
          const [min, mid, max] = constants.address;

          await instance.add(min);
          await instance.add(mid);
          await instance.add(max);

          const array = await instance.toArray.staticCall();

          expect(array.length).to.equal(3);
          expect(array).to.deep.equal([max, min, mid]);
        });
      });
    });
  });

  describe('UintHeap', async () => {
    let instance: BinaryHeapUintMock;

    beforeEach(async () => {
      const [deployer] = await ethers.getSigners();
      instance = await new BinaryHeapUintMock__factory(deployer).deploy();
    });

    describe('__internal', () => {
      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance.add(randomUint256());
          await instance.add(randomUint256());
          await instance.add(randomUint256());

          const array = await instance.toArray.staticCall();

          for (const key in array) {
            const value = await instance.at.staticCall(key);
            expect(value).to.equal(array[key]);
          }
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(instance.at(0)).to.be.revertedWithPanic(
              PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS,
            );
          });
        });
      });

      describe('#contains(uint256)', () => {
        it('returns true if the value has been added', async () => {
          const value = randomUint256();

          await instance.add(value);

          expect(await instance.contains(value)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance.contains(randomUint256())).to.be.false;
        });
      });

      describe('#indexOf(uint256)', () => {
        it('returns index of the value', async () => {
          await instance.add(randomUint256());
          await instance.add(randomUint256());
          await instance.add(randomUint256());

          const array = await instance.toArray.staticCall();

          for (const key in array) {
            const value = array[key];
            const index = await instance.indexOf.staticCall(value);
            expect(index).to.equal(key);
          }
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance.indexOf(randomUint256())).to.equal(
            ethers.MaxUint256,
          );
        });
      });

      describe('#length()', () => {
        it('returns length of binary heap', async () => {
          const values = [randomUint256(), randomUint256(), randomUint256()];

          expect(await instance.length()).to.equal(0);

          await instance.add(values[0]);
          expect(await instance.length()).to.equal(1);

          await instance.add(values[1]);
          expect(await instance.length()).to.equal(2);

          await instance.add(values[2]);
          expect(await instance.length()).to.equal(3);

          await instance.remove(values[0]);
          expect(await instance.length()).to.equal(2);

          await instance.remove(values[1]);
          expect(await instance.length()).to.equal(1);

          await instance.remove(values[2]);
          expect(await instance.length()).to.equal(0);
        });
      });

      describe('#root()', () => {
        it('returns the highest value in the heap', async () => {
          const [min, mid, max] = constants.uint256;

          await instance.add(min);
          await instance.add(mid);
          await instance.add(max);

          expect(await instance.root.staticCall()).to.equal(max);

          await instance.remove(max);

          expect(await instance.root.staticCall()).to.equal(mid);

          await instance.remove(mid);

          expect(await instance.root.staticCall()).to.equal(min);
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(instance.root.staticCall()).to.be.revertedWithPanic(
              PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS,
            );
          });
        });
      });

      describe('#add(uint256)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is added', async () => {
          for (let index = 0; index < 10; index++) {
            const value = randomUint256();
            await instance.add(value);
            const nodes = await instance.toArray.staticCall();
            checkNodes(Array.from(nodes));
          }
        });

        it('returns true if value is added', async () => {
          expect(await instance.add.staticCall(randomUint256())).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          const value = randomUint256();

          await instance.add(value);

          expect(await instance.add.staticCall(value)).to.be.false;
        });
      });

      describe('#remove(uint256)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is removed', async () => {
          const values: number[] = [];

          for (let index = 0; index < 10; index++) {
            const value = randomUint256();
            await instance.add(value);
          }

          for (const value of values) {
            await instance.remove(value);
            checkNodes(await instance.toArray.staticCall());
          }
        });

        it('returns true if value is removed', async () => {
          const value = randomUint256();

          await instance.add(value);

          expect(await instance.remove.staticCall(value)).to.be.true;
        });

        it('returns false if value does not exist', async () => {
          expect(await instance.remove.staticCall(randomUint256())).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the max heap as an array', async () => {
          const [min, mid, max] = constants.uint256;

          await instance.add(min);
          await instance.add(mid);
          await instance.add(max);

          const array = await instance.toArray.staticCall();

          expect(array.length).to.equal(3);
          expect(array).to.deep.equal([max, min, mid]);
        });
      });
    });
  });
});
