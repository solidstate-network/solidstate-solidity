import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { bnToAddress } from '@solidstate/library';
import {
  EnumerableMapAddressToAddressMock,
  EnumerableMapAddressToAddressMock__factory,
  EnumerableMapUintToAddressMock,
  EnumerableMapUintToAddressMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe('EnumerableMap', () => {
  describe('AddressToAddressMap', async () => {
    let instance: EnumerableMapAddressToAddressMock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new EnumerableMapAddressToAddressMock__factory(
        deployer,
      ).deploy();
    });

    describe('__internal', () => {
      const addressOne = bnToAddress(BigNumber.from('100'));
      const addressTwo = bnToAddress(BigNumber.from('200'));
      const addressThree = bnToAddress(BigNumber.from('300'));
      const addressFour = bnToAddress(BigNumber.from('400'));
      const addressFive = bnToAddress(BigNumber.from('500'));
      const addressSix = bnToAddress(BigNumber.from('600'));

      describe('#at(uint256)', () => {
        it('returns value coresponding to index provided', async () => {
          await instance['set(address,address)'](addressOne, addressFour);
          await instance['set(address,address)'](addressTwo, addressFive);
          await instance['set(address,address)'](addressThree, addressSix);

          expect(await instance['at(uint256)'](0)).to.deep.equal([
            addressOne,
            addressFour,
          ]);
          expect(await instance['at(uint256)'](1)).to.deep.equal([
            addressTwo,
            addressFive,
          ]);
          expect(await instance['at(uint256)'](2)).to.deep.equal([
            addressThree,
            addressSix,
          ]);
        });

        describe('reverts if', () => {
          it('index is out of bounds', async () => {
            await expect(
              instance['at(uint256)'](0),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableMap__IndexOutOfBounds',
            );
          });
        });
      });

      describe('#contains(address)', () => {
        it('returns true if value has been added', async () => {
          await instance['set(address,address)'](addressOne, addressFour);
          await instance['set(address,address)'](addressTwo, addressFive);
          await instance['set(address,address)'](addressThree, addressSix);

          expect(await instance['contains(address)'](addressOne)).to.be.true;
          expect(await instance['contains(address)'](addressTwo)).to.be.true;
          expect(await instance['contains(address)'](addressThree)).to.be.true;
        });

        it('returns false if value has not been added', async () => {
          expect(await instance['contains(address)'](addressFour)).to.be.false;
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable map', async () => {
          expect(await instance['length()']()).to.equal(0);

          await instance['set(address,address)'](addressOne, addressFour);
          expect(await instance['length()']()).to.equal(1);

          await instance['set(address,address)'](addressTwo, addressFive);
          expect(await instance['length()']()).to.equal(2);

          await instance['set(address,address)'](addressThree, addressSix);
          expect(await instance['length()']()).to.equal(3);

          await instance['remove(address)'](addressThree);
          expect(await instance['length()']()).to.equal(2);

          await instance['remove(address)'](addressTwo);
          expect(await instance['length()']()).to.equal(1);

          await instance['remove(address)'](addressOne);
          expect(await instance['length()']()).to.equal(0);
        });
      });

      describe('#get(address)', () => {
        it('returns address stored at key', async () => {
          await instance['set(address,address)'](addressOne, addressFour);
          await instance['set(address,address)'](addressTwo, addressFive);
          await instance['set(address,address)'](addressThree, addressSix);

          expect(await instance['get(address)'](addressOne)).to.eq(addressFour);
          expect(await instance['get(address)'](addressTwo)).to.eq(addressFive);
          expect(await instance['get(address)'](addressThree)).to.eq(
            addressSix,
          );
        });

        describe('reverts if', () => {
          it('key does not exist', async () => {
            await expect(
              instance['get(address)'](addressOne),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableMap__NonExistentKey',
            );
          });
        });
      });

      describe('#set(address,address)', () => {
        it('sets the address value at address key', async () => {
          await instance['set(address,address)'](addressOne, addressFour);
          await instance['set(address,address)'](addressTwo, addressFive);
          await instance['set(address,address)'](addressThree, addressSix);

          expect(await instance['contains(address)'](addressOne)).to.be.true;
          expect(await instance['contains(address)'](addressTwo)).to.be.true;
          expect(await instance['contains(address)'](addressThree)).to.be.true;

          expect(await instance['get(address)'](addressOne)).to.eq(addressFour);
          expect(await instance['get(address)'](addressTwo)).to.eq(addressFive);
          expect(await instance['get(address)'](addressThree)).to.eq(
            addressSix,
          );
        });

        it('returns true if address value is added at address key', async () => {
          expect(
            await instance.callStatic['set(address,address)'](
              addressOne,
              addressFour,
            ),
          ).to.be.true;
        });
      });

      describe('#remove(address)', () => {
        it('removes the address value at given address key', async () => {
          await instance['set(address,address)'](addressOne, addressFour);
          await instance['set(address,address)'](addressTwo, addressFive);
          await instance['set(address,address)'](addressThree, addressSix);

          expect(await instance['length()']()).to.eq(3);

          await instance['remove(address)'](addressOne);
          await expect(
            instance['get(address)'](addressOne),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
          expect(await instance['length()']()).to.eq(2);

          await instance['remove(address)'](addressTwo);
          await expect(
            instance['get(address)'](addressTwo),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
          expect(await instance['length()']()).to.eq(1);

          await instance['remove(address)'](addressThree);
          await expect(
            instance['get(address)'](addressThree),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
          expect(await instance['length()']()).to.eq(0);
        });

        it('returns true if address key removed', async () => {
          await instance['set(address,address)'](addressOne, addressFour);
          expect(await instance.callStatic['remove(address)'](addressOne)).to.be
            .true;
        });
        it('returns false if address key does not exist', async () => {
          expect(await instance.callStatic['remove(address)'](addressOne)).to.be
            .false;
        });
      });
    });
  });

  describe('UintToAddressMap', async () => {
    let instance: EnumerableMapUintToAddressMock;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new EnumerableMapUintToAddressMock__factory(
        deployer,
      ).deploy();
    });

    describe('__internal', () => {
      const addressOne = bnToAddress(BigNumber.from('100'));
      const addressTwo = bnToAddress(BigNumber.from('200'));
      const addressThree = bnToAddress(BigNumber.from('300'));
      const uintOne = BigNumber.from('1');
      const uintTwo = BigNumber.from('2');
      const uintThree = BigNumber.from('3');

      describe('#at(uint256)', () => {
        it('returns value coresponding to index provided', async () => {
          await instance['set(uint256,address)'](uintOne, addressOne);
          await instance['set(uint256,address)'](uintTwo, addressTwo);
          await instance['set(uint256,address)'](uintThree, addressThree);

          expect(await instance['at(uint256)'](0)).to.deep.equal([
            uintOne,
            addressOne,
          ]);
          expect(await instance['at(uint256)'](1)).to.deep.equal([
            uintTwo,
            addressTwo,
          ]);
          expect(await instance['at(uint256)'](2)).to.deep.equal([
            uintThree,
            addressThree,
          ]);
        });

        describe('reverts if', () => {
          it('index is out of bounds', async () => {
            await expect(
              instance['at(uint256)'](0),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableMap__IndexOutOfBounds',
            );
          });
        });
      });

      describe('#contains(uint256)', () => {
        it('returns true if value has been added', async () => {
          await instance['set(uint256,address)'](uintOne, addressOne);
          await instance['set(uint256,address)'](uintTwo, addressTwo);
          await instance['set(uint256,address)'](uintThree, addressThree);

          expect(await instance['contains(uint256)'](uintOne)).to.be.true;
          expect(await instance['contains(uint256)'](uintTwo)).to.be.true;
          expect(await instance['contains(uint256)'](uintThree)).to.be.true;
        });

        it('returns false if value has not been added', async () => {
          expect(await instance['contains(uint256)'](uintOne)).to.be.false;
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable map', async () => {
          expect(await instance['length()']()).to.equal(0);

          await instance['set(uint256,address)'](uintOne, addressOne);
          expect(await instance['length()']()).to.equal(1);

          await instance['set(uint256,address)'](uintTwo, addressTwo);
          expect(await instance['length()']()).to.equal(2);

          await instance['set(uint256,address)'](uintThree, addressThree);
          expect(await instance['length()']()).to.equal(3);

          await instance['remove(uint256)'](uintOne);
          expect(await instance['length()']()).to.equal(2);

          await instance['remove(uint256)'](uintTwo);
          expect(await instance['length()']()).to.equal(1);

          await instance['remove(uint256)'](uintThree);
          expect(await instance['length()']()).to.equal(0);
        });
      });

      describe('#get(uint256)', () => {
        it('returns address stored at key', async () => {
          await instance['set(uint256,address)'](uintOne, addressOne);
          await instance['set(uint256,address)'](uintTwo, addressTwo);
          await instance['set(uint256,address)'](uintThree, addressThree);

          expect(await instance['get(uint256)'](uintOne)).to.eq(addressOne);
          expect(await instance['get(uint256)'](uintTwo)).to.eq(addressTwo);
          expect(await instance['get(uint256)'](uintThree)).to.eq(addressThree);
        });

        describe('reverts if', () => {
          it('key does not exist', async () => {
            await expect(
              instance['get(uint256)'](uintOne),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableMap__NonExistentKey',
            );
          });
        });
      });

      describe('#set(uint256,address)', () => {
        it('sets the address value at uint256 key', async () => {
          await instance['set(uint256,address)'](uintOne, addressOne);
          await instance['set(uint256,address)'](uintTwo, addressTwo);
          await instance['set(uint256,address)'](uintThree, addressThree);

          expect(await instance['contains(uint256)'](uintOne)).to.be.true;
          expect(await instance['contains(uint256)'](uintTwo)).to.be.true;
          expect(await instance['contains(uint256)'](uintThree)).to.be.true;

          expect(await instance['get(uint256)'](uintOne)).to.eq(addressOne);
          expect(await instance['get(uint256)'](uintTwo)).to.eq(addressTwo);
          expect(await instance['get(uint256)'](uintThree)).to.eq(addressThree);
        });

        it('returns true if address value is added at uint256 key', async () => {
          expect(
            await instance.callStatic['set(uint256,address)'](
              uintOne,
              addressOne,
            ),
          ).to.be.true;
        });

        it('returns false if address value is already added at uint256 key', async () => {
          await instance['set(uint256,address)'](uintOne, addressOne);

          expect(
            await instance.callStatic['set(uint256,address)'](
              uintOne,
              addressOne,
            ),
          ).to.be.false;
        });
      });

      describe('#remove(uint256)', () => {
        it('removes the address value at given uint256 key', async () => {
          await instance['set(uint256,address)'](uintOne, addressOne);
          await instance['set(uint256,address)'](uintTwo, addressTwo);
          await instance['set(uint256,address)'](uintThree, addressThree);

          expect(await instance['length()']()).to.eq(3);

          await instance['remove(uint256)'](uintOne);
          await expect(
            instance['get(uint256)'](uintOne),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
          expect(await instance['length()']()).to.eq(2);

          await instance['remove(uint256)'](uintTwo);
          await expect(
            instance['get(uint256)'](uintTwo),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
          expect(await instance['length()']()).to.eq(1);

          await instance['remove(uint256)'](uintThree);
          await expect(
            instance['get(uint256)'](uintThree),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
          expect(await instance['length()']()).to.eq(0);
        });

        it('returns true if uint256 key removed', async () => {
          await instance['set(uint256,address)'](uintOne, addressOne);
          expect(await instance.callStatic['remove(uint256)'](uintOne)).to.be
            .true;
        });
        it('returns false if uint256 key does not exist', async () => {
          expect(await instance.callStatic['remove(uint256)'](uintOne)).to.be
            .false;
        });
      });
    });
  });
});
