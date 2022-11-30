import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { bnToBytes32, bnToAddress, bytes32ToNumber } from '@solidstate/library';
import {
  BinaryHeapAddressMock,
  BinaryHeapBytes32Mock,
  BinaryHeapUintMock,
  BinaryHeapAddressMock__factory,
  BinaryHeapBytes32Mock__factory,
  BinaryHeapUintMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber, Bytes } from 'ethers';
import { ethers } from 'hardhat';

const numbers = [0, 1, 2].map((n) => BigNumber.from(n));

const constants = {
  bytes32: numbers.map((n) => bnToBytes32(n)),
  address: numbers.map((n) => bnToAddress(n)),
  uint256: numbers,
};

const randomBytes32 = () => ethers.utils.randomBytes(32);

const randomAddress = () =>
  ethers.utils.getAddress(ethers.utils.hexlify(ethers.utils.randomBytes(20)));

const randomUint256 = () => ethers.BigNumber.from(ethers.utils.randomBytes(32));

// checks that the parent node is greater than or equal to the children nodes
function checkNodes(nodes: string[] | BigNumber[]) {
  nodes.forEach((node, index) => {
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (nodes[left] != null) {
      expect(ethers.BigNumber.from(node)).to.be.gte(
        ethers.BigNumber.from(nodes[left]),
      );
    }

    if (nodes[right] != null) {
      expect(ethers.BigNumber.from(node)).to.be.gte(
        ethers.BigNumber.from(nodes[right]),
      );
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
          await instance['add(bytes32)'](randomBytes32());
          await instance['add(bytes32)'](randomBytes32());
          await instance['add(bytes32)'](randomBytes32());

          const array = await instance.callStatic['toArray()']();

          for (const key in array) {
            const value = await instance.callStatic['at(uint256)'](key);
            expect(value).to.equal(array[key]);
          }
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(instance['at(uint256)'](0)).to.be.revertedWithPanic(
              PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS,
            );
          });
        });
      });

      describe('#contains(bytes32)', () => {
        it('returns true if the value has been added', async () => {
          const value = randomBytes32();

          await instance['add(bytes32)'](value);

          expect(await instance['contains(bytes32)'](value)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance['contains(bytes32)'](randomBytes32())).to.be
            .false;
        });
      });

      describe('#indexOf(bytes32)', () => {
        it('returns index of the value', async () => {
          await instance['add(bytes32)'](randomBytes32());
          await instance['add(bytes32)'](randomBytes32());
          await instance['add(bytes32)'](randomBytes32());

          const array = await instance.callStatic['toArray()']();

          for (const key in array) {
            const value = array[key];
            const index = await instance.callStatic['indexOf(bytes32)'](value);
            expect(index).to.equal(key);
          }
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance['indexOf(bytes32)'](randomBytes32())).to.equal(
            ethers.constants.MaxUint256,
          );
        });
      });

      describe('#length()', () => {
        it('returns length of binary heap', async () => {
          const values = [randomBytes32(), randomBytes32(), randomBytes32()];

          expect(await instance['length()']()).to.equal(0);

          await instance['add(bytes32)'](values[0]);
          expect(await instance['length()']()).to.equal(1);

          await instance['add(bytes32)'](values[1]);
          expect(await instance['length()']()).to.equal(2);

          await instance['add(bytes32)'](values[2]);
          expect(await instance['length()']()).to.equal(3);

          await instance['remove(bytes32)'](values[0]);
          expect(await instance['length()']()).to.equal(2);

          await instance['remove(bytes32)'](values[1]);
          expect(await instance['length()']()).to.equal(1);

          await instance['remove(bytes32)'](values[2]);
          expect(await instance['length()']()).to.equal(0);
        });
      });

      describe('#root()', () => {
        it('returns the highest value in the heap', async () => {
          const [min, mid, max] = constants.bytes32;

          await instance['add(bytes32)'](min);
          await instance['add(bytes32)'](mid);
          await instance['add(bytes32)'](max);

          expect(await instance.callStatic['root()']()).to.equal(max);

          await instance['remove(bytes32)'](max);

          expect(await instance.callStatic['root()']()).to.equal(mid);

          await instance['remove(bytes32)'](mid);

          expect(await instance.callStatic['root()']()).to.equal(min);
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(
              instance.callStatic['root()'](),
            ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
          });
        });
      });

      describe('#add(bytes32)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is added', async () => {
          for (let index = 0; index < 10; index++) {
            const value = randomBytes32();
            await instance['add(bytes32)'](value);
            checkNodes(await instance.callStatic['toArray()']());
          }
        });

        it('returns true if value is added', async () => {
          expect(await instance.callStatic['add(bytes32)'](randomBytes32())).to
            .be.true;
        });

        it('returns false if value has already been added', async () => {
          const value = randomBytes32();

          await instance['add(bytes32)'](value);

          expect(await instance.callStatic['add(bytes32)'](value)).to.be.false;
        });
      });

      describe('#remove(bytes32)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is removed', async () => {
          const values: Bytes[] = [];

          for (let index = 0; index < 10; index++) {
            const value = randomBytes32();
            await instance['add(bytes32)'](value);
          }

          for (const value of values) {
            await instance['remove(bytes32)'](value);
            checkNodes(await instance.callStatic['toArray()']());
          }
        });

        it('returns true if value is removed', async () => {
          const value = randomBytes32();

          await instance['add(bytes32)'](value);

          expect(await instance.callStatic['remove(bytes32)'](value)).to.be
            .true;
        });

        it('returns false if value does not exist', async () => {
          expect(await instance.callStatic['remove(bytes32)'](randomBytes32()))
            .to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the max heap as an array', async () => {
          const [min, mid, max] = constants.bytes32;

          await instance['add(bytes32)'](min);
          await instance['add(bytes32)'](mid);
          await instance['add(bytes32)'](max);

          const array = await instance.callStatic['toArray()']();

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
          await instance['add(address)'](randomAddress());
          await instance['add(address)'](randomAddress());
          await instance['add(address)'](randomAddress());

          const array = await instance.callStatic['toArray()']();

          for (const key in array) {
            const value = await instance.callStatic['at(uint256)'](key);
            expect(value).to.equal(array[key]);
          }
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(instance['at(uint256)'](0)).to.be.revertedWithPanic(
              PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS,
            );
          });
        });
      });

      describe('#contains(address)', () => {
        it('returns true if the value has been added', async () => {
          const value = randomAddress();

          await instance['add(address)'](value);

          expect(await instance['contains(address)'](value)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance['contains(address)'](randomAddress())).to.be
            .false;
        });
      });

      describe('#indexOf(address)', () => {
        it('returns index of the value', async () => {
          await instance['add(address)'](randomAddress());
          await instance['add(address)'](randomAddress());
          await instance['add(address)'](randomAddress());

          const array = await instance.callStatic['toArray()']();

          for (const key in array) {
            const value = array[key];
            const index = await instance.callStatic['indexOf(address)'](value);
            expect(index).to.equal(key);
          }
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance['indexOf(address)'](randomAddress())).to.equal(
            ethers.constants.MaxUint256,
          );
        });
      });

      describe('#length()', () => {
        it('returns length of binary heap', async () => {
          const values = [randomAddress(), randomAddress(), randomAddress()];

          expect(await instance['length()']()).to.equal(0);

          await instance['add(address)'](values[0]);
          expect(await instance['length()']()).to.equal(1);

          await instance['add(address)'](values[1]);
          expect(await instance['length()']()).to.equal(2);

          await instance['add(address)'](values[2]);
          expect(await instance['length()']()).to.equal(3);

          await instance['remove(address)'](values[0]);
          expect(await instance['length()']()).to.equal(2);

          await instance['remove(address)'](values[1]);
          expect(await instance['length()']()).to.equal(1);

          await instance['remove(address)'](values[2]);
          expect(await instance['length()']()).to.equal(0);
        });
      });

      describe('#root()', () => {
        it('returns the highest value in the heap', async () => {
          const [min, mid, max] = constants.address;

          await instance['add(address)'](min);
          await instance['add(address)'](mid);
          await instance['add(address)'](max);

          expect(await instance.callStatic['root()']()).to.equal(max);

          await instance['remove(address)'](max);

          expect(await instance.callStatic['root()']()).to.equal(mid);

          await instance['remove(address)'](mid);

          expect(await instance.callStatic['root()']()).to.equal(min);
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(
              instance.callStatic['root()'](),
            ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
          });
        });
      });

      describe('#add(address)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is added', async () => {
          for (let index = 0; index < 10; index++) {
            const value = randomAddress();
            await instance['add(address)'](value);
            checkNodes(await instance.callStatic['toArray()']());
          }
        });

        it('returns true if value is added', async () => {
          expect(await instance.callStatic['add(address)'](randomAddress())).to
            .be.true;
        });

        it('returns false if value has already been added', async () => {
          const value = randomAddress();

          await instance['add(address)'](value);

          expect(await instance.callStatic['add(address)'](value)).to.be.false;
        });
      });

      describe('#remove(address)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is removed', async () => {
          const values: string[] = [];

          for (let index = 0; index < 10; index++) {
            const value = randomAddress();
            await instance['add(address)'](value);
          }

          for (const value of values) {
            await instance['remove(address)'](value);
            checkNodes(await instance.callStatic['toArray()']());
          }
        });

        it('returns true if value is removed', async () => {
          const value = randomAddress();

          await instance['add(address)'](value);

          expect(await instance.callStatic['remove(address)'](value)).to.be
            .true;
        });

        it('returns false if value does not exist', async () => {
          expect(await instance.callStatic['remove(address)'](randomAddress()))
            .to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the max heap as an array', async () => {
          const [min, mid, max] = constants.address;

          await instance['add(address)'](min);
          await instance['add(address)'](mid);
          await instance['add(address)'](max);

          const array = await instance.callStatic['toArray()']();

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
          await instance['add(uint256)'](randomUint256());
          await instance['add(uint256)'](randomUint256());
          await instance['add(uint256)'](randomUint256());

          const array = await instance.callStatic['toArray()']();

          for (const key in array) {
            const value = await instance.callStatic['at(uint256)'](key);
            expect(value).to.equal(array[key]);
          }
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(instance['at(uint256)'](0)).to.be.revertedWithPanic(
              PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS,
            );
          });
        });
      });

      describe('#contains(uint256)', () => {
        it('returns true if the value has been added', async () => {
          const value = randomUint256();

          await instance['add(uint256)'](value);

          expect(await instance['contains(uint256)'](value)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance['contains(uint256)'](randomUint256())).to.be
            .false;
        });
      });

      describe('#indexOf(uint256)', () => {
        it('returns index of the value', async () => {
          await instance['add(uint256)'](randomUint256());
          await instance['add(uint256)'](randomUint256());
          await instance['add(uint256)'](randomUint256());

          const array = await instance.callStatic['toArray()']();

          for (const key in array) {
            const value = array[key];
            const index = await instance.callStatic['indexOf(uint256)'](value);
            expect(index).to.equal(key);
          }
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance['indexOf(uint256)'](randomUint256())).to.equal(
            ethers.constants.MaxUint256,
          );
        });
      });

      describe('#length()', () => {
        it('returns length of binary heap', async () => {
          const values = [randomUint256(), randomUint256(), randomUint256()];

          expect(await instance['length()']()).to.equal(0);

          await instance['add(uint256)'](values[0]);
          expect(await instance['length()']()).to.equal(1);

          await instance['add(uint256)'](values[1]);
          expect(await instance['length()']()).to.equal(2);

          await instance['add(uint256)'](values[2]);
          expect(await instance['length()']()).to.equal(3);

          await instance['remove(uint256)'](values[0]);
          expect(await instance['length()']()).to.equal(2);

          await instance['remove(uint256)'](values[1]);
          expect(await instance['length()']()).to.equal(1);

          await instance['remove(uint256)'](values[2]);
          expect(await instance['length()']()).to.equal(0);
        });
      });

      describe('#root()', () => {
        it('returns the highest value in the heap', async () => {
          const [min, mid, max] = constants.uint256;

          await instance['add(uint256)'](min);
          await instance['add(uint256)'](mid);
          await instance['add(uint256)'](max);

          expect(await instance.callStatic['root()']()).to.equal(max);

          await instance['remove(uint256)'](max);

          expect(await instance.callStatic['root()']()).to.equal(mid);

          await instance['remove(uint256)'](mid);

          expect(await instance.callStatic['root()']()).to.equal(min);
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(
              instance.callStatic['root()'](),
            ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
          });
        });
      });

      describe('#add(uint256)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is added', async () => {
          for (let index = 0; index < 10; index++) {
            const value = randomUint256();
            await instance['add(uint256)'](value);
            checkNodes(await instance.callStatic['toArray()']());
          }
        });

        it('returns true if value is added', async () => {
          expect(await instance.callStatic['add(uint256)'](randomUint256())).to
            .be.true;
        });

        it('returns false if value has already been added', async () => {
          const value = randomUint256();

          await instance['add(uint256)'](value);

          expect(await instance.callStatic['add(uint256)'](value)).to.be.false;
        });
      });

      describe('#remove(uint256)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is removed', async () => {
          const values: number[] = [];

          for (let index = 0; index < 10; index++) {
            const value = randomUint256();
            await instance['add(uint256)'](value);
          }

          for (const value of values) {
            await instance['remove(uint256)'](value);
            checkNodes(await instance.callStatic['toArray()']());
          }
        });

        it('returns true if value is removed', async () => {
          const value = randomUint256();

          await instance['add(uint256)'](value);

          expect(await instance.callStatic['remove(uint256)'](value)).to.be
            .true;
        });

        it('returns false if value does not exist', async () => {
          expect(await instance.callStatic['remove(uint256)'](randomUint256()))
            .to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the max heap as an array', async () => {
          const [min, mid, max] = constants.uint256;

          await instance['add(uint256)'](min);
          await instance['add(uint256)'](mid);
          await instance['add(uint256)'](max);

          const array = await instance.callStatic['toArray()']();

          expect(array.length).to.equal(3);
          expect(array).to.deep.equal([max, min, mid]);
        });
      });
    });
  });
});
