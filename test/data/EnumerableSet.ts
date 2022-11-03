import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { bnToBytes32, bnToAddress } from '@solidstate/library';
import {
  EnumerableSetBytes32Mock,
  EnumerableSetBytes32Mock__factory,
  EnumerableSetAddressMock,
  EnumerableSetAddressMock__factory,
  EnumerableSetUintMock,
  EnumerableSetUintMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
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
      const zeroBytes32 = bnToBytes32(ethers.constants.Zero);
      const oneBytes32 = bnToBytes32(ethers.constants.One);
      const twoBytes32 = bnToBytes32(ethers.constants.Two);

      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          expect(await instance['at(uint256)'](0)).to.equal(zeroBytes32);
          expect(await instance['at(uint256)'](1)).to.equal(oneBytes32);
          expect(await instance['at(uint256)'](2)).to.equal(twoBytes32);
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(
              instance['at(uint256)'](0),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableSet__IndexOutOfBounds',
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
          await instance['add(bytes32)'](twoBytes32);
          await instance['add(bytes32)'](oneBytes32);

          expect(await instance['indexOf(bytes32)'](zeroBytes32)).to.equal(0);
          expect(await instance['indexOf(bytes32)'](oneBytes32)).to.equal(2);
          expect(await instance['indexOf(bytes32)'](twoBytes32)).to.equal(1);

          await instance['remove(bytes32)'](zeroBytes32);
          await instance['remove(bytes32)'](oneBytes32);
          await instance['remove(bytes32)'](twoBytes32);

          expect(await instance['indexOf(bytes32)'](twoBytes32)).to.be.equal(
            ethers.constants.MaxUint256,
          );

          expect(await instance['indexOf(bytes32)'](oneBytes32)).to.be.equal(
            ethers.constants.MaxUint256,
          );

          expect(await instance['indexOf(bytes32)'](zeroBytes32)).to.be.equal(
            ethers.constants.MaxUint256,
          );
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance['indexOf(bytes32)'](zeroBytes32)).to.equal(
            ethers.constants.MaxUint256.toString(),
          );
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable set', async () => {
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

      describe('#add(bytes32)', () => {
        it('adds value to set', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          expect(await instance['toArray()']()).to.deep.equal([
            zeroBytes32,
            oneBytes32,
            twoBytes32,
          ]);
        });

        it('returns true if value is added', async () => {
          expect(await instance.callStatic['add(bytes32)'](zeroBytes32)).to.be
            .true;
        });

        it('returns false if value has already been added', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          expect(await instance.callStatic['add(bytes32)'](zeroBytes32)).to.be
            .false;
        });
      });

      describe('#remove(bytes32)', () => {
        it('removes value from set', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          await instance['remove(bytes32)'](zeroBytes32);
          expect(await instance['toArray()']()).to.deep.equal([
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

      describe('#toArray()', () => {
        it('returns the set as an array', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](twoBytes32);
          await instance['add(bytes32)'](oneBytes32);

          expect(await instance['toArray()']()).to.deep.equal([
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
      const zeroAddress = bnToAddress(BigNumber.from(0));
      const oneAddress = bnToAddress(BigNumber.from(1));
      const twoAddress = bnToAddress(BigNumber.from(2));

      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](twoAddress);
          await instance['add(address)'](oneAddress);

          expect(await instance['at(uint256)'](0)).to.equal(zeroAddress);
          expect(await instance['at(uint256)'](1)).to.equal(twoAddress);
          expect(await instance['at(uint256)'](2)).to.equal(oneAddress);
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(
              instance['at(uint256)'](0),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableSet__IndexOutOfBounds',
            );
          });
        });
      });

      describe('#contains(address)', () => {
        it('returns true if the value has been added', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](twoAddress);
          await instance['add(address)'](oneAddress);

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
          await instance['add(address)'](twoAddress);
          await instance['add(address)'](oneAddress);

          expect(await instance['indexOf(address)'](zeroAddress)).to.equal(0);
          expect(await instance['indexOf(address)'](oneAddress)).to.equal(2);
          expect(await instance['indexOf(address)'](twoAddress)).to.equal(1);

          await instance['remove(address)'](zeroAddress);
          await instance['remove(address)'](oneAddress);
          await instance['remove(address)'](twoAddress);

          expect(await instance['indexOf(address)'](twoAddress)).to.be.equal(
            ethers.constants.MaxUint256,
          );

          expect(await instance['indexOf(address)'](oneAddress)).to.be.equal(
            ethers.constants.MaxUint256,
          );

          expect(await instance['indexOf(address)'](zeroAddress)).to.be.equal(
            ethers.constants.MaxUint256,
          );
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance['indexOf(address)'](zeroAddress)).to.equal(
            ethers.constants.MaxUint256.toString(),
          );
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable set', async () => {
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

      describe('#add(address)', () => {
        it('adds value to set', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          expect(await instance['toArray()']()).to.deep.equal([
            zeroAddress,
            oneAddress,
            twoAddress,
          ]);
        });

        it('returns true if value is added', async () => {
          expect(await instance.callStatic['add(address)'](zeroAddress)).to.be
            .true;
        });

        it('returns false if value has already been added', async () => {
          await instance['add(address)'](zeroAddress);
          expect(await instance.callStatic['add(address)'](zeroAddress)).to.be
            .false;
        });
      });

      describe('#remove(address)', () => {
        it('removes value from set', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](oneAddress);
          await instance['add(address)'](twoAddress);

          await instance['remove(address)'](zeroAddress);
          expect(await instance['toArray()']()).to.deep.equal([
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

      describe('#toArray()', () => {
        it('returns the set as an array', async () => {
          await instance['add(address)'](zeroAddress);
          await instance['add(address)'](twoAddress);
          await instance['add(address)'](oneAddress);

          expect(await instance['toArray()']()).to.deep.equal([
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
      const zero = ethers.constants.Zero;
      const one = ethers.constants.One;
      const two = ethers.constants.Two;

      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](two);
          await instance['add(uint256)'](one);

          expect(await instance['at(uint256)'](0)).to.equal(zero);
          expect(await instance['at(uint256)'](1)).to.equal(two);
          expect(await instance['at(uint256)'](2)).to.equal(one);
        });

        describe('reverts if', function () {
          it('index out of bounds', async () => {
            await expect(
              instance['at(uint256)'](0),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableSet__IndexOutOfBounds',
            );
          });
        });
      });

      describe('#contains(uint256)', () => {
        it('returns true if the value has been added', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](two);
          await instance['add(uint256)'](one);

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
          await instance['add(uint256)'](two);
          await instance['add(uint256)'](one);

          expect(await instance['indexOf(uint256)'](zero)).to.equal(0);
          expect(await instance['indexOf(uint256)'](one)).to.equal(2);
          expect(await instance['indexOf(uint256)'](two)).to.equal(1);

          await instance['remove(uint256)'](zero);
          await instance['remove(uint256)'](one);
          await instance['remove(uint256)'](two);

          expect(await instance['indexOf(uint256)'](two)).to.be.equal(
            ethers.constants.MaxUint256,
          );

          expect(await instance['indexOf(uint256)'](one)).to.be.equal(
            ethers.constants.MaxUint256,
          );

          expect(await instance['indexOf(uint256)'](zero)).to.be.equal(
            ethers.constants.MaxUint256,
          );
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(await instance['indexOf(uint256)'](zero)).to.equal(
            ethers.constants.MaxUint256.toString(),
          );
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable set', async () => {
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

      describe('#add(uint256)', () => {
        it('adds value to set', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          expect(await instance['toArray()']()).to.deep.equal([zero, one, two]);
        });

        it('returns true if value is added', async () => {
          expect(await instance.callStatic['add(uint256)'](zero)).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          await instance['add(uint256)'](zero);
          expect(await instance.callStatic['add(uint256)'](zero)).to.be.false;
        });
      });

      describe('#remove(uint256)', () => {
        it('removes value from set', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](one);
          await instance['add(uint256)'](two);

          await instance['remove(uint256)'](zero);
          expect(await instance['toArray()']()).to.deep.equal([two, one]);
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

      describe('#toArray()', () => {
        it('returns the set as an array', async () => {
          await instance['add(uint256)'](zero);
          await instance['add(uint256)'](two);
          await instance['add(uint256)'](one);

          expect(await instance['toArray()']()).to.deep.equal([zero, two, one]);
        });
      });
    });
  });
});
