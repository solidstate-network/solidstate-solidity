import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { bigintToAddress } from '@solidstate/library';
import {
  EnumerableMapAddressToAddressMock,
  EnumerableMapAddressToAddressMock__factory,
  EnumerableMapUintToAddressMock,
  EnumerableMapUintToAddressMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
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
      const addressOne = bigintToAddress(100);
      const addressTwo = bigintToAddress(200);
      const addressThree = bigintToAddress(300);
      const addressFour = bigintToAddress(400);
      const addressFive = bigintToAddress(500);
      const addressSix = bigintToAddress(600);

      describe('#at(uint256)', () => {
        it('returns value coresponding to index provided', async () => {
          await instance.set(addressOne, addressFour);

          const [key, value] = await instance.at.staticCall(0);

          expect(key).to.equal(addressOne);
          expect(value).to.equal(addressFour);
        });

        describe('reverts if', () => {
          it('index is out of bounds', async () => {
            await expect(
              instance.at.staticCall(0),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableMap__IndexOutOfBounds',
            );
          });
        });
      });

      describe('#contains(address)', () => {
        it('returns true if value has been added', async () => {
          await instance.set(addressOne, addressFour);

          expect(await instance.contains.staticCall(addressOne)).to.be.true;
        });

        it('returns false if value has not been added', async () => {
          expect(await instance.contains.staticCall(addressFour)).to.be.false;
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable map', async () => {
          expect(await instance.length.staticCall()).to.equal(0);

          await instance.set(addressOne, addressFour);
          expect(await instance.length.staticCall()).to.equal(1);

          await instance.set(addressTwo, addressFive);
          expect(await instance.length.staticCall()).to.equal(2);

          await instance.set(addressThree, addressSix);
          expect(await instance.length.staticCall()).to.equal(3);

          await instance.remove(addressThree);
          expect(await instance.length.staticCall()).to.equal(2);

          await instance.remove(addressTwo);
          expect(await instance.length.staticCall()).to.equal(1);

          await instance.remove(addressOne);
          expect(await instance.length.staticCall()).to.equal(0);
        });
      });

      describe('#get(address)', () => {
        it('returns address stored at key', async () => {
          await instance.set(addressOne, addressFour);

          expect(await instance.get.staticCall(addressOne)).to.eq(addressFour);
        });

        describe('reverts if', () => {
          it('key does not exist', async () => {
            await expect(
              instance.get.staticCall(addressOne),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableMap__NonExistentKey',
            );
          });
        });
      });

      describe('#set(address,address)', () => {
        it('sets the address value at address key', async () => {
          await instance.set(addressOne, addressFour);

          expect(await instance.contains.staticCall(addressOne)).to.be.true;
          expect(await instance.get.staticCall(addressOne)).to.eq(addressFour);
        });

        it('does not increase length if overwriting value at already set key', async () => {
          await instance.set(addressOne, addressThree);
          expect(await instance.length.staticCall()).to.eq(1);
          await instance.set(addressOne, addressTwo);
          expect(await instance.length.staticCall()).to.eq(1);
        });

        it('overwrites value if key already set', async () => {
          await instance.set(addressOne, addressThree);
          let [key, value] = await instance.at.staticCall(0);
          expect(key).to.eq(addressOne);
          expect(value).to.eq(addressThree);
          await instance.set(addressOne, addressFour);
          [key, value] = await instance.at.staticCall(0);
          expect(key).to.eq(addressOne);
          expect(value).to.eq(addressFour);
        });

        it('returns true if address value is added at address key', async () => {
          expect(await instance.set.staticCall(addressOne, addressFour)).to.be
            .true;
        });

        it('returns false if address value is already added at address key', async () => {
          await instance.set(addressOne, addressFour);

          expect(await instance.set.staticCall(addressOne, addressFour)).to.be
            .false;
        });
      });

      describe('#remove(address)', () => {
        it('removes the address value at given address key', async () => {
          await instance.set(addressOne, addressFour);

          expect(await instance.length.staticCall()).to.eq(1);

          await instance.remove(addressOne);
          await expect(
            instance.get.staticCall(addressOne),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
          expect(await instance.length.staticCall()).to.eq(0);
        });

        it('returns true if address key removed', async () => {
          await instance.set(addressOne, addressFour);
          expect(await instance.remove.staticCall(addressOne)).to.be.true;
        });
        it('returns false if address key does not exist', async () => {
          expect(await instance.remove.staticCall(addressOne)).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns arrays of keys and values in map', async () => {
          await instance.set(addressOne, addressFour);
          await instance.set(addressTwo, addressFive);
          await instance.set(addressThree, addressSix);

          const [keys, values] = await instance.toArray.staticCall();

          expect(keys).to.deep.equal([addressOne, addressTwo, addressThree]);
          expect(values).to.deep.equal([addressFour, addressFive, addressSix]);
        });
      });

      describe('#keys()', () => {
        it('returns array of keys in map', async () => {
          await instance.set(addressOne, addressFour);
          await instance.set(addressTwo, addressFive);
          await instance.set(addressThree, addressSix);

          const keys = await instance.keys.staticCall();

          expect(keys).to.deep.equal([addressOne, addressTwo, addressThree]);
        });
      });

      describe('#values()', () => {
        it('returns array of values in map', async () => {
          await instance.set(addressOne, addressFour);
          await instance.set(addressTwo, addressFive);
          await instance.set(addressThree, addressSix);

          const values = await instance.values.staticCall();

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
      const uintOne = 1;
      const uintTwo = 2;
      const uintThree = 3;
      const addressOne = bigintToAddress(100);
      const addressTwo = bigintToAddress(200);
      const addressThree = bigintToAddress(300);

      describe('#at(uint256)', () => {
        it('returns value coresponding to index provided', async () => {
          await instance.set(uintOne, addressOne);

          const [key, value] = await instance.at.staticCall(0);

          expect(key).to.equal(uintOne);
          expect(value).to.equal(addressOne);
        });

        describe('reverts if', () => {
          it('index is out of bounds', async () => {
            await expect(
              instance.at.staticCall(0),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableMap__IndexOutOfBounds',
            );
          });
        });
      });

      describe('#contains(uint256)', () => {
        it('returns true if value has been added', async () => {
          await instance.set(uintOne, addressOne);

          expect(await instance.contains.staticCall(uintOne)).to.be.true;
        });

        it('returns false if value has not been added', async () => {
          expect(await instance.contains.staticCall(uintOne)).to.be.false;
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable map', async () => {
          expect(await instance.length.staticCall()).to.equal(0);

          await instance.set(uintOne, addressOne);
          expect(await instance.length.staticCall()).to.equal(1);

          await instance.set(uintTwo, addressTwo);
          expect(await instance.length.staticCall()).to.equal(2);

          await instance.set(uintThree, addressThree);
          expect(await instance.length.staticCall()).to.equal(3);

          await instance.remove(uintOne);
          expect(await instance.length.staticCall()).to.equal(2);

          await instance.remove(uintTwo);
          expect(await instance.length.staticCall()).to.equal(1);

          await instance.remove(uintThree);
          expect(await instance.length.staticCall()).to.equal(0);
        });
      });

      describe('#get(uint256)', () => {
        it('returns address stored at key', async () => {
          await instance.set(uintOne, addressOne);

          expect(await instance.get.staticCall(uintOne)).to.eq(addressOne);
        });

        describe('reverts if', () => {
          it('key does not exist', async () => {
            await expect(
              instance.get.staticCall(uintOne),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableMap__NonExistentKey',
            );
          });
        });
      });

      describe('#set(uint256,address)', () => {
        it('sets the address value at uint256 key', async () => {
          await instance.set(uintOne, addressOne);

          expect(await instance.contains.staticCall(uintOne)).to.be.true;
          expect(await instance.get.staticCall(uintOne)).to.eq(addressOne);
        });

        it('does not increase length if overwriting value at already set key', async () => {
          await instance.set(uintOne, addressThree);
          expect(await instance.length.staticCall()).to.eq(1);
          await instance.set(uintOne, addressTwo);
          expect(await instance.length.staticCall()).to.eq(1);
        });

        it('overwrites value if key already set', async () => {
          await instance.set(uintOne, addressThree);
          let [key, value] = await instance.at.staticCall(0);
          expect(key).to.eq(uintOne);
          expect(value).to.eq(addressThree);
          await instance.set(uintOne, addressTwo);
          [key, value] = await instance.at.staticCall(0);
          expect(key).to.eq(uintOne);
          expect(value).to.eq(addressTwo);
        });

        it('returns true if address value is added at uint256 key', async () => {
          expect(await instance.set.staticCall(uintOne, addressOne)).to.be.true;
        });

        it('returns false if address value is already added at uint256 key', async () => {
          await instance.set(uintOne, addressOne);

          expect(await instance.set.staticCall(uintOne, addressOne)).to.be
            .false;
        });
      });

      describe('#remove(uint256)', () => {
        it('removes the address value at given uint256 key', async () => {
          await instance.set(uintOne, addressOne);

          expect(await instance.length.staticCall()).to.eq(1);

          await instance.remove(uintOne);
          await expect(
            instance.get.staticCall(uintOne),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
        });

        it('returns true if uint256 key removed', async () => {
          await instance.set(uintOne, addressOne);
          expect(await instance.remove.staticCall(uintOne)).to.be.true;
        });
        it('returns false if uint256 key does not exist', async () => {
          expect(await instance.remove.staticCall(uintOne)).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns arrays of keys and values in map', async () => {
          await instance.set(uintOne, addressOne);
          await instance.set(uintTwo, addressTwo);
          await instance.set(uintThree, addressThree);

          const [keys, values] = await instance.toArray.staticCall();

          expect(keys).to.deep.equal([uintOne, uintTwo, uintThree]);
          expect(values).to.deep.equal([addressOne, addressTwo, addressThree]);
        });
      });

      describe('#keys()', () => {
        it('returns array of keys in map', async () => {
          await instance.set(uintOne, addressOne);
          await instance.set(uintTwo, addressTwo);
          await instance.set(uintThree, addressThree);

          const keys = await instance.keys.staticCall();

          expect(keys).to.deep.equal([uintOne, uintTwo, uintThree]);
        });
      });

      describe('#values()', () => {
        it('returns array of values in map', async () => {
          await instance.set(uintOne, addressOne);
          await instance.set(uintTwo, addressTwo);
          await instance.set(uintThree, addressThree);

          const values = await instance.values.staticCall();

          expect(values).to.deep.equal([addressOne, addressTwo, addressThree]);
        });
      });
    });
  });
});
