import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { AccessControl } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const DEFAULT_ADMIN_ROLE =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
const ROLE = ethers.solidityPackedKeccak256(['string'], ['ROLE']);

interface AccessControlBehaviorArgs {
  deploy: () => Promise<AccessControl>;
  getAdmin: () => Promise<SignerWithAddress>;
  getNonAdmin: () => Promise<SignerWithAddress>;
}

export function describeBehaviorOfAccessControl(
  { deploy, getAdmin, getNonAdmin }: AccessControlBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::AccessControl', function () {
    let instance: AccessControl;
    let admin: SignerWithAddress;
    let nonAdmin: SignerWithAddress;

    beforeEach(async function () {
      instance = await deploy();
      admin = await getAdmin();
      nonAdmin = await getNonAdmin();
    });

    describe('#hasRole(bytes32,address)', function () {
      it('returns whether given account has given role', async function () {
        expect(
          await instance['hasRole(bytes32,address)'].staticCall(
            DEFAULT_ADMIN_ROLE,
            admin.address,
          ),
        ).to.equal(true);

        expect(
          await instance['hasRole(bytes32,address)'].staticCall(
            DEFAULT_ADMIN_ROLE,
            ethers.ZeroAddress,
          ),
        ).to.equal(false);
      });
    });

    describe('#getRoleAdmin(bytes32)', function () {
      it('returns default admin role', async function () {
        expect(
          await instance['getRoleAdmin(bytes32)'].staticCall(ROLE),
        ).to.equal(DEFAULT_ADMIN_ROLE);
      });

      it('returns default admin role as admin of itself', async function () {
        expect(
          await instance['getRoleAdmin(bytes32)'].staticCall(
            DEFAULT_ADMIN_ROLE,
          ),
        ).to.equal(DEFAULT_ADMIN_ROLE);
      });
    });

    describe('#grantRole(bytes32,address)', function () {
      it('adds role to account', async function () {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        expect(
          await instance['hasRole(bytes32,address)'].staticCall(
            ROLE,
            nonAdmin.address,
          ),
        ).to.equal(true);
      });

      it('emits RoleGranted event', async function () {
        await expect(instance.connect(admin).grantRole(ROLE, nonAdmin.address))
          .to.emit(instance, 'RoleGranted')
          .withArgs(ROLE, nonAdmin.address, admin.address);
      });

      describe('reverts if', function () {
        it('sender is not admin', async function () {
          await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

          await expect(
            instance.connect(nonAdmin).grantRole(ROLE, nonAdmin.address),
          ).to.be.revertedWith(
            `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`,
          );
        });
      });
    });

    describe('#revokeRole(bytes32,address)', function () {
      it('removes role from account', async function () {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        await instance.connect(admin).revokeRole(ROLE, nonAdmin.address);

        expect(
          await instance['hasRole(bytes32,address)'].staticCall(
            ROLE,
            nonAdmin.address,
          ),
        ).to.equal(false);
      });

      it('emits RoleRevoked event', async function () {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        await expect(instance.connect(admin).revokeRole(ROLE, nonAdmin.address))
          .to.emit(instance, 'RoleRevoked')
          .withArgs(ROLE, nonAdmin.address, admin.address);
      });

      describe('reverts if', function () {
        it('sender is not admin', async function () {
          await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

          await expect(
            instance.connect(nonAdmin).revokeRole(ROLE, nonAdmin.address),
          ).to.be.revertedWith(
            `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`,
          );
        });
      });
    });

    describe('#renounceRole(bytes32,address)', function () {
      it('removes role from sender', async function () {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        await instance.connect(nonAdmin).renounceRole(ROLE),
          expect(
            await instance['hasRole(bytes32,address)'].staticCall(
              ROLE,
              nonAdmin.address,
            ),
          ).to.equal(false);
      });

      it('emits RoleRevoked event', async function () {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        await expect(instance.connect(nonAdmin).renounceRole(ROLE))
          .to.emit(instance, 'RoleRevoked')
          .withArgs(ROLE, nonAdmin.address, nonAdmin.address);
      });
    });
  });
}
