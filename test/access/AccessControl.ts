import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfAccessControl } from '@solidstate/spec';
import {
  AccessControlMock,
  AccessControlMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const DEFAULT_ADMIN_ROLE =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
const ROLE = ethers.solidityPackedKeccak256(['string'], ['ROLE']);

describe('AccessControl', function () {
  let admin: SignerWithAddress;
  let nonAdmin: SignerWithAddress;
  let nonAdmin2: SignerWithAddress;
  let nonAdmin3: SignerWithAddress;
  let instance: AccessControlMock;

  before(async function () {
    [admin, nonAdmin, nonAdmin2, nonAdmin3] = await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await new AccessControlMock__factory(admin).deploy(
      admin.address,
    );
  });

  describeBehaviorOfAccessControl({
    deploy: async () => instance as any,
    getAdmin: async () => admin,
    getNonAdmin: async () => nonAdmin,
  });

  describe('#_checkRole(bytes32)', function () {
    it('does not revert if sender has role', async function () {
      await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

      await expect(
        instance.connect(nonAdmin)['checkRole(bytes32)'].staticCall(ROLE),
      ).not.to.be.reverted;
    });

    describe('reverts if', function () {
      it('sender does not have role', async function () {
        await expect(
          instance.connect(nonAdmin)['checkRole(bytes32)'].staticCall(ROLE),
        ).to.revertedWith(
          `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${ROLE}`,
        );
      });
    });
  });

  describe('#_checkRole(bytes32,address)', function () {
    it('does not revert if given account has role', async function () {
      await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

      await expect(
        instance['checkRole(bytes32,address)'].staticCall(
          ROLE,
          nonAdmin.address,
        ),
      ).not.to.be.reverted;
    });

    describe('reverts if', function () {
      it('given account does not have role', async function () {
        await expect(
          instance['checkRole(bytes32,address)'].staticCall(
            ROLE,
            nonAdmin.address,
          ),
        ).to.revertedWith(
          `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${ROLE}`,
        );
      });
    });
  });

  describe('#_setRoleAdmin(bytes32,bytes32)', function () {
    it('updates role admin', async function () {
      const newAdminRole = ethers.solidityPackedKeccak256(
        ['string'],
        ['NEW_ADMIN_ROLE'],
      );

      await instance.setRoleAdmin(ROLE, newAdminRole);

      expect(await instance.getRoleAdmin.staticCall(ROLE)).to.equal(
        newAdminRole,
      );
    });

    it('emits RoleAdminChanged event', async function () {
      const newAdminRole = ethers.solidityPackedKeccak256(
        ['string'],
        ['NEW_ADMIN_ROLE'],
      );

      await expect(instance.setRoleAdmin(ROLE, newAdminRole))
        .to.emit(instance, 'RoleAdminChanged')
        .withArgs(ROLE, DEFAULT_ADMIN_ROLE, newAdminRole);
    });
  });

  describe('#_getRoleMember(bytes32,uint256)', function () {
    it('returns the correct member', async function () {
      await instance.connect(admin).grantRole(ROLE, nonAdmin.address);
      await instance.connect(admin).grantRole(ROLE, nonAdmin2.address);
      await instance.connect(admin).grantRole(ROLE, nonAdmin3.address);

      expect(await instance.getRoleMember(ROLE, 0)).to.equal(nonAdmin.address);
      expect(await instance.getRoleMember(ROLE, 1)).to.equal(nonAdmin2.address);
      expect(await instance.getRoleMember(ROLE, 2)).to.equal(nonAdmin3.address);
    });

    describe('reverts if', function () {
      it('role does not exist', async function () {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        const newRole = ethers.utils.solidityKeccak256(
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

      it('role exists but index is invalid', async function () {
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

  describe('#_getRoleMemberCount(bytes32)', function () {
    it('returns the correct count', async function () {
      await instance.connect(admin).grantRole(ROLE, nonAdmin.address);
      await instance.connect(admin).grantRole(ROLE, nonAdmin2.address);
      await instance.connect(admin).grantRole(ROLE, nonAdmin3.address);

      expect(await instance.getRoleMemberCount(ROLE)).to.equal(3);

      const newRole = ethers.utils.solidityKeccak256(['string'], ['NEW_ROLE']);
      expect(await instance.getRoleMemberCount(newRole)).to.equal(0);
    });
  });
});
