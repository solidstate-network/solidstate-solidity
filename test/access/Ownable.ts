import { deployMockContract } from '@ethereum-waffle/mock-contract';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfOwnable } from '@solidstate/spec';
import { OwnableMock, OwnableMock__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Ownable', function () {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: OwnableMock;

  before(async function () {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await new OwnableMock__factory(owner).deploy(owner.address);
  });

  describeBehaviorOfOwnable(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });

  describe('__internal', () => {
    describe('onlyOwner() modifier', () => {
      it('does not revert if sender is owner', async () => {
        await expect(instance.connect(owner)['modifier_onlyOwner()']()).not.to
          .be.reverted;
      });

      describe('reverts if', () => {
        it('sender is not owner', async () => {
          await expect(
            instance.connect(nonOwner)['modifier_onlyOwner()'](),
          ).to.be.revertedWithCustomError(instance, 'Ownable__NotOwner');
        });
      });
    });

    describe('onlyTransitiveOwner() modifier', () => {
      it('does not revert if sender is transitive owner', async () => {
        await expect(
          instance.connect(owner)['modifier_onlyTransitiveOwner()'](),
        ).not.to.be.reverted;

        const intermediateOwner = await new OwnableMock__factory(owner).deploy(
          owner.address,
        );

        await instance.__setOwner(intermediateOwner.address);

        await expect(
          instance.connect(owner)['modifier_onlyTransitiveOwner()'](),
        ).not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('sender is not transitive owner', async () => {
          const intermediateOwner = await new OwnableMock__factory(
            owner,
          ).deploy(owner.address);

          await ethers.provider.send('hardhat_impersonateAccount', [
            intermediateOwner.address,
          ]);

          const signer = await ethers.getSigner(intermediateOwner.address);

          await expect(
            instance.connect(signer)['modifier_onlyTransitiveOwner()'](),
          ).to.be.revertedWithCustomError(
            instance,
            'Ownable__NotTransitiveOwner',
          );
        });
      });
    });

    describe('#_owner()', () => {
      it('returns contract owner', async () => {
        expect(await instance.callStatic.__owner()).to.equal(owner.address);
      });
    });

    describe('#_transitiveOwner()', () => {
      it('returns owner if owner is EOA', async () => {
        expect(await instance.callStatic.__transitiveOwner()).to.equal(
          owner.address,
        );
      });

      it('returns owner if owner is not Ownable', async () => {
        const ownerInstance = await deployMockContract(owner, []);

        await instance.__setOwner(ownerInstance.address);

        expect(await instance.callStatic.__transitiveOwner()).to.equal(
          ownerInstance.address,
        );
      });

      it('returns transitive owner', async () => {
        const secondOwnerInstance = await new OwnableMock__factory(
          owner,
        ).deploy(owner.address);

        const firstOwnerInstance = await new OwnableMock__factory(owner).deploy(
          secondOwnerInstance.address,
        );

        await instance.__setOwner(firstOwnerInstance.address);

        expect(await instance.callStatic.__transitiveOwner()).to.equal(
          owner.address,
        );
      });
    });

    describe('#_transferOwnership', () => {
      it('sets new owner', async function () {
        await instance.__transferOwnership(ethers.constants.AddressZero);

        expect(await instance.callStatic.owner()).to.equal(
          ethers.constants.AddressZero,
        );
      });

      it('emits OwnershipTransferred event', async function () {
        await expect(instance.__transferOwnership(ethers.constants.AddressZero))
          .to.emit(instance, 'OwnershipTransferred')
          .withArgs(owner.address, ethers.constants.AddressZero);
      });
    });

    describe('#_setOwner', () => {
      it('sets new owner', async function () {
        await instance.__setOwner(ethers.constants.AddressZero);

        expect(await instance.callStatic.owner()).to.equal(
          ethers.constants.AddressZero,
        );
      });

      it('emits OwnershipTransferred event', async function () {
        await expect(instance.__setOwner(ethers.constants.AddressZero))
          .to.emit(instance, 'OwnershipTransferred')
          .withArgs(owner.address, ethers.constants.AddressZero);
      });
    });
  });
});
