import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfPartialPausable } from '@solidstate/spec';
import {
  PartialPausableMock,
  PartialPausableMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('PartialPausable', function () {
  let deployer: SignerWithAddress;
  let instance: PartialPausableMock;

  before(async function () {
    [deployer] = await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await new PartialPausableMock__factory(deployer).deploy();
  });

  describeBehaviorOfPartialPausable(async () => instance, {});

  describe('__internal', function () {
    describe('#_partialPause(address)', function () {
      it('sets partialPaused === true', async function () {
        await instance.__partialPause(ethers.constants.AddressZero);
        expect(
          await instance.partialPaused(ethers.constants.AddressZero),
        ).to.equal(true);
      });

      it('emits PartialPaused event', async function () {
        await expect(
          instance
            .connect(deployer)
            .__partialPause(ethers.constants.AddressZero),
        )
          .to.emit(instance, 'PartialPaused')
          .withArgs(deployer.address, ethers.constants.AddressZero);
      });

      it('reverts if paused already', async function () {
        await instance.__partialPause(ethers.constants.AddressZero);
        await expect(
          instance.__partialPause(ethers.constants.AddressZero),
        ).to.be.revertedWithCustomError(instance, 'PartialPausable__Paused');
      });
    });

    describe('#_partialUnpause(address)', function () {
      beforeEach(async function () {
        await instance.__partialPause(ethers.constants.AddressZero);
      });

      it('sets partialPaused === false', async function () {
        await instance.__partialUnpause(ethers.constants.AddressZero);
        expect(
          await instance.partialPaused(ethers.constants.AddressZero),
        ).to.equal(false);
      });

      it('emits PartialUnpaused event', async function () {
        await expect(
          instance
            .connect(deployer)
            .__partialUnpause(ethers.constants.AddressZero),
        )
          .to.emit(instance, 'PartialUnpaused')
          .withArgs(deployer.address, ethers.constants.AddressZero);
      });

      it('reverts if partialUnpaused already', async function () {
        await instance.__partialUnpause(ethers.constants.AddressZero);
        await expect(
          instance.__partialUnpause(ethers.constants.AddressZero),
        ).to.be.revertedWithCustomError(instance, 'PartialPausable__NotPaused');
      });
    });
  });
});
