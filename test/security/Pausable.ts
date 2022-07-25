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
        await expect(instance.__pause()).to.be.revertedWith('Pausable: paused');
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
        await expect(instance.__unpause()).to.be.revertedWith(
          'Pausable: not paused',
        );
      });
    });
  });
});
