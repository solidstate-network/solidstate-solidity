import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfBeacon } from '@solidstate/spec';
import { BeaconMock, BeaconMock__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Beacon', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: BeaconMock;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    instance = await new BeaconMock__factory(deployer).deploy(
      await owner.getAddress(),
    );
  });

  describeBehaviorOfBeacon(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });

  describe('__internal', () => {
    describe('#_getImplementation()', () => {
      it('returns implementation address', async () => {
        expect(await instance.__getImplementation.staticCall()).to.be
          .properAddress;
      });
    });

    describe('#_setImplementation(address)', async () => {
      it('updates implementation address', async () => {
        expect(await instance.__getImplementation.staticCall()).to.eq(
          ethers.ZeroAddress,
        );

        const address = ethers.getAddress(
          ethers.zeroPadValue(ethers.randomBytes(20), 20),
        );

        await instance.connect(owner).__setImplementation(address);

        expect(await instance.__getImplementation.staticCall()).to.eq(address);
      });

      describe('reverts if', () => {
        it('sender is not owner', async () => {
          await expect(
            instance.connect(nonOwner).__setImplementation(ethers.ZeroAddress),
          ).to.be.revertedWithCustomError(instance, 'Ownable__NotOwner');
        });
      });
    });
  });
});
