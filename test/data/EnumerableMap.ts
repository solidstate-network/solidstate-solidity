import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { bigintToAddress } from '@solidstate/library';
import {
  $EnumerableMap,
  $EnumerableMap__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

// data structures can be defined at any storage slot
// it doesn't matter which slot is used as long as it's consistent
const STORAGE_SLOT = 0n;

describe('EnumerableMap', () => {
  describe('AddressToAddressMap', async () => {
    let instance: $EnumerableMap;
    let deployer: SignerWithAddress;
    const addressOne = bigintToAddress(100);
    const addressTwo = bigintToAddress(200);
    const addressThree = bigintToAddress(300);
    const addressFour = bigintToAddress(400);
    const addressFive = bigintToAddress(500);
    const addressSix = bigintToAddress(600);

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new $EnumerableMap__factory(deployer).deploy();
    });

    describe('#at(uint256)', () => {
      it('returns value coresponding to index provided', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );

        const [key, value] =
          await instance.$at_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
            0n,
          );

        expect(key).to.equal(addressOne);
        expect(value).to.equal(addressFour);
      });

      describe('reverts if', () => {
        it('index is out of bounds', async () => {
          await expect(
            instance.$at_EnumerableMap_AddressToAddressMap.staticCall(
              STORAGE_SLOT,
              0n,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__IndexOutOfBounds',
          );
        });
      });
    });

    describe('#contains(address)', () => {
      it('returns true if value has been added', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );

        expect(
          await instance['$contains(uint256,address)'].staticCall(
            STORAGE_SLOT,
            addressOne,
          ),
        ).to.be.true;
      });

      it('returns false if value has not been added', async () => {
        expect(
          await instance['$contains(uint256,address)'].staticCall(
            STORAGE_SLOT,
            addressFour,
          ),
        ).to.be.false;
      });
    });

    describe('#length()', () => {
      it('returns length of enumerable map', async () => {
        expect(
          await instance.$length_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(0);

        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );
        expect(
          await instance.$length_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(1);

        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressTwo,
          addressFive,
        );
        expect(
          await instance.$length_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(2);

        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressThree,
          addressSix,
        );
        expect(
          await instance.$length_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(3);

        await instance['$remove(uint256,address)'](STORAGE_SLOT, addressThree);
        expect(
          await instance.$length_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(2);

        await instance['$remove(uint256,address)'](STORAGE_SLOT, addressTwo);
        expect(
          await instance.$length_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(1);

        await instance['$remove(uint256,address)'](STORAGE_SLOT, addressOne);
        expect(
          await instance.$length_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(0);
      });
    });

    describe('#get(address)', () => {
      it('returns address stored at key', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );

        expect(
          await instance['$get(uint256,address)'].staticCall(
            STORAGE_SLOT,
            addressOne,
          ),
        ).to.eq(addressFour);
      });

      describe('reverts if', () => {
        it('key does not exist', async () => {
          await expect(
            instance['$get(uint256,address)'].staticCall(
              STORAGE_SLOT,
              addressOne,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
        });
      });
    });

    describe('#set(address,address)', () => {
      it('sets the address value at address key', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );

        expect(
          await instance['$contains(uint256,address)'].staticCall(
            STORAGE_SLOT,
            addressOne,
          ),
        ).to.be.true;
        expect(
          await instance['$get(uint256,address)'].staticCall(
            STORAGE_SLOT,
            addressOne,
          ),
        ).to.eq(addressFour);
      });

      it('does not increase length if overwriting value at already set key', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressThree,
        );
        expect(
          await instance.$length_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.eq(1);
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressTwo,
        );
        expect(
          await instance.$length_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.eq(1);
      });

      it('overwrites value if key already set', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressThree,
        );
        let [key, value] =
          await instance.$at_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
            0n,
          );
        expect(key).to.eq(addressOne);
        expect(value).to.eq(addressThree);
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );
        [key, value] =
          await instance.$at_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
            0n,
          );
        expect(key).to.eq(addressOne);
        expect(value).to.eq(addressFour);
      });

      it('returns true if address value is added at address key', async () => {
        expect(
          await instance['$set(uint256,address,address)'].staticCall(
            STORAGE_SLOT,
            addressOne,
            addressFour,
          ),
        ).to.be.true;
      });

      it('returns false if address value is already added at address key', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );

        expect(
          await instance['$set(uint256,address,address)'].staticCall(
            STORAGE_SLOT,
            addressOne,
            addressFour,
          ),
        ).to.be.false;
      });
    });

    describe('#remove(address)', () => {
      it('removes the address value at given address key', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );

        expect(
          await instance.$length_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.eq(1);

        await instance['$remove(uint256,address)'](STORAGE_SLOT, addressOne);
        await expect(
          instance['$get(uint256,address)'].staticCall(
            STORAGE_SLOT,
            addressOne,
          ),
        ).to.be.revertedWithCustomError(
          instance,
          'EnumerableMap__NonExistentKey',
        );
        expect(
          await instance.$length_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.eq(0);
      });

      it('returns true if address key removed', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );
        expect(
          await instance['$remove(uint256,address)'].staticCall(
            STORAGE_SLOT,
            addressOne,
          ),
        ).to.be.true;
      });
      it('returns false if address key does not exist', async () => {
        expect(
          await instance['$remove(uint256,address)'].staticCall(
            STORAGE_SLOT,
            addressOne,
          ),
        ).to.be.false;
      });
    });

    describe('#toArray()', () => {
      it('returns arrays of keys and values in map', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressTwo,
          addressFive,
        );
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressThree,
          addressSix,
        );

        const [keys, values] =
          await instance[
            '$toArray_EnumerableMap_AddressToAddressMap(uint256)'
          ].staticCall(STORAGE_SLOT);

        expect(keys).to.deep.equal([addressOne, addressTwo, addressThree]);
        expect(values).to.deep.equal([addressFour, addressFive, addressSix]);
      });
    });

    describe('#toArray(uint256,uint256)', () => {
      it('returns arrays of keys and values in map', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressTwo,
          addressFive,
        );
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressThree,
          addressSix,
        );

        expect(
          await instance[
            '$toArray_EnumerableMap_AddressToAddressMap(uint256,uint256,uint256)'
          ].staticCall(STORAGE_SLOT, 0n, 3n),
        ).to.deep.equal([
          [addressOne, addressTwo, addressThree],
          [addressFour, addressFive, addressSix],
        ]);

        expect(
          await instance[
            '$toArray_EnumerableMap_AddressToAddressMap(uint256,uint256,uint256)'
          ].staticCall(STORAGE_SLOT, 0n, 1n),
        ).to.deep.equal([[addressOne], [addressFour]]);

        expect(
          await instance[
            '$toArray_EnumerableMap_AddressToAddressMap(uint256,uint256,uint256)'
          ].staticCall(STORAGE_SLOT, 2n, 1n),
        ).to.deep.equal([[addressThree], [addressSix]]);
      });

      describe('reverts if', () => {
        it('index is out of bounds', async () => {
          await expect(
            instance[
              '$toArray_EnumerableMap_AddressToAddressMap(uint256,uint256,uint256)'
            ].staticCall(STORAGE_SLOT, 0n, 0n),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__IndexOutOfBounds',
          );
        });
      });
    });

    describe('#keys()', () => {
      it('returns array of keys in map', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressTwo,
          addressFive,
        );
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressThree,
          addressSix,
        );

        const keys =
          await instance.$keys_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          );

        expect(keys).to.deep.equal([addressOne, addressTwo, addressThree]);
      });
    });

    describe('#values()', () => {
      it('returns array of values in map', async () => {
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressOne,
          addressFour,
        );
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressTwo,
          addressFive,
        );
        await instance['$set(uint256,address,address)'](
          STORAGE_SLOT,
          addressThree,
          addressSix,
        );

        const values =
          await instance.$values_EnumerableMap_AddressToAddressMap.staticCall(
            STORAGE_SLOT,
          );

        expect(values).to.deep.equal([addressFour, addressFive, addressSix]);
      });
    });
  });

  describe('UintToAddressMap', async () => {
    let instance: $EnumerableMap;
    let deployer: SignerWithAddress;
    const uintOne = 1;
    const uintTwo = 2;
    const uintThree = 3;
    const addressOne = bigintToAddress(100);
    const addressTwo = bigintToAddress(200);
    const addressThree = bigintToAddress(300);

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new $EnumerableMap__factory(deployer).deploy();
    });

    describe('#at(uint256)', () => {
      it('returns value coresponding to index provided', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressOne,
        );

        const [key, value] =
          await instance.$at_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
            0n,
          );

        expect(key).to.equal(uintOne);
        expect(value).to.equal(addressOne);
      });

      describe('reverts if', () => {
        it('index is out of bounds', async () => {
          await expect(
            instance.$at_EnumerableMap_UintToAddressMap.staticCall(
              STORAGE_SLOT,
              0n,
            ),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__IndexOutOfBounds',
          );
        });
      });
    });

    describe('#contains(uint256)', () => {
      it('returns true if value has been added', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressOne,
        );

        expect(
          await instance['$contains(uint256,uint256)'].staticCall(
            STORAGE_SLOT,
            uintOne,
          ),
        ).to.be.true;
      });

      it('returns false if value has not been added', async () => {
        expect(
          await instance['$contains(uint256,uint256)'].staticCall(
            STORAGE_SLOT,
            uintOne,
          ),
        ).to.be.false;
      });
    });

    describe('#length()', () => {
      it('returns length of enumerable map', async () => {
        expect(
          await instance.$length_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(0);

        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressOne,
        );
        expect(
          await instance.$length_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(1);

        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintTwo,
          addressTwo,
        );
        expect(
          await instance.$length_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(2);

        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintThree,
          addressThree,
        );
        expect(
          await instance.$length_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(3);

        await instance['$remove(uint256,uint256)'](STORAGE_SLOT, uintOne);
        expect(
          await instance.$length_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(2);

        await instance['$remove(uint256,uint256)'](STORAGE_SLOT, uintTwo);
        expect(
          await instance.$length_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(1);

        await instance['$remove(uint256,uint256)'](STORAGE_SLOT, uintThree);
        expect(
          await instance.$length_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.equal(0);
      });
    });

    describe('#get(uint256)', () => {
      it('returns address stored at key', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressOne,
        );

        expect(
          await instance['$get(uint256,uint256)'].staticCall(
            STORAGE_SLOT,
            uintOne,
          ),
        ).to.eq(addressOne);
      });

      describe('reverts if', () => {
        it('key does not exist', async () => {
          await expect(
            instance['$get(uint256,uint256)'].staticCall(STORAGE_SLOT, uintOne),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__NonExistentKey',
          );
        });
      });
    });

    describe('#set(uint256,address)', () => {
      it('sets the address value at uint256 key', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressOne,
        );

        expect(
          await instance['$contains(uint256,uint256)'].staticCall(
            STORAGE_SLOT,
            uintOne,
          ),
        ).to.be.true;
        expect(
          await instance['$get(uint256,uint256)'].staticCall(
            STORAGE_SLOT,
            uintOne,
          ),
        ).to.eq(addressOne);
      });

      it('does not increase length if overwriting value at already set key', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressThree,
        );
        expect(
          await instance.$length_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.eq(1);
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressTwo,
        );
        expect(
          await instance.$length_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.eq(1);
      });

      it('overwrites value if key already set', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressThree,
        );
        let [key, value] =
          await instance.$at_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
            0n,
          );
        expect(key).to.eq(uintOne);
        expect(value).to.eq(addressThree);
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressTwo,
        );
        [key, value] =
          await instance.$at_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
            0n,
          );
        expect(key).to.eq(uintOne);
        expect(value).to.eq(addressTwo);
      });

      it('returns true if address value is added at uint256 key', async () => {
        expect(
          await instance['$set(uint256,uint256,address)'].staticCall(
            STORAGE_SLOT,
            uintOne,
            addressOne,
          ),
        ).to.be.true;
      });

      it('returns false if address value is already added at uint256 key', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressOne,
        );

        expect(
          await instance['$set(uint256,uint256,address)'].staticCall(
            STORAGE_SLOT,
            uintOne,
            addressOne,
          ),
        ).to.be.false;
      });
    });

    describe('#remove(uint256)', () => {
      it('removes the address value at given uint256 key', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressOne,
        );

        expect(
          await instance.$length_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
          ),
        ).to.eq(1);

        await instance['$remove(uint256,uint256)'](STORAGE_SLOT, uintOne);
        await expect(
          instance['$get(uint256,uint256)'].staticCall(STORAGE_SLOT, uintOne),
        ).to.be.revertedWithCustomError(
          instance,
          'EnumerableMap__NonExistentKey',
        );
      });

      it('returns true if uint256 key removed', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressOne,
        );
        expect(
          await instance['$remove(uint256,uint256)'].staticCall(
            STORAGE_SLOT,
            uintOne,
          ),
        ).to.be.true;
      });
      it('returns false if uint256 key does not exist', async () => {
        expect(
          await instance['$remove(uint256,uint256)'].staticCall(
            STORAGE_SLOT,
            uintOne,
          ),
        ).to.be.false;
      });
    });

    describe('#toArray()', () => {
      it('returns arrays of keys and values in map', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressOne,
        );
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintTwo,
          addressTwo,
        );
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintThree,
          addressThree,
        );

        const [keys, values] =
          await instance[
            '$toArray_EnumerableMap_UintToAddressMap(uint256)'
          ].staticCall(STORAGE_SLOT);

        expect(keys).to.deep.equal([uintOne, uintTwo, uintThree]);
        expect(values).to.deep.equal([addressOne, addressTwo, addressThree]);
      });
    });

    describe('#toArray(uint256,uint256)', () => {
      it('returns arrays of keys and values in map', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressOne,
        );
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintTwo,
          addressTwo,
        );
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintThree,
          addressThree,
        );

        expect(
          await instance[
            '$toArray_EnumerableMap_UintToAddressMap(uint256,uint256,uint256)'
          ].staticCall(STORAGE_SLOT, 0n, 3n),
        ).to.deep.equal([
          [uintOne, uintTwo, uintThree],
          [addressOne, addressTwo, addressThree],
        ]);

        expect(
          await instance[
            '$toArray_EnumerableMap_UintToAddressMap(uint256,uint256,uint256)'
          ].staticCall(STORAGE_SLOT, 0n, 1n),
        ).to.deep.equal([[uintOne], [addressOne]]);

        expect(
          await instance[
            '$toArray_EnumerableMap_UintToAddressMap(uint256,uint256,uint256)'
          ].staticCall(STORAGE_SLOT, 2n, 1n),
        ).to.deep.equal([[uintThree], [addressThree]]);
      });

      describe('reverts if', () => {
        it('index is out of bounds', async () => {
          await expect(
            instance[
              '$toArray_EnumerableMap_UintToAddressMap(uint256,uint256,uint256)'
            ].staticCall(STORAGE_SLOT, 0n, 0n),
          ).to.be.revertedWithCustomError(
            instance,
            'EnumerableMap__IndexOutOfBounds',
          );
        });
      });
    });

    describe('#keys()', () => {
      it('returns array of keys in map', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressOne,
        );
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintTwo,
          addressTwo,
        );
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintThree,
          addressThree,
        );

        const keys =
          await instance.$keys_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
          );

        expect(keys).to.deep.equal([uintOne, uintTwo, uintThree]);
      });
    });

    describe('#values()', () => {
      it('returns array of values in map', async () => {
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintOne,
          addressOne,
        );
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintTwo,
          addressTwo,
        );
        await instance['$set(uint256,uint256,address)'](
          STORAGE_SLOT,
          uintThree,
          addressThree,
        );

        const values =
          await instance.$values_EnumerableMap_UintToAddressMap.staticCall(
            STORAGE_SLOT,
          );

        expect(values).to.deep.equal([addressOne, addressTwo, addressThree]);
      });
    });
  });
});
