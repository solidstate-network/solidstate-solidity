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
    describe('whenNotPaused() modifier', () => {
      it('does not revert if contract is not paused', async () => {
        await expect(instance.modifier_whenNotPaused()).not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('contract is paused', async () => {
          await instance.__pause();

          await expect(
            instance.modifier_whenNotPaused(),
          ).to.be.revertedWithCustomError(instance, 'Pausable__Paused');
        });
      });
    });

    describe('whenPaused() modifier', () => {
      it('does not revert if contract is paused', async () => {
        await instance.__pause();

        await expect(instance.modifier_whenPaused()).not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('contract is not paused', async () => {
          await expect(
            instance.modifier_whenPaused(),
          ).to.be.revertedWithCustomError(instance, 'Pausable__NotPaused');
        });
      });
    });

    describe('#_paused()', () => {
      it('returns whether contract is paused', async () => {
        expect(await instance.callStatic.__paused()).to.be.false;
        await instance.__pause();
        expect(await instance.callStatic.__paused()).to.be.true;
      });
    });

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
  });
});
