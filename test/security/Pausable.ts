import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfPausable } from '@solidstate/spec';
import {
  PausableMock,
  PausableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Pausable', function () {
  let deployer: SignerWithAddress;
  let instance: PausableMock;

  before(async function () {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await new PausableMock__factory(deployer).deploy();
  });

  describeBehaviorOfPausable(async () => instance, {});

  describe('__internal', function () {
    describe('#_pause()', function () {
      it('sets paused status to true', async function () {
        await instance.__pause();
        expect(await instance.paused()).to.be.true;
      });

      it('emits Paused event', async function () {
        await expect(instance.connect(deployer).__pause())
          .to.emit(instance, 'Paused')
          .withArgs(deployer.address);
      });

      describe('reverts if', () => {
        it('contract is already paused', async function () {
          await instance.__pause();
          await expect(instance.__pause()).to.be.revertedWithCustomError(
            instance,
            'Pausable__Paused',
          );
        });
      });
    });

    describe('#_partiallyPause()', function () {
      it('sets paused status to true', async function () {
        const key = ethers.utils.randomBytes(32);

        await instance.__partiallyPause(key);
        // TODO: expose external partiallyPaused function on interface?
        const [status, partialStatus] = await instance.__partiallyPaused(key);
        expect(status).to.be.true;
        expect(partialStatus).to.be.true;
      });

      it('emits PausedWithKey event', async function () {
        const key = ethers.utils.randomBytes(32);

        await expect(instance.connect(deployer).__partiallyPause(key))
          .to.emit(instance, 'PausedWithKey')
          .withArgs(deployer.address, key);
      });

      it('todo: does not affect other keys');

      describe('reverts if', () => {
        it('contract is partially paused already', async function () {
          const key = ethers.utils.randomBytes(32);

          await instance.__partiallyPause(key);

          await expect(
            instance.__partiallyPause(key),
          ).to.be.revertedWithCustomError(instance, 'Pausable__Paused');
        });

        it('contract is globally paused already', async function () {
          const key = ethers.utils.randomBytes(32);

          await instance.__pause();

          await expect(
            instance.__partiallyPause(key),
          ).to.be.revertedWithCustomError(instance, 'Pausable__Paused');
        });
      });
    });

    describe('#_unpause()', function () {
      it('sets paused status to false', async function () {
        await instance.__pause();

        await instance.__unpause();
        expect(await instance.paused()).to.be.false;
      });

      it('emits Unpaused event', async function () {
        await instance.__pause();

        await expect(instance.connect(deployer).__unpause())
          .to.emit(instance, 'Unpaused')
          .withArgs(deployer.address);
      });

      describe('reverts if', () => {
        it('contract is not paused', async function () {
          await expect(instance.__unpause()).to.be.revertedWithCustomError(
            instance,
            'Pausable__NotPaused',
          );
        });
      });
    });

    describe('#_partiallyUnpause()', function () {
      it('sets paused status to false', async function () {
        const key = ethers.utils.randomBytes(32);

        await instance.__partiallyPause(key);

        await instance.__partiallyUnpause(key);
        // TODO: expose external partiallyPaused function on interface?
        const [status, partialStatus] = await instance.__partiallyPaused(key);
        expect(status).to.be.false;
        expect(partialStatus).to.be.false;
      });

      it('emits UnpausedWithKey event', async function () {
        const key = ethers.utils.randomBytes(32);

        await instance.__partiallyPause(key);

        await expect(instance.connect(deployer).__partiallyUnpause(key))
          .to.emit(instance, 'UnpausedWithKey')
          .withArgs(deployer.address, key);
      });

      it('todo: does not affect other keys');

      describe('reverts if', () => {
        it('contract is not partially paused', async function () {
          const key = ethers.utils.randomBytes(32);

          await expect(
            instance.__partiallyUnpause(key),
          ).to.be.revertedWithCustomError(instance, 'Pausable__NotPaused');
        });
      });
    });
  });
});
