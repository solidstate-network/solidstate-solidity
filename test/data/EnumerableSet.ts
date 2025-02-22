import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { bigintToBytes32, bigintToAddress } from '@solidstate/library';
import {
  EnumerableSetBytes32Mock,
  EnumerableSetBytes32Mock__factory,
  EnumerableSetAddressMock,
  EnumerableSetAddressMock__factory,
  EnumerableSetUintMock,
  EnumerableSetUintMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('EnumerableSet', async () => {
  describe('Bytes32Set', async () => {
    let instance: EnumerableSetBytes32Mock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new EnumerableSetBytes32Mock__factory(deployer).deploy();
    });

    describe('__internal', () => {
      const zeroBytes32 = bigintToBytes32(0);
      const oneBytes32 = bigintToBytes32(1);
      const twoBytes32 = bigintToBytes32(2);

      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance.add(zeroBytes32);
          await instance.add(oneBytes32);
          await instance.add(twoBytes32);

          expect(await instance.at(0)).to.equal(zeroBytes32);
          expect(await instance.at(1)).to.equal(oneBytes32);
          expect(await instance.at(2)).to.equal(twoBytes32);
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(instance.at(0)).to.be.revertedWithCustomError(
              instance,
              'EnumerableSet__IndexOutOfBounds',
            );
          });
        });
      });

      describe('#contains(bytes32)', () => {
        it('returns true if the value has been added', async () => {
          await instance.add(zeroBytes32);
          await instance.add(oneBytes32);
          await instance.add(twoBytes32);

          expect(await instance.contains(zeroBytes32)).to.be.true;
          expect(await instance.contains(oneBytes32)).to.be.true;
          expect(await instance.contains(twoBytes32)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance.contains(zeroBytes32)).to.be.false;
        });
      });

      describe('#indexOf(bytes32)', () => {
        it('returns index of the value', async () => {
          await instance.add(zeroBytes32);
          await instance.add(twoBytes32);
          await instance.add(oneBytes32);

          expect(await instance.indexOf(zeroBytes32)).to.equal(0);
          expect(await instance.indexOf(oneBytes32)).to.equal(2);
          expect(await instance.indexOf(twoBytes32)).to.equal(1);

          await instance.remove(zeroBytes32);
          await instance.remove(oneBytes32);
          await instance.remove(twoBytes32);

          expect(await instance.indexOf(twoBytes32)).to.be.equal(
            ethers.MaxUint256,
          );

          expect(await instance.indexOf(oneBytes32)).to.be.equal(
            ethers.MaxUint256,
          );

          expect(await instance.indexOf(zeroBytes32)).to.be.equal(
            ethers.MaxUint256,
          );
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance.indexOf(zeroBytes32)).to.equal(
            ethers.MaxUint256,
          );
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable set', async () => {
          expect(await instance.length()).to.equal(0);

          await instance.add(zeroBytes32);
          expect(await instance.length()).to.equal(1);

          await instance.add(oneBytes32);
          expect(await instance.length()).to.equal(2);

          await instance.add(twoBytes32);
          expect(await instance.length()).to.equal(3);

          await instance.remove(twoBytes32);
          expect(await instance.length()).to.equal(2);

          await instance.remove(oneBytes32);
          expect(await instance.length()).to.equal(1);

          await instance.remove(zeroBytes32);
          expect(await instance.length()).to.equal(0);
        });
      });

      describe('#add(bytes32)', () => {
        it('adds value to set', async () => {
          await instance.add(zeroBytes32);
          await instance.add(oneBytes32);
          await instance.add(twoBytes32);

          expect(await instance.toArray()).to.deep.equal([
            zeroBytes32,
            oneBytes32,
            twoBytes32,
          ]);
        });

        it('returns true if value is added', async () => {
          expect(await instance.add.staticCall(zeroBytes32)).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          await instance.add(zeroBytes32);
          expect(await instance.add.staticCall(zeroBytes32)).to.be.false;
        });
      });

      describe('#remove(bytes32)', () => {
        it('removes value from set', async () => {
          await instance.add(zeroBytes32);
          await instance.add(oneBytes32);
          await instance.add(twoBytes32);

          await instance.remove(zeroBytes32);
          expect(await instance.toArray()).to.deep.equal([
            twoBytes32,
            oneBytes32,
          ]);
        });

        it('returns true if value is removed', async () => {
          await instance.add(zeroBytes32);
          await instance.add(oneBytes32);
          await instance.add(twoBytes32);

          expect(await instance.remove.staticCall(zeroBytes32)).to.be.true;
        });

        it('returns false if value is not removed', async () => {
          expect(await instance.remove.staticCall(zeroBytes32)).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the set as an array', async () => {
          await instance.add(zeroBytes32);
          await instance.add(twoBytes32);
          await instance.add(oneBytes32);

          expect(await instance.toArray()).to.deep.equal([
            zeroBytes32,
            twoBytes32,
            oneBytes32,
          ]);
        });
      });
    });
  });

  describe('AddressSet', async () => {
    let instance: EnumerableSetAddressMock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new EnumerableSetAddressMock__factory(deployer).deploy();
    });

    describe('__internal', () => {
      const zeroAddress = bigintToAddress(0);
      const oneAddress = bigintToAddress(1);
      const twoAddress = bigintToAddress(2);

      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance.add(zeroAddress);
          await instance.add(twoAddress);
          await instance.add(oneAddress);

          expect(await instance.at(0)).to.equal(zeroAddress);
          expect(await instance.at(1)).to.equal(twoAddress);
          expect(await instance.at(2)).to.equal(oneAddress);
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(instance.at(0)).to.be.revertedWithCustomError(
              instance,
              'EnumerableSet__IndexOutOfBounds',
            );
          });
        });
      });

      describe('#contains(address)', () => {
        it('returns true if the value has been added', async () => {
          await instance.add(zeroAddress);
          await instance.add(twoAddress);
          await instance.add(oneAddress);

          expect(await instance.contains(zeroAddress)).to.be.true;
          expect(await instance.contains(oneAddress)).to.be.true;
          expect(await instance.contains(twoAddress)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance.contains(zeroAddress)).to.be.false;
        });
      });

      describe('#indexOf(address)', () => {
        it('returns index of the value', async () => {
          await instance.add(zeroAddress);
          await instance.add(twoAddress);
          await instance.add(oneAddress);

          expect(await instance.indexOf(zeroAddress)).to.equal(0);
          expect(await instance.indexOf(oneAddress)).to.equal(2);
          expect(await instance.indexOf(twoAddress)).to.equal(1);

          await instance.remove(zeroAddress);
          await instance.remove(oneAddress);
          await instance.remove(twoAddress);

          expect(await instance.indexOf(twoAddress)).to.be.equal(
            ethers.MaxUint256,
          );

          expect(await instance.indexOf(oneAddress)).to.be.equal(
            ethers.MaxUint256,
          );

          expect(await instance.indexOf(zeroAddress)).to.be.equal(
            ethers.MaxUint256,
          );
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance.indexOf(zeroAddress)).to.equal(
            ethers.MaxUint256,
          );
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable set', async () => {
          expect(await instance.length()).to.equal(0);

          await instance.add(zeroAddress);
          expect(await instance.length()).to.equal(1);

          await instance.add(oneAddress);
          expect(await instance.length()).to.equal(2);

          await instance.add(twoAddress);
          expect(await instance.length()).to.equal(3);

          await instance.remove(twoAddress);
          expect(await instance.length()).to.equal(2);

          await instance.remove(oneAddress);
          expect(await instance.length()).to.equal(1);

          await instance.remove(zeroAddress);
          expect(await instance.length()).to.equal(0);
        });
      });

      describe('#add(address)', () => {
        it('adds value to set', async () => {
          await instance.add(zeroAddress);
          await instance.add(oneAddress);
          await instance.add(twoAddress);

          expect(await instance.toArray()).to.deep.equal([
            zeroAddress,
            oneAddress,
            twoAddress,
          ]);
        });

        it('returns true if value is added', async () => {
          expect(await instance.add.staticCall(zeroAddress)).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          await instance.add(zeroAddress);
          expect(await instance.add.staticCall(zeroAddress)).to.be.false;
        });
      });

      describe('#remove(address)', () => {
        it('removes value from set', async () => {
          await instance.add(zeroAddress);
          await instance.add(oneAddress);
          await instance.add(twoAddress);

          await instance.remove(zeroAddress);
          expect(await instance.toArray()).to.deep.equal([
            twoAddress,
            oneAddress,
          ]);
        });

        it('returns true if value is removed', async () => {
          await instance.add(zeroAddress);
          await instance.add(oneAddress);
          await instance.add(twoAddress);

          expect(await instance.remove.staticCall(zeroAddress)).to.be.true;
        });

        it('returns false if value is not removed', async () => {
          expect(await instance.remove.staticCall(zeroAddress)).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the set as an array', async () => {
          await instance.add(zeroAddress);
          await instance.add(twoAddress);
          await instance.add(oneAddress);

          expect(await instance.toArray()).to.deep.equal([
            zeroAddress,
            twoAddress,
            oneAddress,
          ]);
        });
      });
    });
  });

  describe('UintSet', async () => {
    let instance: EnumerableSetUintMock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new EnumerableSetUintMock__factory(deployer).deploy();
    });

    describe('__internal', () => {
      const zero = 0;
      const one = 1;
      const two = 2;

      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance.add(zero);
          await instance.add(two);
          await instance.add(one);

          expect(await instance.at(0)).to.equal(zero);
          expect(await instance.at(1)).to.equal(two);
          expect(await instance.at(2)).to.equal(one);
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(instance.at(0)).to.be.revertedWithCustomError(
              instance,
              'EnumerableSet__IndexOutOfBounds',
            );
          });
        });
      });

      describe('#contains(uint256)', () => {
        it('returns true if the value has been added', async () => {
          await instance.add(zero);
          await instance.add(two);
          await instance.add(one);

          expect(await instance.contains(zero)).to.be.true;
          expect(await instance.contains(one)).to.be.true;
          expect(await instance.contains(two)).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(await instance.contains(zero)).to.be.false;
        });
      });

      describe('#indexOf(uint256)', () => {
        it('returns index of the value', async () => {
          await instance.add(zero);
          await instance.add(two);
          await instance.add(one);

          expect(await instance.indexOf(zero)).to.equal(0);
          expect(await instance.indexOf(one)).to.equal(2);
          expect(await instance.indexOf(two)).to.equal(1);

          await instance.remove(zero);
          await instance.remove(one);
          await instance.remove(two);

          expect(await instance.indexOf(two)).to.be.equal(ethers.MaxUint256);

          expect(await instance.indexOf(one)).to.be.equal(ethers.MaxUint256);

          expect(await instance.indexOf(zero)).to.be.equal(ethers.MaxUint256);
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance.indexOf(zero)).to.equal(ethers.MaxUint256);
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable set', async () => {
          expect(await instance.length()).to.equal(0);

          await instance.add(zero);
          expect(await instance.length()).to.equal(1);

          await instance.add(one);
          expect(await instance.length()).to.equal(2);

          await instance.add(two);
          expect(await instance.length()).to.equal(3);

          await instance.remove(two);
          expect(await instance.length()).to.equal(2);

          await instance.remove(one);
          expect(await instance.length()).to.equal(1);

          await instance.remove(zero);
          expect(await instance.length()).to.equal(0);
        });
      });

      describe('#add(uint256)', () => {
        it('adds value to set', async () => {
          await instance.add(zero);
          await instance.add(one);
          await instance.add(two);

          expect(await instance.toArray()).to.deep.equal([zero, one, two]);
        });

        it('returns true if value is added', async () => {
          expect(await instance.add.staticCall(zero)).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          await instance.add(zero);
          expect(await instance.add.staticCall(zero)).to.be.false;
        });
      });

      describe('#remove(uint256)', () => {
        it('removes value from set', async () => {
          await instance.add(zero);
          await instance.add(one);
          await instance.add(two);

          await instance.remove(zero);
          expect(await instance.toArray()).to.deep.equal([two, one]);
        });

        it('returns true if value is removed', async () => {
          await instance.add(zero);
          await instance.add(one);
          await instance.add(two);

          expect(await instance.remove.staticCall(zero)).to.be.true;
        });

        it('returns false if value is not removed', async () => {
          expect(await instance.remove.staticCall(zero)).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the set as an array', async () => {
          await instance.add(zero);
          await instance.add(two);
          await instance.add(one);

          expect(await instance.toArray()).to.deep.equal([zero, two, one]);
        });
      });
    });
  });
});
