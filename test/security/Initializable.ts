import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  $Initializable,
  $Initializable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Initializable', () => {
  let deployer: SignerWithAddress;
  let instance: $Initializable;

  before(async () => {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new $Initializable__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('initializer() modifier', () => {
      it('sets initialized version to 1', async () => {
        await instance.$initializer();

        expect(await instance.$_getInitializedVersion.staticCall()).to.equal(
          1n,
        );
      });

      describe('reverts if', () => {
        it('initializer has already been called', async () => {
          await instance.$initializer();

          await expect(instance.$initializer()).to.be.revertedWithCustomError(
            instance,
            'Initializable__AlreadyInitialized',
          );
        });
      });
    });

    describe('reinitializer(uint8) modifier', () => {
      it('sets monotonically increasing initialized version', async () => {
        await instance.$reinitializer(1n);
        await instance.$reinitializer(2n);
        await instance.$reinitializer(100n);
      });

      describe('reverts if', () => {
        it('version is less than or equal to previously initialized version', async () => {
          await expect(
            instance.$reinitializer(0n),
          ).to.be.revertedWithCustomError(
            instance,
            'Initializable__AlreadyInitialized',
          );

          await instance.$reinitializer(2n);

          await expect(
            instance.$reinitializer(1n),
          ).to.be.revertedWithCustomError(
            instance,
            'Initializable__AlreadyInitialized',
          );

          await expect(
            instance.$reinitializer(2n),
          ).to.be.revertedWithCustomError(
            instance,
            'Initializable__AlreadyInitialized',
          );
        });

        it('initialier has already been called and reinitialization version is 1', async () => {
          await instance.$initializer();

          await expect(
            instance.$reinitializer(1n),
          ).to.be.revertedWithCustomError(
            instance,
            'Initializable__AlreadyInitialized',
          );
        });
      });
    });

    describe('#_getInitializedVersion()', () => {
      it('returns initialized version', async () => {
        expect(await instance.$_getInitializedVersion.staticCall()).to.equal(
          0n,
        );

        await instance.$_setInitializedVersion(1n);

        expect(await instance.$_getInitializedVersion.staticCall()).to.equal(
          1n,
        );
      });
    });

    describe('#_setInitializedVersion(uint8)', () => {
      it('sets monotonically increasing initialize version', async () => {
        await instance.$_setInitializedVersion(1n);
        await instance.$_setInitializedVersion(2n);
        await instance.$_setInitializedVersion(100n);
      });

      describe('reverts if', () => {
        it('version is less than or equal to previously initialized version', async () => {
          await instance.$_setInitializedVersion(2n);

          await expect(
            instance.$_setInitializedVersion(1n),
          ).to.be.revertedWithCustomError(
            instance,
            'Initializable__AlreadyInitialized',
          );

          await expect(
            instance.$_setInitializedVersion(2n),
          ).to.be.revertedWithCustomError(
            instance,
            'Initializable__AlreadyInitialized',
          );
        });
      });
    });
  });
});
