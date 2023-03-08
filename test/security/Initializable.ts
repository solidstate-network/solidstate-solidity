import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  InitializableMock,
  InitializableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Initializable', function () {
  let deployer: SignerWithAddress;
  let instance: InitializableMock;

  before(async function () {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await new InitializableMock__factory(deployer).deploy();
  });

  describe('__internal', function () {
    describe('#_initializer()', function () {
      it('set initializerRan === true', async function () {
        await expect(instance.__initializer())
          .emit(instance, 'Initialized')
          .withArgs(1);
        expect(await instance.initializerRan()).to.equal(true);
      });

      it('revert if recall initializer()', async function () {
        await expect(instance.__initializer())
          .emit(instance, 'Initialized')
          .withArgs(1);
        await expect(instance.__initializer()).revertedWithCustomError(
          instance,
          'Initializable__AlreadyInitialized',
        );
      });
    });

    describe('#_reinitializer()', function () {
      it('set reinitializerVersion === 2', async function () {
        await expect(instance.__reinitializer(2))
          .emit(instance, 'Initialized')
          .withArgs(2);
      });

      it('revert if version initialized', async function () {
        await expect(instance.__reinitializer(1))
          .emit(instance, 'Initialized')
          .withArgs(1);
        await expect(instance.__reinitializer(1)).revertedWithCustomError(
          instance,
          'Initializable__AlreadyInitialized',
        );
      });
    });
  });
});
