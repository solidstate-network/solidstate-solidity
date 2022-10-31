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

          const [key, value] = await instance.callStatic['at(uint256)'](0);

          expect(key).to.equal(addressOne);
          expect(value).to.equal(addressFour);
        });

        describe('reverts if', () => {
          it('index is out of bounds', async () => {
            await expect(
              instance.callStatic['at(uint256)'](0),
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

          expect(await instance.callStatic['contains(address)'](addressOne)).to
            .be.true;
        });

        it('returns false if value has not been added', async () => {
          expect(await instance.callStatic['contains(address)'](addressFour)).to
            .be.false;
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable map', async () => {
          expect(await instance.callStatic['length()']()).to.equal(0);

          await instance['set(address,address)'](addressOne, addressFour);
          expect(await instance.callStatic['length()']()).to.equal(1);

          await instance['set(address,address)'](addressTwo, addressFive);
          expect(await instance.callStatic['length()']()).to.equal(2);

          await instance['set(address,address)'](addressThree, addressSix);
          expect(await instance.callStatic['length()']()).to.equal(3);

          await instance['remove(address)'](addressThree);
          expect(await instance.callStatic['length()']()).to.equal(2);

          await instance['remove(address)'](addressTwo);
          expect(await instance.callStatic['length()']()).to.equal(1);

          await instance['remove(address)'](addressOne);
          expect(await instance.callStatic['length()']()).to.equal(0);
        });
      });

      describe('#get(address)', () => {
        it('returns address stored at key', async () => {
          await instance['set(address,address)'](addressOne, addressFour);

          expect(await instance.callStatic['get(address)'](addressOne)).to.eq(
            addressFour,
          );
        });

        describe('reverts if', () => {
          it('key does not exist', async () => {
            await expect(
              instance.callStatic['get(address)'](addressOne),
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

          expect(await instance.callStatic['contains(address)'](addressOne)).to
            .be.true;
          expect(await instance.callStatic['get(address)'](addressOne)).to.eq(
            addressFour,
          );
        });

        it('does not increase length if overwriting value at already set key', async () => {
          await instance['set(address,address)'](addressOne, addressThree);
          expect(await instance.callStatic['length()']()).to.eq(1);
          await instance['set(address,address)'](addressOne, addressTwo);
          expect(await instance.callStatic['length()']()).to.eq(1);
        });

        it('overwrites value if key already set', async () => {
          await instance['set(address,address)'](addressOne, addressThree);
          let [key, value] = await instance.callStatic['at(uint256)'](0);
          expect(key).to.eq(addressOne);
          expect(value).to.eq(addressThree);
          await instance['set(address,address)'](addressOne, addressFour);
          [key, value] = await instance.callStatic['at(uint256)'](0);
          expect(key).to.eq(addressOne);
          expect(value).to.eq(addressFour);
        });

        it('returns true if address value is added at address key', async () => {
          expect(
            await instance.callStatic['set(address,address)'](
              addressOne,
              addressFour,
            ),
          ).to.be.true;
        });

        it('returns false if address value is already added at address key', async () => {
          await instance['set(address,address)'](addressOne, addressFour);

          expect(
            await instance.callStatic['set(address,address)'](
              addressOne,
              addressFour,
            ),
          ).to.be.false;
        });
      });

      describe('#remove(address)', () => {
        it('removes the address value at given address key', async () => {
          await instance['set(address,address)'](addressOne, addressFour);

          expect(await instance.callStatic['length()']()).to.eq(1);

          await instance['remove(address)'](addressOne);
          await expect(
            instance.callStatic['get(address)'](addressOne),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
          expect(await instance.callStatic['length()']()).to.eq(0);
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

      describe('#toArray()', () => {
        it('returns arrays of keys and values in map', async () => {
          await instance['set(address,address)'](addressOne, addressFour);
          await instance['set(address,address)'](addressTwo, addressFive);
          await instance['set(address,address)'](addressThree, addressSix);

          const [keys, values] = await instance.callStatic['toArray()']();

          expect(keys).to.deep.equal([addressOne, addressTwo, addressThree]);
          expect(values).to.deep.equal([addressFour, addressFive, addressSix]);
        });
      });

      describe('#keys()', () => {
        it('returns array of keys in map', async () => {
          await instance['set(address,address)'](addressOne, addressFour);
          await instance['set(address,address)'](addressTwo, addressFive);
          await instance['set(address,address)'](addressThree, addressSix);

          const keys = await instance.callStatic['keys()']();

          expect(keys).to.deep.equal([addressOne, addressTwo, addressThree]);
        });
      });

      describe('#values()', () => {
        it('returns array of values in map', async () => {
          await instance['set(address,address)'](addressOne, addressFour);
          await instance['set(address,address)'](addressTwo, addressFive);
          await instance['set(address,address)'](addressThree, addressSix);

          const values = await instance.callStatic['values()']();

          expect(values).to.deep.equal([addressFour, addressFive, addressSix]);
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
      const uintOne = BigNumber.from('1');
      const uintTwo = BigNumber.from('2');
      const uintThree = BigNumber.from('3');
      const addressOne = bnToAddress(BigNumber.from('100'));
      const addressTwo = bnToAddress(BigNumber.from('200'));
      const addressThree = bnToAddress(BigNumber.from('300'));

      describe('#at(uint256)', () => {
        it('returns value coresponding to index provided', async () => {
          await instance['set(uint256,address)'](uintOne, addressOne);

          const [key, value] = await instance.callStatic['at(uint256)'](0);

          expect(key).to.equal(uintOne);
          expect(value).to.equal(addressOne);
        });

        describe('reverts if', () => {
          it('index is out of bounds', async () => {
            await expect(
              instance.callStatic['at(uint256)'](0),
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

          expect(await instance.callStatic['contains(uint256)'](uintOne)).to.be
            .true;
        });

        it('returns false if value has not been added', async () => {
          expect(await instance.callStatic['contains(uint256)'](uintOne)).to.be
            .false;
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable map', async () => {
          expect(await instance.callStatic['length()']()).to.equal(0);

          await instance['set(uint256,address)'](uintOne, addressOne);
          expect(await instance.callStatic['length()']()).to.equal(1);

          await instance['set(uint256,address)'](uintTwo, addressTwo);
          expect(await instance.callStatic['length()']()).to.equal(2);

          await instance['set(uint256,address)'](uintThree, addressThree);
          expect(await instance.callStatic['length()']()).to.equal(3);

          await instance['remove(uint256)'](uintOne);
          expect(await instance.callStatic['length()']()).to.equal(2);

          await instance['remove(uint256)'](uintTwo);
          expect(await instance.callStatic['length()']()).to.equal(1);

          await instance['remove(uint256)'](uintThree);
          expect(await instance.callStatic['length()']()).to.equal(0);
        });
      });

      describe('#get(uint256)', () => {
        it('returns address stored at key', async () => {
          await instance['set(uint256,address)'](uintOne, addressOne);

          expect(await instance.callStatic['get(uint256)'](uintOne)).to.eq(
            addressOne,
          );
        });

        describe('reverts if', () => {
          it('key does not exist', async () => {
            await expect(
              instance.callStatic['get(uint256)'](uintOne),
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

          expect(await instance.callStatic['contains(uint256)'](uintOne)).to.be
            .true;
          expect(await instance.callStatic['get(uint256)'](uintOne)).to.eq(
            addressOne,
          );
        });

        it('does not increase length if overwriting value at already set key', async () => {
          await instance['set(uint256,address)'](uintOne, addressThree);
          expect(await instance.callStatic['length()']()).to.eq(1);
          await instance['set(uint256,address)'](uintOne, addressTwo);
          expect(await instance.callStatic['length()']()).to.eq(1);
        });

        it('overwrites value if key already set', async () => {
          await instance['set(uint256,address)'](uintOne, addressThree);
          let [key, value] = await instance.callStatic['at(uint256)'](0);
          expect(key).to.eq(uintOne);
          expect(value).to.eq(addressThree);
          await instance['set(uint256,address)'](uintOne, addressTwo);
          [key, value] = await instance.callStatic['at(uint256)'](0);
          expect(key).to.eq(uintOne);
          expect(value).to.eq(addressTwo);
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

          expect(await instance.callStatic['length()']()).to.eq(1);

          await instance['remove(uint256)'](uintOne);
          await expect(
            instance.callStatic['get(uint256)'](uintOne),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
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

      describe('#toArray()', () => {
        it('returns arrays of keys and values in map', async () => {
          await instance['set(uint256,address)'](uintOne, addressOne);
          await instance['set(uint256,address)'](uintTwo, addressTwo);
          await instance['set(uint256,address)'](uintThree, addressThree);

          const [keys, values] = await instance.callStatic['toArray()']();

          expect(keys).to.deep.equal([uintOne, uintTwo, uintThree]);
          expect(values).to.deep.equal([addressOne, addressTwo, addressThree]);
        });
      });

      describe('#keys()', () => {
        it('returns array of keys in map', async () => {
          await instance['set(uint256,address)'](uintOne, addressOne);
          await instance['set(uint256,address)'](uintTwo, addressTwo);
          await instance['set(uint256,address)'](uintThree, addressThree);

          const keys = await instance.callStatic['keys()']();

          expect(keys).to.deep.equal([uintOne, uintTwo, uintThree]);
        });
      });

      describe('#values()', () => {
        it('returns array of values in map', async () => {
          await instance['set(uint256,address)'](uintOne, addressOne);
          await instance['set(uint256,address)'](uintTwo, addressTwo);
          await instance['set(uint256,address)'](uintThree, addressThree);

          const values = await instance.callStatic['values()']();

          expect(values).to.deep.equal([addressOne, addressTwo, addressThree]);
        });
      });
    });
  });
});
