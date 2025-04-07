import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  $AccessControlOwnable,
  $AccessControlOwnable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const DEFAULT_ADMIN_ROLE = ethers.ZeroHash;

describe('AccessControlOwnable', () => {
  let deployer: SignerWithAddress;
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: $AccessControlOwnable;

  before(async () => {
    [deployer, owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new $AccessControlOwnable__factory(deployer).deploy();

    await instance.$_setOwner(await owner.getAddress());
  });

  describe('#_grantRole(bytes32,address)', () => {
    it('allows the default admin to grant roles', async () => {
      await instance
        .connect(owner)
        .$_grantRole(ethers.id('ROLE'), nonOwner.address);
      expect(await instance.$_hasRole(ethers.id('ROLE'), nonOwner.address)).to
        .be.true;
    });

    describe('reverts if', () => {
      it('role is default admin role', async () => {
        await expect(
          instance
            .connect(owner)
            .$_grantRole(DEFAULT_ADMIN_ROLE, await owner.getAddress()),
        ).to.be.revertedWithCustomError(
          instance,
          'AccessControlOwnable__InvalidActionOnDefaultAdminRole',
        );
      });

      it('sender is not default admin', async () => {
        await expect(
          instance
            .connect(nonOwner)
            .$_grantRole(ethers.id('ROLE'), nonOwner.address),
        )
          .to.be.revertedWithCustomError(
            instance,
            'AccessControl__Unauthorized',
          )
          .withArgs(DEFAULT_ADMIN_ROLE, await nonOwner.getAddress());
      });
    });
  });

  describe('#_revokeRole(bytes32,address)', () => {
    it('allows the default admin to revoke roles', async () => {
      await instance
        .connect(owner)
        .$_grantRole(ethers.id('ROLE'), nonOwner.address);
      await instance
        .connect(owner)
        .$_revokeRole(ethers.id('ROLE'), nonOwner.address);
      expect(await instance.$_hasRole(ethers.id('ROLE'), nonOwner.address)).to
        .be.false;
    });

    describe('reverts if', () => {
      it('role is default admin role', async () => {
        await expect(
          instance
            .connect(owner)
            .$_revokeRole(DEFAULT_ADMIN_ROLE, await owner.getAddress()),
        ).to.be.revertedWithCustomError(
          instance,
          'AccessControlOwnable__InvalidActionOnDefaultAdminRole',
        );
      });

      it('sender is not default admin', async () => {
        await expect(
          instance
            .connect(nonOwner)
            .$_grantRole(ethers.id('ROLE'), nonOwner.address),
        )
          .to.be.revertedWithCustomError(
            instance,
            'AccessControl__Unauthorized',
          )
          .withArgs(DEFAULT_ADMIN_ROLE, await nonOwner.getAddress());
      });
    });
  });

  describe('#_setRoleAdmin(bytes32,bytes32)', () => {
    it('sets role admin regardless of sender', async () => {
      await instance
        .connect(nonOwner)
        .$_setRoleAdmin(ethers.id('ROLE'), ethers.id('ADMIN'));

      expect(await instance.$_getRoleAdmin.staticCall(ethers.id('ROLE'))).to.eq(
        ethers.id('ADMIN'),
      );
    });

    describe('reverts if', () => {
      it('role is default admin role', async () => {
        await expect(
          instance
            .connect(owner)
            .$_setRoleAdmin(DEFAULT_ADMIN_ROLE, ethers.id('ROLE')),
        ).to.be.revertedWithCustomError(
          instance,
          'AccessControlOwnable__InvalidActionOnDefaultAdminRole',
        );
      });
    });
  });

  describe('#_setOwner(address)', () => {
    it('transfers default admin role along with ownership', async () => {
      expect(
        await instance.$_hasRole(DEFAULT_ADMIN_ROLE, await owner.getAddress()),
      ).to.be.true;
      expect(
        await instance.$_hasRole(
          DEFAULT_ADMIN_ROLE,
          await nonOwner.getAddress(),
        ),
      ).to.be.false;

      await instance.$_setOwner(await nonOwner.getAddress());

      expect(
        await instance.$_hasRole(DEFAULT_ADMIN_ROLE, await owner.getAddress()),
      ).to.be.false;
      expect(
        await instance.$_hasRole(
          DEFAULT_ADMIN_ROLE,
          await nonOwner.getAddress(),
        ),
      ).to.be.true;
    });

    it('emits RoleGranted event', async () => {
      await expect(
        instance.connect(deployer).$_setOwner(await nonOwner.getAddress()),
      )
        .to.emit(instance, 'RoleGranted')
        .withArgs(
          DEFAULT_ADMIN_ROLE,
          await nonOwner.getAddress(),
          await deployer.getAddress(),
        );
    });

    it('emits RoleRevoked event', async () => {
      await expect(
        instance.connect(deployer).$_setOwner(await nonOwner.getAddress()),
      )
        .to.emit(instance, 'RoleRevoked')
        .withArgs(
          DEFAULT_ADMIN_ROLE,
          await owner.getAddress(),
          await deployer.getAddress(),
        );
    });
  });
});
