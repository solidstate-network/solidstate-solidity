import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { AccessControl } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const DEFAULT_ADMIN_ROLE = ethers.ZeroHash;
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

  describe('::AccessControl', () => {
    let instance: AccessControl;
    let admin: SignerWithAddress;
    let nonAdmin: SignerWithAddress;

    beforeEach(async () => {
      instance = await deploy();
      admin = await getAdmin();
      nonAdmin = await getNonAdmin();
    });

    describe('#hasRole(bytes32,address)', () => {
      it('returns whether given account has given role', async () => {
        expect(
          await instance.hasRole.staticCall(DEFAULT_ADMIN_ROLE, admin.address),
        ).to.equal(true);

        expect(
          await instance.hasRole.staticCall(
            DEFAULT_ADMIN_ROLE,
            ethers.ZeroAddress,
          ),
        ).to.equal(false);
      });
    });

    describe('#getRoleAdmin(bytes32)', () => {
      it('returns default admin role', async () => {
        expect(await instance.getRoleAdmin.staticCall(ROLE)).to.equal(
          DEFAULT_ADMIN_ROLE,
        );
      });

      it('returns default admin role as admin of itself', async () => {
        expect(
          await instance.getRoleAdmin.staticCall(DEFAULT_ADMIN_ROLE),
        ).to.equal(DEFAULT_ADMIN_ROLE);
      });
    });

    describe('#grantRole(bytes32,address)', () => {
      it('adds role to account', async () => {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        expect(
          await instance.hasRole.staticCall(ROLE, nonAdmin.address),
        ).to.equal(true);
      });

      it('emits RoleGranted event', async () => {
        await expect(instance.connect(admin).grantRole(ROLE, nonAdmin.address))
          .to.emit(instance, 'RoleGranted')
          .withArgs(ROLE, nonAdmin.address, admin.address);
      });

      describe('reverts if', () => {
        it('sender is not admin', async () => {
          await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

          await expect(
            instance.connect(nonAdmin).grantRole(ROLE, nonAdmin.address),
          ).to.be.revertedWith(
            `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`,
          );
        });
      });
    });

    describe('#revokeRole(bytes32,address)', () => {
      it('removes role from account', async () => {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        await instance.connect(admin).revokeRole(ROLE, nonAdmin.address);

        expect(
          await instance.hasRole.staticCall(ROLE, nonAdmin.address),
        ).to.equal(false);
      });

      it('emits RoleRevoked event', async () => {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        await expect(instance.connect(admin).revokeRole(ROLE, nonAdmin.address))
          .to.emit(instance, 'RoleRevoked')
          .withArgs(ROLE, nonAdmin.address, admin.address);
      });

      describe('reverts if', () => {
        it('sender is not admin', async () => {
          await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

          await expect(
            instance.connect(nonAdmin).revokeRole(ROLE, nonAdmin.address),
          ).to.be.revertedWith(
            `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`,
          );
        });
      });
    });

    describe('#renounceRole(bytes32,address)', () => {
      it('removes role from sender', async () => {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        await instance.connect(nonAdmin).renounceRole(ROLE),
          expect(
            await instance.hasRole.staticCall(ROLE, nonAdmin.address),
          ).to.equal(false);
      });

      it('emits RoleRevoked event', async () => {
        await instance.connect(admin).grantRole(ROLE, nonAdmin.address);

        await expect(instance.connect(nonAdmin).renounceRole(ROLE))
          .to.emit(instance, 'RoleRevoked')
          .withArgs(ROLE, nonAdmin.address, nonAdmin.address);
      });
    });
  });
}
