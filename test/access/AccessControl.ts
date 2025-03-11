import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfAccessControl } from '@solidstate/spec';
import {
  $AccessControl,
  $AccessControl__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const DEFAULT_ADMIN_ROLE = ethers.ZeroHash;
const ROLE = ethers.solidityPackedKeccak256(['string'], ['ROLE']);

describe('AccessControl', () => {
  let admin: SignerWithAddress;
  let nonAdmin: SignerWithAddress;
  let nonAdmin2: SignerWithAddress;
  let nonAdmin3: SignerWithAddress;
  let instance: $AccessControl;

  before(async () => {
    [admin, nonAdmin, nonAdmin2, nonAdmin3] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new $AccessControl__factory(admin).deploy();

    await instance.$_setRole(
      DEFAULT_ADMIN_ROLE,
      await admin.getAddress(),
      true,
    );
  });

  describeBehaviorOfAccessControl({
    deploy: async () => instance as any,
    getAdmin: async () => admin,
    getNonAdmin: async () => nonAdmin,
  });

  describe('__internal', () => {
    describe('onlyRole(bytes32) modifier', () => {
      it('does not revert if sender has role', async () => {
        await expect(instance.connect(admin).$onlyRole(DEFAULT_ADMIN_ROLE)).not
          .to.be.reverted;
      });

      describe('reverts if', () => {
        it('sender does not have role', async () => {
          await expect(
            instance.connect(nonAdmin).$onlyRole(DEFAULT_ADMIN_ROLE),
          ).to.be.revertedWith(
            `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`,
          );
        });
      });
    });

    describe('#_checkRole(bytes32)', () => {
      it('does not revert if sender has role', async () => {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        await expect(
          instance.connect(nonAdmin)['$_checkRole(bytes32)'].staticCall(ROLE),
        ).not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('sender does not have role', async () => {
          await expect(
            instance.connect(nonAdmin)['$_checkRole(bytes32)'].staticCall(ROLE),
          ).to.revertedWith(
            `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${ROLE}`,
          );
        });
      });
    });

    describe('#_checkRole(bytes32,address)', () => {
      it('does not revert if given account has role', async () => {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        await expect(
          instance['$_checkRole(bytes32,address)'].staticCall(
            ROLE,
            nonAdmin.address,
          ),
        ).not.to.be.reverted;
      });

      describe('reverts if', () => {
        it('given account does not have role', async () => {
          await expect(
            instance['$_checkRole(bytes32,address)'].staticCall(
              ROLE,
              nonAdmin.address,
            ),
          ).to.revertedWith(
            `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${ROLE}`,
          );
        });
      });
    });

    describe('#_setRoleAdmin(bytes32,bytes32)', () => {
      it('updates role admin', async () => {
        const newAdminRole = ethers.solidityPackedKeccak256(
          ['string'],
          ['NEW_ADMIN_ROLE'],
        );

        await instance.$_setRoleAdmin(ROLE, newAdminRole);

        expect(await instance.getRoleAdmin.staticCall(ROLE)).to.equal(
          newAdminRole,
        );
      });

      it('emits RoleAdminChanged event', async () => {
        const newAdminRole = ethers.solidityPackedKeccak256(
          ['string'],
          ['NEW_ADMIN_ROLE'],
        );

        await expect(instance.$_setRoleAdmin(ROLE, newAdminRole))
          .to.emit(instance, 'RoleAdminChanged')
          .withArgs(ROLE, DEFAULT_ADMIN_ROLE, newAdminRole);
      });
    });

    describe('#_getRoleMember(bytes32,uint256)', () => {
      it('returns the correct member', async () => {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);
        await instance.connect(admin).grantRole(ROLE, nonAdmin2.address);
        await instance.connect(admin).grantRole(ROLE, nonAdmin3.address);

        expect(await instance.getRoleMember(ROLE, 0)).to.equal(
          nonAdmin.address,
        );
        expect(await instance.getRoleMember(ROLE, 1)).to.equal(
          nonAdmin2.address,
        );
        expect(await instance.getRoleMember(ROLE, 2)).to.equal(
          nonAdmin3.address,
        );
      });

      describe('reverts if', () => {
        it('role does not exist', async () => {
          await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

          const newRole = ethers.solidityPackedKeccak256(
            ['string'],
            ['NEW_ROLE'],
          );
          await expect(
            instance.getRoleMember(newRole, 0),
          ).to.revertedWithCustomError(
            instance,
            'EnumerableSet__IndexOutOfBounds',
          );
        });

        it('role exists but index is invalid', async () => {
          await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

          await expect(
            instance.getRoleMember(ROLE, 1),
          ).to.revertedWithCustomError(
            instance,
            'EnumerableSet__IndexOutOfBounds',
          );
        });
      });
    });

    describe('#_getRoleMemberCount(bytes32)', () => {
      it('returns the correct count', async () => {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);
        await instance.connect(admin).grantRole(ROLE, nonAdmin2.address);
        await instance.connect(admin).grantRole(ROLE, nonAdmin3.address);

        expect(await instance.getRoleMemberCount(ROLE)).to.equal(3);

        const newRole = ethers.solidityPackedKeccak256(
          ['string'],
          ['NEW_ROLE'],
        );
        expect(await instance.getRoleMemberCount(newRole)).to.equal(0);
      });
    });
  });
});
