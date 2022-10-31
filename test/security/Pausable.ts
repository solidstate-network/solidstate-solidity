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
      it('sets paused === true', async function () {
        await instance.__pause();
        expect(await instance.paused()).to.equal(true);
      });

      it('emits Paused event', async function () {
        await expect(instance.connect(deployer).__pause())
          .to.emit(instance, 'Paused')
          .withArgs(deployer.address);
      });

      it('reverts if paused already', async function () {
        await instance.__pause();
        await expect(instance.__pause()).to.be.revertedWithCustomError(
          instance,
          'Pausable__Paused',
        );
      });
    });

    describe('#_unpause()', function () {
      beforeEach(async function () {
        await instance.__pause();
      });

      it('sets paused === false', async function () {
        await instance.__unpause();
        expect(await instance.paused()).to.equal(false);
      });

      it('emits Unpaused event', async function () {
        await expect(instance.connect(deployer).__unpause())
          .to.emit(instance, 'Unpaused')
          .withArgs(deployer.address);
      });

      it('reverts if unpaused already', async function () {
        await instance.__unpause();
        await expect(instance.__unpause()).to.be.revertedWithCustomError(
          instance,
          'Pausable__NotPaused',
        );
      });
    });

    describe('#_partialPause(uint8)', function () {
      it('sets partiallyPaused(uint8) === true', async function () {
        await instance.__partialPause(1);
        expect(await instance.partiallyPaused(1)).to.equal(true);
      });

      it('emits partiallyPaused event', async function () {
        await expect(instance.connect(deployer).__partialPause(1))
          .to.emit(instance, 'PartiallyPaused')
          .withArgs(deployer.address, 1);
      });

      it('reverts if paused already', async function () {
        await instance.__partialPause(1);
        await expect(instance.__partialPause(1)).to.be.revertedWithCustomError(
          instance,
          'Pausable__Paused',
        );
      });

      describe('#_partialUnpause(uint8)', function () {
        beforeEach(async function () {
          await instance.__partialPause(1);
        });

        it('sets partiallyPaused(uint8) === false', async function () {
          await instance.__partialUnpause(1);
          //expect(await instance.partiallyPaused(1)).to.equal(false);
        });

        it('emits PartialUnpaused event', async function () {
          await expect(instance.connect(deployer).__partialUnpause(1))
            .to.emit(instance, 'PartiallyUnpaused')
            .withArgs(deployer.address, 1);
        });

        it('reverts if partialUnpaused already', async function () {
          await instance.__partialUnpause(1);
          await expect(
            instance.__partialUnpause(1),
          ).to.be.revertedWithCustomError(instance, 'Pausable__NotPaused');
        });
      });
    });
  });
});
