import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { impersonateAccount } from '@nomicfoundation/hardhat-network-helpers';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfOwnable } from '@solidstate/spec';
import { $Ownable, $Ownable__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Ownable', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: $Ownable;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new $Ownable__factory(owner).deploy();

    await instance.$_setOwner(await owner.getAddress());
  });

  describeBehaviorOfOwnable(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });

  describe('onlyOwner() modifier', () => {
    it('does not revert if sender is owner', async () => {
      await expect(instance.connect(owner).$onlyOwner()).not.to.be.reverted;
    });

    describe('reverts if', () => {
      it('sender is not owner', async () => {
        await expect(
          instance.connect(nonOwner).$onlyOwner(),
        ).to.be.revertedWithCustomError(instance, 'Ownable__NotOwner');
      });
    });
  });

  describe('onlyTransitiveOwner() modifier', () => {
    it('does not revert if sender is transitive owner', async () => {
      await expect(instance.connect(owner).$onlyTransitiveOwner()).not.to.be
        .reverted;

      const intermediateOwner = await new $Ownable__factory(owner).deploy();
      await intermediateOwner.$_setOwner(await owner.getAddress());

      await instance.$_setOwner(await intermediateOwner.getAddress());

      await expect(instance.connect(owner).$onlyTransitiveOwner()).not.to.be
        .reverted;
    });

    describe('reverts if', () => {
      it('sender is not transitive owner', async () => {
        const intermediateOwner = await new $Ownable__factory(owner).deploy();
        await intermediateOwner.$_setOwner(await owner.getAddress());

        const intermediateOwnerAddress = await intermediateOwner.getAddress();

        await impersonateAccount(intermediateOwnerAddress);

        const signer = await ethers.getSigner(intermediateOwnerAddress);

        await expect(
          instance.connect(signer).$onlyTransitiveOwner.staticCall(),
        ).to.be.revertedWithCustomError(
          instance,
          'Ownable__NotTransitiveOwner',
        );
      });
    });
  });

  describe('#_owner()', () => {
    it('returns contract owner', async () => {
      expect(await instance.$_owner.staticCall()).to.equal(owner.address);
    });
  });

  describe('#_transitiveOwner()', () => {
    it('returns owner if owner is EOA', async () => {
      expect(await instance.$_transitiveOwner.staticCall()).to.equal(
        owner.address,
      );
    });

    it('returns owner if owner is not Ownable', async () => {
      const ownerInstance = await deployMockContract(owner, []);
      const ownerInstanceAddress = await ownerInstance.getAddress();

      await instance.$_setOwner(ownerInstanceAddress);

      expect(await instance.$_transitiveOwner.staticCall()).to.equal(
        ownerInstanceAddress,
      );
    });

    it('returns transitive owner', async () => {
      const secondOwnerInstance = await new $Ownable__factory(owner).deploy();

      await secondOwnerInstance.$_setOwner(await owner.getAddress());

      const firstOwnerInstance = await new $Ownable__factory(owner).deploy();

      await firstOwnerInstance.$_setOwner(
        await secondOwnerInstance.getAddress(),
      );

      await instance.$_setOwner(await firstOwnerInstance.getAddress());

      expect(await instance.$_transitiveOwner.staticCall()).to.equal(
        owner.address,
      );
    });
  });

  describe('#_transferOwnership', () => {
    it('sets new owner', async () => {
      await instance.$_transferOwnership(ethers.ZeroAddress);

      expect(await instance.owner.staticCall()).to.equal(ethers.ZeroAddress);
    });

    it('emits OwnershipTransferred event', async () => {
      await expect(instance.$_transferOwnership(ethers.ZeroAddress))
        .to.emit(instance, 'OwnershipTransferred')
        .withArgs(owner.address, ethers.ZeroAddress);
    });
  });

  describe('#_setOwner', () => {
    it('sets new owner', async () => {
      await instance.$_setOwner(ethers.ZeroAddress);

      expect(await instance.owner.staticCall()).to.equal(ethers.ZeroAddress);
    });

    it('emits OwnershipTransferred event', async () => {
      await expect(instance.$_setOwner(ethers.ZeroAddress))
        .to.emit(instance, 'OwnershipTransferred')
        .withArgs(owner.address, ethers.ZeroAddress);
    });
  });
});
