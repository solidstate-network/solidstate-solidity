import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { impersonateAccount } from '@nomicfoundation/hardhat-network-helpers';
import { deployMockContract } from '@solidstate/library';
import { describeBehaviorOfOwnable } from '@solidstate/spec';
import {
  __hh_exposed_Ownable,
  __hh_exposed_Ownable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Ownable', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: __hh_exposed_Ownable;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new __hh_exposed_Ownable__factory(owner).deploy();

    await instance.__hh_exposed__setOwner(await owner.getAddress());
  });

  describeBehaviorOfOwnable(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });

  // TODO: test modifiers

  // describe('onlyOwner() modifier', () => {
  //   it('does not revert if sender is owner', async () => {
  //     await expect(instance.connect(owner).modifier_onlyOwner()).not.to.be
  //       .reverted;
  //   });

  //   describe('reverts if', () => {
  //     it('sender is not owner', async () => {
  //       await expect(
  //         instance.connect(nonOwner).modifier_onlyOwner(),
  //       ).to.be.revertedWithCustomError(instance, 'Ownable__NotOwner');
  //     });
  //   });
  // });

  // describe('onlyTransitiveOwner() modifier', () => {
  //   it('does not revert if sender is transitive owner', async () => {
  //     await expect(instance.connect(owner).modifier_onlyTransitiveOwner()).not
  //       .to.be.reverted;

  //     const intermediateOwner = await new OwnableMock__factory(owner).deploy(
  //       owner.address,
  //     );

  //     await instance.__setOwner(await intermediateOwner.getAddress());

  //     await expect(instance.connect(owner).modifier_onlyTransitiveOwner()).not
  //       .to.be.reverted;
  //   });

  //   describe('reverts if', () => {
  //     it('sender is not transitive owner', async () => {
  //       const intermediateOwner = await new OwnableMock__factory(
  //         owner,
  //       ).deploy(owner.address);
  //       const intermediateOwnerAddress = await intermediateOwner.getAddress();

  //       await impersonateAccount(intermediateOwnerAddress);

  //       const signer = await ethers.getSigner(intermediateOwnerAddress);

  //       await expect(
  //         instance.connect(signer).modifier_onlyTransitiveOwner.staticCall(),
  //       ).to.be.revertedWithCustomError(
  //         instance,
  //         'Ownable__NotTransitiveOwner',
  //       );
  //     });
  //   });
  // });

  describe('__internal', () => {
    describe('#_owner()', () => {
      it('returns contract owner', async () => {
        expect(await instance.__hh_exposed__owner.staticCall()).to.equal(
          owner.address,
        );
      });
    });

    describe('#_transitiveOwner()', () => {
      it('returns owner if owner is EOA', async () => {
        expect(
          await instance.__hh_exposed__transitiveOwner.staticCall(),
        ).to.equal(owner.address);
      });

      it('returns owner if owner is not Ownable', async () => {
        const ownerInstance = await deployMockContract(owner, []);
        const ownerInstanceAddress = await ownerInstance.getAddress();

        await instance.__hh_exposed__setOwner(ownerInstanceAddress);

        expect(
          await instance.__hh_exposed__transitiveOwner.staticCall(),
        ).to.equal(ownerInstanceAddress);
      });

      it('returns transitive owner', async () => {
        const secondOwnerInstance = await new __hh_exposed_Ownable__factory(
          owner,
        ).deploy();

        await secondOwnerInstance.__hh_exposed__setOwner(
          await owner.getAddress(),
        );

        const firstOwnerInstance = await new __hh_exposed_Ownable__factory(
          owner,
        ).deploy();

        await firstOwnerInstance.__hh_exposed__setOwner(
          await secondOwnerInstance.getAddress(),
        );

        await instance.__hh_exposed__setOwner(
          await firstOwnerInstance.getAddress(),
        );

        expect(
          await instance.__hh_exposed__transitiveOwner.staticCall(),
        ).to.equal(owner.address);
      });
    });

    describe('#_transferOwnership', () => {
      it('sets new owner', async () => {
        await instance.__hh_exposed__transferOwnership(ethers.ZeroAddress);

        expect(await instance.owner.staticCall()).to.equal(ethers.ZeroAddress);
      });

      it('emits OwnershipTransferred event', async () => {
        await expect(
          instance.__hh_exposed__transferOwnership(ethers.ZeroAddress),
        )
          .to.emit(instance, 'OwnershipTransferred')
          .withArgs(owner.address, ethers.ZeroAddress);
      });
    });

    describe('#_setOwner', () => {
      it('sets new owner', async () => {
        await instance.__hh_exposed__setOwner(ethers.ZeroAddress);

        expect(await instance.owner.staticCall()).to.equal(ethers.ZeroAddress);
      });

      it('emits OwnershipTransferred event', async () => {
        await expect(instance.__hh_exposed__setOwner(ethers.ZeroAddress))
          .to.emit(instance, 'OwnershipTransferred')
          .withArgs(owner.address, ethers.ZeroAddress);
      });
    });
  });
});
