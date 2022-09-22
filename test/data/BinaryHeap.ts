import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { bnToBytes32, bnToAddress } from '@solidstate/library';
import {
  BinaryHeapAddressMock,
  BinaryHeapBytes32Mock,
  BinaryHeapUintMock,
  BinaryHeapAddressMock__factory,
  BinaryHeapBytes32Mock__factory,
  BinaryHeapUintMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('BinaryHeap', async () => {
  describe('Bytes32Heap', async () => {
    let instance: BinaryHeapBytes32Mock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new BinaryHeapBytes32Mock__factory(deployer).deploy();
    });

    describe('__internal', () => {
      const zeroBytes32 = bnToBytes32(ethers.constants.Zero);
      const oneBytes32 = bnToBytes32(ethers.constants.One);
      const twoBytes32 = bnToBytes32(ethers.constants.Two);

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
        it('returns value of the root node', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          expect(await instance['root()']()).to.equal(zeroBytes32);

          await instance['add(bytes32)'](oneBytes32);
          expect(await instance['root()']()).to.equal(oneBytes32);

          await instance['add(bytes32)'](twoBytes32);
          expect(await instance['root()']()).to.equal(twoBytes32);

          await instance['remove(bytes32)'](twoBytes32);
          expect(await instance['root()']()).to.equal(oneBytes32);

          await instance['remove(bytes32)'](oneBytes32);
          expect(await instance['root()']()).to.equal(zeroBytes32);
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
        it('adds value to heap', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          expect(await instance['heap()']()).to.deep.equal([
            twoBytes32,
            zeroBytes32,
            oneBytes32,
          ]);
        });
      });

      describe('#remove(bytes32)', () => {
        it('removes value from heap', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          await instance['remove(bytes32)'](zeroBytes32);
          expect(await instance['heap()']()).to.deep.equal([
            twoBytes32,
            oneBytes32,
          ]);
        });

        it('returns true if value is removed', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          expect(await instance.callStatic['remove(bytes32)'](zeroBytes32)).to
            .be.true;
        });

        it('returns false if value is not removed', async () => {
          expect(await instance.callStatic['remove(bytes32)'](zeroBytes32)).to
            .be.false;
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
      const zeroAddress = bnToAddress(ethers.constants.Zero);
      const oneAddress = bnToAddress(ethers.constants.One);
      const twoAddress = bnToAddress(ethers.constants.Two);

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

      describe('#contains(bytes32)', () => {
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
        it('returns value of the root node', async () => {
          await instance['add(address)'](zeroAddress);
          expect(await instance['root()']()).to.equal(zeroAddress);

          await instance['add(address)'](oneAddress);
          expect(await instance['root()']()).to.equal(oneAddress);

          await instance['add(address)'](twoAddress);
          expect(await instance['root()']()).to.equal(twoAddress);

          await instance['remove(address)'](twoAddress);
          expect(await instance['root()']()).to.equal(oneAddress);

          await instance['remove(address)'](oneAddress);
          expect(await instance['root()']()).to.equal(zeroAddress);
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
        it('adds value to heap', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          expect(await instance['heap()']()).to.deep.equal([
            twoAddress,
            zeroAddress,
            oneAddress,
          ]);
        });
      });

      describe('#remove(address)', () => {
        it('removes value from heap', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          await instance['remove(address)'](zeroAddress);
          expect(await instance['heap()']()).to.deep.equal([
            twoAddress,
            oneAddress,
          ]);
        });

        it('returns true if value is removed', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          expect(await instance.callStatic['remove(address)'](zeroAddress)).to
            .be.true;
        });

        it('returns false if value is not removed', async () => {
          expect(await instance.callStatic['remove(address)'](zeroAddress)).to
            .be.false;
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
      const zero = ethers.constants.Zero;
      const one = ethers.constants.One;
      const two = ethers.constants.Two;

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

      describe('#contains(bytes32)', () => {
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
        it('returns value of the root node', async () => {
          await instance['add(uint256)'](zero);
          expect(await instance['root()']()).to.equal(zero);

          await instance['add(uint256)'](one);
          expect(await instance['root()']()).to.equal(one);

          await instance['add(uint256)'](two);
          expect(await instance['root()']()).to.equal(two);

          await instance['remove(uint256)'](two);
          expect(await instance['root()']()).to.equal(one);

          await instance['remove(uint256)'](one);
          expect(await instance['root()']()).to.equal(zero);
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
        it('adds value to heap', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          expect(await instance['heap()']()).to.deep.equal([two, zero, one]);
        });
      });

      describe('#remove(uint256)', () => {
        it('removes value from heap', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          await instance['remove(uint256)'](zero);
          expect(await instance['heap()']()).to.deep.equal([two, one]);
        });

        it('returns true if value is removed', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          expect(await instance.callStatic['remove(uint256)'](zero)).to.be.true;
        });

        it('returns false if value is not removed', async () => {
          expect(await instance.callStatic['remove(uint256)'](zero)).to.be
            .false;
        });
      });
    });
  });
});
