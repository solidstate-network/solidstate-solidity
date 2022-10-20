import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { bnToBytes32, bnToAddress } from '@solidstate/library';
import {
  EnumerableMapAddressToAddressMock,
  EnumerableMapAddressToAddressMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe('EnumerableMap', async () => {
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
});
