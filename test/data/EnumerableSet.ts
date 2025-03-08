import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { bigintToBytes32, bigintToAddress } from '@solidstate/library';
import {
  __hh_exposed_EnumerableSet,
  __hh_exposed_EnumerableSet__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

// data structures can be defined at any storage slot
// it doesn't matter which slot is used as long as it's consistent
const STORAGE_SLOT = 0n;

describe('EnumerableSet', async () => {
  describe('Bytes32Set', async () => {
    let instance: __hh_exposed_EnumerableSet;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new __hh_exposed_EnumerableSet__factory(
        deployer,
      ).deploy();
    });

    describe('__internal', () => {
      const zeroBytes32 = bigintToBytes32(0);
      const oneBytes32 = bigintToBytes32(1);
      const twoBytes32 = bigintToBytes32(2);

      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance.__hh_exposed_at_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
              0n,
            ),
          ).to.equal(zeroBytes32);
          expect(
            await instance.__hh_exposed_at_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
              1n,
            ),
          ).to.equal(oneBytes32);
          expect(
            await instance.__hh_exposed_at_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
              2n,
            ),
          ).to.equal(twoBytes32);
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(
              instance.__hh_exposed_at_EnumerableSet_Bytes32Set.staticCall(
                STORAGE_SLOT,
                0n,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableSet__IndexOutOfBounds',
            );
          });
        });
      });

      describe('#contains(bytes32)', () => {
        it('returns true if the value has been added', async () => {
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.be.true;
          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.be.true;
          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(
            await instance['__hh_exposed_contains(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.be.false;
        });
      });

      describe('#indexOf(bytes32)', () => {
        it('returns index of the value', async () => {
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );

          expect(
            await instance['__hh_exposed_indexOf(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.equal(0);
          expect(
            await instance['__hh_exposed_indexOf(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.equal(2);
          expect(
            await instance['__hh_exposed_indexOf(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
          );
          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_indexOf(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              twoBytes32,
            ),
          ).to.be.equal(ethers.MaxUint256);

          expect(
            await instance['__hh_exposed_indexOf(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              oneBytes32,
            ),
          ).to.be.equal(ethers.MaxUint256);

          expect(
            await instance['__hh_exposed_indexOf(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.be.equal(ethers.MaxUint256);
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(
            await instance['__hh_exposed_indexOf(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.equal(ethers.MaxUint256);
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable set', async () => {
          expect(
            await instance.__hh_exposed_length_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(0);

          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(2);

          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(3);

          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(2);

          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(0);
        });
      });

      describe('#add(bytes32)', () => {
        it('adds value to set', async () => {
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance.__hh_exposed_toArray_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
            ),
          ).to.deep.equal([zeroBytes32, oneBytes32, twoBytes32]);
        });

        it('returns true if value is added', async () => {
          expect(
            await instance['__hh_exposed_add(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
          );
          expect(
            await instance['__hh_exposed_add(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.be.false;
        });
      });

      describe('#remove(bytes32)', () => {
        it('removes value from set', async () => {
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          await instance['__hh_exposed_remove(uint256,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
          );
          expect(
            await instance.__hh_exposed_toArray_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
            ),
          ).to.deep.equal([twoBytes32, oneBytes32]);
        });

        it('returns true if value is removed', async () => {
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );

          expect(
            await instance['__hh_exposed_remove(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.be.true;
        });

        it('returns false if value is not removed', async () => {
          expect(
            await instance['__hh_exposed_remove(uint256,bytes32)'].staticCall(
              STORAGE_SLOT,
              zeroBytes32,
            ),
          ).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the set as an array', async () => {
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            zeroBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            twoBytes32,
          );
          await instance['__hh_exposed_add(uint256,bytes32)'](
            STORAGE_SLOT,
            oneBytes32,
          );

          expect(
            await instance.__hh_exposed_toArray_EnumerableSet_Bytes32Set.staticCall(
              STORAGE_SLOT,
            ),
          ).to.deep.equal([zeroBytes32, twoBytes32, oneBytes32]);
        });
      });
    });
  });

  describe('AddressSet', async () => {
    let instance: __hh_exposed_EnumerableSet;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new __hh_exposed_EnumerableSet__factory(
        deployer,
      ).deploy();
    });

    describe('__internal', () => {
      const zeroAddress = bigintToAddress(0);
      const oneAddress = bigintToAddress(1);
      const twoAddress = bigintToAddress(2);

      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            zeroAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance.__hh_exposed_at_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
              0n,
            ),
          ).to.equal(zeroAddress);
          expect(
            await instance.__hh_exposed_at_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
              1n,
            ),
          ).to.equal(twoAddress);
          expect(
            await instance.__hh_exposed_at_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
              2n,
            ),
          ).to.equal(oneAddress);
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(
              instance.__hh_exposed_at_EnumerableSet_AddressSet.staticCall(
                STORAGE_SLOT,
                0n,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableSet__IndexOutOfBounds',
            );
          });
        });
      });

      describe('#contains(address)', () => {
        it('returns true if the value has been added', async () => {
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            zeroAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.be.true;
          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.be.true;
          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(
            await instance['__hh_exposed_contains(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.be.false;
        });
      });

      describe('#indexOf(address)', () => {
        it('returns index of the value', async () => {
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            zeroAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance['__hh_exposed_indexOf(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.equal(0);
          expect(
            await instance['__hh_exposed_indexOf(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.equal(2);
          expect(
            await instance['__hh_exposed_indexOf(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            zeroAddress,
          );
          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance['__hh_exposed_indexOf(uint256,address)'].staticCall(
              STORAGE_SLOT,
              twoAddress,
            ),
          ).to.be.equal(ethers.MaxUint256);

          expect(
            await instance['__hh_exposed_indexOf(uint256,address)'].staticCall(
              STORAGE_SLOT,
              oneAddress,
            ),
          ).to.be.equal(ethers.MaxUint256);

          expect(
            await instance['__hh_exposed_indexOf(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.be.equal(ethers.MaxUint256);
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(
            await instance['__hh_exposed_indexOf(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.equal(ethers.MaxUint256);
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable set', async () => {
          expect(
            await instance.__hh_exposed_length_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(0n);

          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            zeroAddress,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(1n);

          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(2n);

          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(3n);

          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(2n);

          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(1n);

          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            zeroAddress,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(0n);
        });
      });

      describe('#add(address)', () => {
        it('adds value to set', async () => {
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            zeroAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance.__hh_exposed_toArray_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.deep.equal([zeroAddress, oneAddress, twoAddress]);
        });

        it('returns true if value is added', async () => {
          expect(
            await instance['__hh_exposed_add(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            zeroAddress,
          );
          expect(
            await instance['__hh_exposed_add(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.be.false;
        });
      });

      describe('#remove(address)', () => {
        it('removes value from set', async () => {
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            zeroAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          await instance['__hh_exposed_remove(uint256,address)'](
            STORAGE_SLOT,
            zeroAddress,
          );
          expect(
            await instance.__hh_exposed_toArray_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.deep.equal([twoAddress, oneAddress]);
        });

        it('returns true if value is removed', async () => {
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            zeroAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );

          expect(
            await instance['__hh_exposed_remove(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.be.true;
        });

        it('returns false if value is not removed', async () => {
          expect(
            await instance['__hh_exposed_remove(uint256,address)'].staticCall(
              STORAGE_SLOT,
              zeroAddress,
            ),
          ).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the set as an array', async () => {
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            zeroAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            twoAddress,
          );
          await instance['__hh_exposed_add(uint256,address)'](
            STORAGE_SLOT,
            oneAddress,
          );

          expect(
            await instance.__hh_exposed_toArray_EnumerableSet_AddressSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.deep.equal([zeroAddress, twoAddress, oneAddress]);
        });
      });
    });
  });

  describe('UintSet', async () => {
    let instance: __hh_exposed_EnumerableSet;
    let deployer: SignerWithAddress;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      instance = await new __hh_exposed_EnumerableSet__factory(
        deployer,
      ).deploy();
    });

    describe('__internal', () => {
      const zero = 0n;
      const one = 1n;
      const two = 2n;

      describe('#at(uint256)', () => {
        it('returns the value corresponding to index provided', async () => {
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            zero,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            two,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            one,
          );

          expect(
            await instance.__hh_exposed_at_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
              0n,
            ),
          ).to.equal(zero);
          expect(
            await instance.__hh_exposed_at_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
              1n,
            ),
          ).to.equal(two);
          expect(
            await instance.__hh_exposed_at_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
              2n,
            ),
          ).to.equal(one);
        });

        describe('reverts if', () => {
          it('index out of bounds', async () => {
            await expect(
              instance.__hh_exposed_at_EnumerableSet_UintSet.staticCall(
                STORAGE_SLOT,
                0n,
              ),
            ).to.be.revertedWithCustomError(
              instance,
              'EnumerableSet__IndexOutOfBounds',
            );
          });
        });
      });

      describe('#contains(uint256)', () => {
        it('returns true if the value has been added', async () => {
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            zero,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            two,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            one,
          );

          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zero,
            ),
          ).to.be.true;
          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              one,
            ),
          ).to.be.true;
          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              two,
            ),
          ).to.be.true;
        });

        it('returns false if the value has not been added', async () => {
          expect(
            await instance['__hh_exposed_contains(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zero,
            ),
          ).to.be.false;
        });
      });

      describe('#indexOf(uint256)', () => {
        it('returns index of the value', async () => {
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            zero,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            two,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            one,
          );

          expect(
            await instance['__hh_exposed_indexOf(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zero,
            ),
          ).to.equal(0);
          expect(
            await instance['__hh_exposed_indexOf(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              one,
            ),
          ).to.equal(2);
          expect(
            await instance['__hh_exposed_indexOf(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              two,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            zero,
          );
          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            one,
          );
          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            two,
          );

          expect(
            await instance['__hh_exposed_indexOf(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              two,
            ),
          ).to.be.equal(ethers.MaxUint256);

          expect(
            await instance['__hh_exposed_indexOf(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              one,
            ),
          ).to.be.equal(ethers.MaxUint256);

          expect(
            await instance['__hh_exposed_indexOf(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zero,
            ),
          ).to.be.equal(ethers.MaxUint256);
        });

        it('returns max uint256 if value does not exist', async () => {
          expect(
            await instance['__hh_exposed_indexOf(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zero,
            ),
          ).to.equal(ethers.MaxUint256);
        });
      });

      describe('#length()', () => {
        it('returns length of enumerable set', async () => {
          expect(
            await instance.__hh_exposed_length_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(0);

          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            zero,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            one,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(2);

          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            two,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(3);

          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            two,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(2);

          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            one,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(1);

          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            zero,
          );
          expect(
            await instance.__hh_exposed_length_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.equal(0);
        });
      });

      describe('#add(uint256)', () => {
        it('adds value to set', async () => {
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            zero,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            one,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            two,
          );

          expect(
            await instance.__hh_exposed_toArray_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.deep.equal([zero, one, two]);
        });

        it('returns true if value is added', async () => {
          expect(
            await instance['__hh_exposed_add(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zero,
            ),
          ).to.be.true;
        });

        it('returns false if value has already been added', async () => {
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            zero,
          );
          expect(
            await instance['__hh_exposed_add(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zero,
            ),
          ).to.be.false;
        });
      });

      describe('#remove(uint256)', () => {
        it('removes value from set', async () => {
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            zero,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            one,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            two,
          );

          await instance['__hh_exposed_remove(uint256,uint256)'](
            STORAGE_SLOT,
            zero,
          );
          expect(
            await instance.__hh_exposed_toArray_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.deep.equal([two, one]);
        });

        it('returns true if value is removed', async () => {
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            zero,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            one,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            two,
          );

          expect(
            await instance['__hh_exposed_remove(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zero,
            ),
          ).to.be.true;
        });

        it('returns false if value is not removed', async () => {
          expect(
            await instance['__hh_exposed_remove(uint256,uint256)'].staticCall(
              STORAGE_SLOT,
              zero,
            ),
          ).to.be.false;
        });
      });

      describe('#toArray()', () => {
        it('returns the set as an array', async () => {
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            zero,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            two,
          );
          await instance['__hh_exposed_add(uint256,uint256)'](
            STORAGE_SLOT,
            one,
          );

          expect(
            await instance.__hh_exposed_toArray_EnumerableSet_UintSet.staticCall(
              STORAGE_SLOT,
            ),
          ).to.deep.equal([zero, two, one]);
        });
      });
    });
  });
});
