import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { impersonateAccount } from '@nomicfoundation/hardhat-network-helpers';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfOwnable } from '@solidstate/spec';
import { OwnableMock, OwnableMock__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Ownable', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: OwnableMock;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new OwnableMock__factory(owner).deploy(owner.address);
  });

  describeBehaviorOfOwnable(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });

  describe('__internal', () => {
    describe('onlyOwner() modifier', () => {
      it('does not revert if sender is owner', async () => {
        await expect(instance.connect(owner).modifier_onlyOwner()).not.to.be
          .reverted;
      });

      describe('reverts if', () => {
        it('sender is not owner', async () => {
          await expect(
            instance.connect(nonOwner).modifier_onlyOwner(),
          ).to.be.revertedWithCustomError(instance, 'Ownable__NotOwner');
        });
      });
    });

    describe('onlyTransitiveOwner() modifier', () => {
      it('does not revert if sender is transitive owner', async () => {
        await expect(instance.connect(owner).modifier_onlyTransitiveOwner()).not
          .to.be.reverted;

        const intermediateOwner = await new OwnableMock__factory(owner).deploy(
          owner.address,
        );

        await instance.__setOwner(await intermediateOwner.getAddress());

        await expect(instance.connect(owner).modifier_onlyTransitiveOwner()).not
          .to.be.reverted;
      });

      describe('reverts if', () => {
        it('sender is not transitive owner', async () => {
          const intermediateOwner = await new OwnableMock__factory(
            owner,
          ).deploy(owner.address);
          const intermediateOwnerAddress = await intermediateOwner.getAddress();

          await impersonateAccount(intermediateOwnerAddress);

          const signer = await ethers.getSigner(intermediateOwnerAddress);

          await expect(
            instance.connect(signer).modifier_onlyTransitiveOwner.staticCall(),
          ).to.be.revertedWithCustomError(
            instance,
            'Ownable__NotTransitiveOwner',
          );
        });
      });
    });

    describe('#_owner()', () => {
      it('returns contract owner', async () => {
        expect(await instance.__owner.staticCall()).to.equal(owner.address);
      });
    });

    describe('#_transitiveOwner()', () => {
      it('returns owner if owner is EOA', async () => {
        expect(await instance.__transitiveOwner.staticCall()).to.equal(
          owner.address,
        );
      });

      it('returns owner if owner is not Ownable', async () => {
        const ownerInstance = await deployMockContract(owner, []);
        const ownerInstanceAddress = await ownerInstance.getAddress();

        await instance.__setOwner(ownerInstanceAddress);

        expect(await instance.__transitiveOwner.staticCall()).to.equal(
          ownerInstanceAddress,
        );
      });

      it('returns transitive owner', async () => {
        const secondOwnerInstance = await new OwnableMock__factory(
          owner,
        ).deploy(owner.address);

        const firstOwnerInstance = await new OwnableMock__factory(owner).deploy(
          await secondOwnerInstance.getAddress(),
        );

        await instance.__setOwner(await firstOwnerInstance.getAddress());

        expect(await instance.__transitiveOwner.staticCall()).to.equal(
          owner.address,
        );
      });
    });

    describe('#_transferOwnership', () => {
      it('sets new owner', async () => {
        await instance.__transferOwnership(ethers.ZeroAddress);

        expect(await instance.owner.staticCall()).to.equal(ethers.ZeroAddress);
      });

      it('emits OwnershipTransferred event', async () => {
        await expect(instance.__transferOwnership(ethers.ZeroAddress))
          .to.emit(instance, 'OwnershipTransferred')
          .withArgs(owner.address, ethers.ZeroAddress);
      });
    });

    describe('#_setOwner', () => {
      it('sets new owner', async () => {
        await instance.__setOwner(ethers.ZeroAddress);

        expect(await instance.owner.staticCall()).to.equal(ethers.ZeroAddress);
      });

      it('emits OwnershipTransferred event', async () => {
        await expect(instance.__setOwner(ethers.ZeroAddress))
          .to.emit(instance, 'OwnershipTransferred')
          .withArgs(owner.address, ethers.ZeroAddress);
      });
    });
  });
});
