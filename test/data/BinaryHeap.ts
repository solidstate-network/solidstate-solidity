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
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

// checks that the parent node is greater than or equal to the children nodes
function checkNodes(nodes: string[] | BigNumber[]) {
  nodes.forEach((node, index) => {
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (nodes[left] != null) {
      expect(bytes32ToNumber(node)).to.be.greaterThanOrEqual(
        bytes32ToNumber(nodes[left]),
      );
    }

    if (nodes[right] != null) {
      expect(bytes32ToNumber(node)).to.be.greaterThanOrEqual(
        bytes32ToNumber(nodes[right]),
      );
    }
  });
}

describe('BinaryHeap', async () => {
  describe('Bytes32Heap', async () => {
    let instance: BinaryHeapBytes32Mock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new BinaryHeapBytes32Mock__factory(deployer).deploy();
    });

    describe('__internal', () => {
      const zeroBytes32 = bnToBytes32(BigNumber.from(0));
      const oneBytes32 = bnToBytes32(BigNumber.from(1));
      const twoBytes32 = bnToBytes32(BigNumber.from(2));
      const threeBytes32 = bnToBytes32(BigNumber.from(3));
      const fourBytes32 = bnToBytes32(BigNumber.from(4));
      const fiveBytes32 = bnToBytes32(BigNumber.from(5));
      const sixBytes32 = bnToBytes32(BigNumber.from(6));
      const sevenBytes32 = bnToBytes32(BigNumber.from(7));
      const eightBytes32 = bnToBytes32(BigNumber.from(8));
      const nineBytes32 = bnToBytes32(BigNumber.from(9));

      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          expect(await instance['at(uint256)'](0)).to.equal(twoBytes32);
          expect(await instance['at(uint256)'](1)).to.equal(zeroBytes32);
          expect(await instance['at(uint256)'](2)).to.equal(oneBytes32);
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(instance['at(uint256)'](0)).to.be.revertedWith(
              'BinaryHeap: index out of bounds',
            );
          });
        });
      });

      describe('#contains(bytes32)', () => {
        it('returns true if the value has been added', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          expect(await instance['contains(bytes32)'](zeroBytes32)).to.be.true;
          expect(await instance['contains(bytes32)'](oneBytes32)).to.be.true;
          expect(await instance['contains(bytes32)'](twoBytes32)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance['contains(bytes32)'](zeroBytes32)).to.be.false;
        });
      });

      describe('#indexOf(bytes32)', () => {
        it('returns index of the value', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          expect(await instance['indexOf(bytes32)'](zeroBytes32)).to.equal(1);
          expect(await instance['indexOf(bytes32)'](oneBytes32)).to.equal(2);
          expect(await instance['indexOf(bytes32)'](twoBytes32)).to.equal(0);
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance['indexOf(bytes32)'](zeroBytes32)).to.equal(
            ethers.constants.MaxUint256.toString(),
          );
        });
      });

      describe('#length()', () => {
        it('returns length of binary heap', async () => {
          expect(await instance['length()']()).to.equal(0);

          await instance['add(bytes32)'](zeroBytes32);
          expect(await instance['length()']()).to.equal(1);

          await instance['add(bytes32)'](oneBytes32);
          expect(await instance['length()']()).to.equal(2);

          await instance['add(bytes32)'](twoBytes32);
          expect(await instance['length()']()).to.equal(3);

          await instance['remove(bytes32)'](twoBytes32);
          expect(await instance['length()']()).to.equal(2);

          await instance['remove(bytes32)'](oneBytes32);
          expect(await instance['length()']()).to.equal(1);

          await instance['remove(bytes32)'](zeroBytes32);
          expect(await instance['length()']()).to.equal(0);
        });
      });

      describe('#root()', () => {
        it('returns the highest value in the heap', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          expect(await instance['root()']()).to.equal(twoBytes32);
        });

        it('returns the next highest value when the previous highest value is removed', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          await instance['remove(bytes32)'](twoBytes32);
          expect(await instance['root()']()).to.equal(oneBytes32);
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(instance['root()']()).to.be.revertedWith(
              'BinaryHeap: index out of bounds',
            );
          });
        });
      });

      describe('#add(bytes32)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is added', async () => {
          await instance['add(bytes32)'](twoBytes32);
          checkNodes(await instance['toArray()']());

          await instance['add(bytes32)'](zeroBytes32);
          checkNodes(await instance['toArray()']());

          await instance['add(bytes32)'](eightBytes32);
          checkNodes(await instance['toArray()']());

          await instance['add(bytes32)'](threeBytes32);
          checkNodes(await instance['toArray()']());

          await instance['add(bytes32)'](sixBytes32);
          checkNodes(await instance['toArray()']());

          await instance['add(bytes32)'](fourBytes32);
          checkNodes(await instance['toArray()']());

          await instance['add(bytes32)'](fiveBytes32);
          checkNodes(await instance['toArray()']());

          await instance['add(bytes32)'](nineBytes32);
          checkNodes(await instance['toArray()']());

          await instance['add(bytes32)'](sevenBytes32);
          checkNodes(await instance['toArray()']());

          await instance['add(bytes32)'](oneBytes32);
          checkNodes(await instance['toArray()']());
        });

        it('returns true if value is added', async () => {
          expect(await instance.callStatic['add(bytes32)'](zeroBytes32)).to.be
            .true;
        });

        it('returns false if value has already been added', async () => {
          await instance.callStatic['remove(bytes32)'](zeroBytes32);
          expect(await instance.callStatic['remove(bytes32)'](zeroBytes32)).to
            .be.false;
        });
      });

      describe('#remove(bytes32)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is removed', async () => {
          await instance['add(bytes32)'](twoBytes32);
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](eightBytes32);
          await instance['add(bytes32)'](threeBytes32);
          await instance['add(bytes32)'](sixBytes32);
          await instance['add(bytes32)'](fourBytes32);
          await instance['add(bytes32)'](fiveBytes32);
          await instance['add(bytes32)'](nineBytes32);
          await instance['add(bytes32)'](sevenBytes32);
          await instance['add(bytes32)'](oneBytes32);

          await instance['remove(bytes32)'](sixBytes32);
          checkNodes(await instance['toArray()']());

          await instance['remove(bytes32)'](fiveBytes32);
          checkNodes(await instance['toArray()']());

          await instance['remove(bytes32)'](eightBytes32);
          checkNodes(await instance['toArray()']());

          await instance['remove(bytes32)'](twoBytes32);
          checkNodes(await instance['toArray()']());

          await instance['remove(bytes32)'](fourBytes32);
          checkNodes(await instance['toArray()']());

          await instance['remove(bytes32)'](zeroBytes32);
          checkNodes(await instance['toArray()']());

          await instance['remove(bytes32)'](threeBytes32);
          checkNodes(await instance['toArray()']());

          await instance['remove(bytes32)'](nineBytes32);
          checkNodes(await instance['toArray()']());

          await instance['remove(bytes32)'](oneBytes32);
          checkNodes(await instance['toArray()']());

          await instance['remove(bytes32)'](sevenBytes32);
          checkNodes(await instance['toArray()']());
        });

        it('returns true if value is removed', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          expect(await instance.callStatic['remove(bytes32)'](zeroBytes32)).to
            .be.true;
        });

        it('removes value from index mapping and array', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          await instance['remove(bytes32)'](twoBytes32);
          expect(await instance['length()']()).to.be.equal(2);
          expect(await instance['indexOf(bytes32)'](twoBytes32)).to.be.equal(
            ethers.constants.MaxUint256,
          );

          await instance['remove(bytes32)'](oneBytes32);
          expect(await instance['length()']()).to.be.equal(1);
          expect(await instance['indexOf(bytes32)'](oneBytes32)).to.be.equal(
            ethers.constants.MaxUint256,
          );

          await instance['remove(bytes32)'](zeroBytes32);
          expect(await instance['length()']()).to.be.equal(0);
          expect(await instance['indexOf(bytes32)'](zeroBytes32)).to.be.equal(
            ethers.constants.MaxUint256,
          );
        });

        it('returns false if value does not exist', async () => {
          expect(await instance.callStatic['remove(bytes32)'](zeroBytes32)).to
            .be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the max heap as an array', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          expect(await instance['toArray()']()).to.deep.equal([
            twoBytes32,
            zeroBytes32,
            oneBytes32,
          ]);
        });
      });
    });
  });

  describe('AddressHeap', async () => {
    let instance: BinaryHeapAddressMock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new BinaryHeapAddressMock__factory(deployer).deploy();
    });

    describe('__internal', () => {
      const zeroAddress = bnToAddress(BigNumber.from(0));
      const oneAddress = bnToAddress(BigNumber.from(1));
      const twoAddress = bnToAddress(BigNumber.from(2));
      const threeAddress = bnToAddress(BigNumber.from(3));
      const fourAddress = bnToAddress(BigNumber.from(4));
      const fiveAddress = bnToAddress(BigNumber.from(5));
      const sixAddress = bnToAddress(BigNumber.from(6));
      const sevenAddress = bnToAddress(BigNumber.from(7));
      const eightAddress = bnToAddress(BigNumber.from(8));
      const nineAddress = bnToAddress(BigNumber.from(9));

      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          expect(await instance['at(uint256)'](0)).to.equal(twoAddress);
          expect(await instance['at(uint256)'](1)).to.equal(zeroAddress);
          expect(await instance['at(uint256)'](2)).to.equal(oneAddress);
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(instance['at(uint256)'](0)).to.be.revertedWith(
              'BinaryHeap: index out of bounds',
            );
          });
        });
      });

      describe('#contains(address)', () => {
        it('returns true if the value has been added', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          expect(await instance['contains(address)'](zeroAddress)).to.be.true;
          expect(await instance['contains(address)'](oneAddress)).to.be.true;
          expect(await instance['contains(address)'](twoAddress)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance['contains(address)'](zeroAddress)).to.be.false;
        });
      });

      describe('#indexOf(address)', () => {
        it('returns index of the value', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          expect(await instance['indexOf(address)'](zeroAddress)).to.equal(1);
          expect(await instance['indexOf(address)'](oneAddress)).to.equal(2);
          expect(await instance['indexOf(address)'](twoAddress)).to.equal(0);
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance['indexOf(address)'](zeroAddress)).to.equal(
            ethers.constants.MaxUint256.toString(),
          );
        });
      });

      describe('#length()', () => {
        it('returns length of binary heap', async () => {
          expect(await instance['length()']()).to.equal(0);

          await instance['add(address)'](zeroAddress);
          expect(await instance['length()']()).to.equal(1);

          await instance['add(address)'](oneAddress);
          expect(await instance['length()']()).to.equal(2);

          await instance['add(address)'](twoAddress);
          expect(await instance['length()']()).to.equal(3);

          await instance['remove(address)'](twoAddress);
          expect(await instance['length()']()).to.equal(2);

          await instance['remove(address)'](oneAddress);
          expect(await instance['length()']()).to.equal(1);

          await instance['remove(address)'](zeroAddress);
          expect(await instance['length()']()).to.equal(0);
        });
      });

      describe('#root()', () => {
        it('returns the highest value in the heap', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          expect(await instance['root()']()).to.equal(twoAddress);
        });

        it('returns the next highest value when the previous highest value is removed', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          await instance['remove(address)'](twoAddress);
          expect(await instance['root()']()).to.equal(oneAddress);
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(instance['root()']()).to.be.revertedWith(
              'BinaryHeap: index out of bounds',
            );
          });
        });
      });

      describe('#add(address)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is added', async () => {
          await instance['add(address)'](twoAddress);
          checkNodes(await instance['toArray()']());

          await instance['add(address)'](zeroAddress);
          checkNodes(await instance['toArray()']());

          await instance['add(address)'](eightAddress);
          checkNodes(await instance['toArray()']());

          await instance['add(address)'](threeAddress);
          checkNodes(await instance['toArray()']());

          await instance['add(address)'](sixAddress);
          checkNodes(await instance['toArray()']());

          await instance['add(address)'](fourAddress);
          checkNodes(await instance['toArray()']());

          await instance['add(address)'](fiveAddress);
          checkNodes(await instance['toArray()']());

          await instance['add(address)'](nineAddress);
          checkNodes(await instance['toArray()']());

          await instance['add(address)'](sevenAddress);
          checkNodes(await instance['toArray()']());

          await instance['add(address)'](oneAddress);
          checkNodes(await instance['toArray()']());
        });

        it('returns true if value is added', async () => {
          expect(await instance.callStatic['add(address)'](zeroAddress)).to.be
            .true;
        });

        it('returns false if value has already been added', async () => {
          await instance.callStatic['remove(address)'](zeroAddress);
          expect(await instance.callStatic['remove(address)'](zeroAddress)).to
            .be.false;
        });
      });

      describe('#remove(address)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is removed', async () => {
          await instance['add(address)'](twoAddress);
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](eightAddress);
          await instance['add(address)'](threeAddress);
          await instance['add(address)'](sixAddress);
          await instance['add(address)'](fourAddress);
          await instance['add(address)'](fiveAddress);
          await instance['add(address)'](nineAddress);
          await instance['add(address)'](sevenAddress);
          await instance['add(address)'](oneAddress);

          await instance['remove(address)'](sixAddress);
          checkNodes(await instance['toArray()']());

          await instance['remove(address)'](fiveAddress);
          checkNodes(await instance['toArray()']());

          await instance['remove(address)'](eightAddress);
          checkNodes(await instance['toArray()']());

          await instance['remove(address)'](twoAddress);
          checkNodes(await instance['toArray()']());

          await instance['remove(address)'](fourAddress);
          checkNodes(await instance['toArray()']());

          await instance['remove(address)'](zeroAddress);
          checkNodes(await instance['toArray()']());

          await instance['remove(address)'](threeAddress);
          checkNodes(await instance['toArray()']());

          await instance['remove(address)'](nineAddress);
          checkNodes(await instance['toArray()']());

          await instance['remove(address)'](oneAddress);
          checkNodes(await instance['toArray()']());

          await instance['remove(address)'](sevenAddress);
          checkNodes(await instance['toArray()']());
        });

        it('returns true if value is removed', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          expect(await instance.callStatic['remove(address)'](zeroAddress)).to
            .be.true;
        });

        it('removes value from index mapping and array', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          await instance['remove(address)'](twoAddress);
          expect(await instance['length()']()).to.be.equal(2);
          expect(await instance['indexOf(address)'](twoAddress)).to.be.equal(
            ethers.constants.MaxUint256,
          );

          await instance['remove(address)'](oneAddress);
          expect(await instance['length()']()).to.be.equal(1);
          expect(await instance['indexOf(address)'](oneAddress)).to.be.equal(
            ethers.constants.MaxUint256,
          );

          await instance['remove(address)'](zeroAddress);
          expect(await instance['length()']()).to.be.equal(0);
          expect(await instance['indexOf(address)'](zeroAddress)).to.be.equal(
            ethers.constants.MaxUint256,
          );
        });

        it('returns false if value does not exist', async () => {
          expect(await instance.callStatic['remove(address)'](zeroAddress)).to
            .be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the max heap as an array', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          expect(await instance['toArray()']()).to.deep.equal([
            twoAddress,
            zeroAddress,
            oneAddress,
          ]);
        });
      });
    });
  });

  describe('UintHeap', async () => {
    let instance: BinaryHeapUintMock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new BinaryHeapUintMock__factory(deployer).deploy();
    });

    describe('__internal', () => {
      const zero = BigNumber.from(0);
      const one = BigNumber.from(1);
      const two = BigNumber.from(2);
      const three = BigNumber.from(3);
      const four = BigNumber.from(4);
      const five = BigNumber.from(5);
      const six = BigNumber.from(6);
      const seven = BigNumber.from(7);
      const eight = BigNumber.from(8);
      const nine = BigNumber.from(9);

      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          expect(await instance['at(uint256)'](0)).to.equal(two);
          expect(await instance['at(uint256)'](1)).to.equal(zero);
          expect(await instance['at(uint256)'](2)).to.equal(one);
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(instance['at(uint256)'](0)).to.be.revertedWith(
              'BinaryHeap: index out of bounds',
            );
          });
        });
      });

      describe('#contains(uint256)', () => {
        it('returns true if the value has been added', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          expect(await instance['contains(uint256)'](zero)).to.be.true;
          expect(await instance['contains(uint256)'](one)).to.be.true;
          expect(await instance['contains(uint256)'](two)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance['contains(uint256)'](zero)).to.be.false;
        });
      });

      describe('#indexOf(uint256)', () => {
        it('returns index of the value', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          expect(await instance['indexOf(uint256)'](zero)).to.equal(1);
          expect(await instance['indexOf(uint256)'](one)).to.equal(2);
          expect(await instance['indexOf(uint256)'](two)).to.equal(0);
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance['indexOf(uint256)'](zero)).to.equal(
            ethers.constants.MaxUint256.toString(),
          );
        });
      });

      describe('#length()', () => {
        it('returns length of binary heap', async () => {
          expect(await instance['length()']()).to.equal(0);

          await instance['add(uint256)'](zero);
          expect(await instance['length()']()).to.equal(1);

          await instance['add(uint256)'](one);
          expect(await instance['length()']()).to.equal(2);

          await instance['add(uint256)'](two);
          expect(await instance['length()']()).to.equal(3);

          await instance['remove(uint256)'](two);
          expect(await instance['length()']()).to.equal(2);

          await instance['remove(uint256)'](one);
          expect(await instance['length()']()).to.equal(1);

          await instance['remove(uint256)'](zero);
          expect(await instance['length()']()).to.equal(0);
        });
      });

      describe('#root()', () => {
        it('returns the highest value in the heap', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          expect(await instance['root()']()).to.equal(two);
        });

        it('returns the next highest value when the previous highest value is removed', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          await instance['remove(uint256)'](two);
          expect(await instance['root()']()).to.equal(one);
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(instance['root()']()).to.be.revertedWith(
              'BinaryHeap: index out of bounds',
            );
          });
        });
      });

      describe('#add(uint256)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is added', async () => {
          await instance['add(uint256)'](two);
          checkNodes(await instance['toArray()']());

          await instance['add(uint256)'](zero);
          checkNodes(await instance['toArray()']());

          await instance['add(uint256)'](eight);
          checkNodes(await instance['toArray()']());

          await instance['add(uint256)'](three);
          checkNodes(await instance['toArray()']());

          await instance['add(uint256)'](six);
          checkNodes(await instance['toArray()']());

          await instance['add(uint256)'](four);
          checkNodes(await instance['toArray()']());

          await instance['add(uint256)'](five);
          checkNodes(await instance['toArray()']());

          await instance['add(uint256)'](nine);
          checkNodes(await instance['toArray()']());

          await instance['add(uint256)'](seven);
          checkNodes(await instance['toArray()']());

          await instance['add(uint256)'](one);
          checkNodes(await instance['toArray()']());
        });

        it('returns true if value is added', async () => {
          expect(await instance.callStatic['add(uint256)'](zero)).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          await instance.callStatic['remove(uint256)'](zero);
          expect(await instance.callStatic['remove(uint256)'](zero)).to.be
            .false;
        });
      });

      describe('#remove(uint256)', () => {
        it('sets the parent node such that it is greater than or equal to the values of its children when a node is removed', async () => {
          await instance['add(uint256)'](two);
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](eight);
          await instance['add(uint256)'](three);
          await instance['add(uint256)'](six);
          await instance['add(uint256)'](four);
          await instance['add(uint256)'](five);
          await instance['add(uint256)'](nine);
          await instance['add(uint256)'](seven);
          await instance['add(uint256)'](one);

          await instance['remove(uint256)'](six);
          checkNodes(await instance['toArray()']());

          await instance['remove(uint256)'](five);
          checkNodes(await instance['toArray()']());

          await instance['remove(uint256)'](eight);
          checkNodes(await instance['toArray()']());

          await instance['remove(uint256)'](two);
          checkNodes(await instance['toArray()']());

          await instance['remove(uint256)'](four);
          checkNodes(await instance['toArray()']());

          await instance['remove(uint256)'](zero);
          checkNodes(await instance['toArray()']());

          await instance['remove(uint256)'](three);
          checkNodes(await instance['toArray()']());

          await instance['remove(uint256)'](nine);
          checkNodes(await instance['toArray()']());

          await instance['remove(uint256)'](one);
          checkNodes(await instance['toArray()']());

          await instance['remove(uint256)'](seven);
          checkNodes(await instance['toArray()']());
        });

        it('returns true if value is removed', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          expect(await instance.callStatic['remove(uint256)'](zero)).to.be.true;
        });

        it('removes value from index mapping and array', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          await instance['remove(uint256)'](two);
          expect(await instance['length()']()).to.be.equal(2);
          expect(await instance['indexOf(uint256)'](two)).to.be.equal(
            ethers.constants.MaxUint256,
          );

          await instance['remove(uint256)'](one);
          expect(await instance['length()']()).to.be.equal(1);
          expect(await instance['indexOf(uint256)'](one)).to.be.equal(
            ethers.constants.MaxUint256,
          );

          await instance['remove(uint256)'](zero);
          expect(await instance['length()']()).to.be.equal(0);
          expect(await instance['indexOf(uint256)'](zero)).to.be.equal(
            ethers.constants.MaxUint256,
          );
        });

        it('returns false if value does not exist', async () => {
          expect(await instance.callStatic['remove(uint256)'](zero)).to.be
            .false;
        });
      });

      describe('#toArray()', () => {
        it('returns the max heap as an array', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          expect(await instance['toArray()']()).to.deep.equal([two, zero, one]);
        });
      });
    });
  });
});
