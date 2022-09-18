import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { bnToBytes32 } from '@solidstate/library';
import {
  EnumerableSetBytes32Mock,
  EnumerableSetBytes32Mock__factory,
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
            await expect(instance['at(uint256)'](0)).to.be.revertedWith(
              'EnumerableSet: index out of bounds',
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

          expect(await instance['indexOf(bytes32)'](zeroBytes32)).to.equal(0);
          expect(await instance['indexOf(bytes32)'](oneBytes32)).to.equal(1);
          expect(await instance['indexOf(bytes32)'](twoBytes32)).to.equal(2);
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

      describe('#add(bytes32)', () => {
        it('adds value to heap', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          expect(await instance['set()']()).to.deep.equal([
            zeroBytes32,
            oneBytes32,
            twoBytes32,
          ]);
        });
      });

      describe('#remove(bytes32)', () => {
        it('removes value from set', async () => {
          await instance['add(bytes32)'](zeroBytes32);
          await instance['add(bytes32)'](oneBytes32);
          await instance['add(bytes32)'](twoBytes32);

          await instance['remove(bytes32)'](zeroBytes32);
          expect(await instance['set()']()).to.deep.equal([
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
});
