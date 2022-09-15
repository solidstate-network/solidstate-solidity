import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { AccessControl } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const DEFAULT_ADMIN_ROLE =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
const ROLE = ethers.utils.solidityKeccak256(['string'], ['ROLE']);

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

    describe('#hasRole(bytes32, address)', function () {
      it('deployer has default admin role', async function () {
        expect(
          await instance.callStatic['hasRole(bytes32,address)'](
            DEFAULT_ADMIN_ROLE,
            admin.address,
          ),
        ).to.equal(true);
      });
    });

    describe('#getRoleAdmin(bytes32)', function () {
      it("other roles's admin is the default admin role", async function () {
        expect(
          await instance.callStatic['getRoleAdmin(bytes32)'](`${ROLE}`),
        ).to.equal(DEFAULT_ADMIN_ROLE);
      });

      it("default admin role's admin is itself", async function () {
        expect(
          await instance.callStatic['getRoleAdmin(bytes32)'](
            DEFAULT_ADMIN_ROLE,
          ),
        ).to.equal(DEFAULT_ADMIN_ROLE);
      });
    });

    describe('#grantRole(bytes32, address)', function () {
      it('accounts can be granted a role multiple times', async function () {
        await instance.connect(admin).grantRole(`${ROLE}`, nonAdmin.address);
        expect(
          await instance.callStatic['hasRole(bytes32,address)'](
            `${ROLE}`,
            nonAdmin.address,
          ),
        ).to.equal(true);
      });

      it('emits RoleGranted event', async function () {
        await expect(
          instance.connect(admin).grantRole(`${ROLE}`, nonAdmin.address),
        ).to.emit(instance, 'RoleGranted');
      });

      it('accounts can be granted a role multiple times', async function () {
        await instance.connect(admin).grantRole(`${ROLE}`, nonAdmin.address);
        const trx = await instance
          .connect(admin)
          .grantRole(`${ROLE}`, nonAdmin.address);
        const receipt = await trx.wait();
        expect(receipt.events?.length).to.equal(0);
      });

      describe('reverts if', function () {
        it('non-admin cannot grant role to other accounts', async function () {
          await instance.connect(admin).grantRole(`${ROLE}`, nonAdmin.address);
          await expect(
            instance.connect(nonAdmin).grantRole(`${ROLE}`, nonAdmin.address),
          ).to.be.revertedWith(
            `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`,
          );
        });
      });
    });

    describe('#revokeRole(bytes32, address)', function () {
      beforeEach(async function () {
        this.receipt = await instance
          .connect(admin)
          .grantRole(`${ROLE}`, nonAdmin.address);
      });

      it('admin can revoke role', async function () {
        await instance.connect(admin).revokeRole(`${ROLE}`, nonAdmin.address);
        expect(
          await instance.callStatic['hasRole(bytes32,address)'](
            `${ROLE}`,
            nonAdmin.address,
          ),
        ).to.equal(false);
      });

      describe('reverts if', function () {
        it('non-admin cannot revoke role', async function () {
          await instance.connect(admin).grantRole(`${ROLE}`, nonAdmin.address);
          await expect(
            instance.connect(nonAdmin).revokeRole(`${ROLE}`, nonAdmin.address),
          ).to.be.revertedWith(
            `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`,
          );
        });
      });

      describe('#renounceRole(bytes32, address)', function () {
        beforeEach(async function () {
          this.receipt = await instance
            .connect(admin)
            .grantRole(`${ROLE}`, nonAdmin.address);
        });

        it('bearer can renounce role', async function () {
          await expect(
            instance
              .connect(nonAdmin)
              .renounceRole(`${ROLE}`, nonAdmin.address),
          )
            .to.emit(instance, 'RoleRevoked')
            .withArgs(`${ROLE}`, nonAdmin.address, nonAdmin.address);

          expect(
            await instance.callStatic['hasRole(bytes32,address)'](
              `${ROLE}`,
              nonAdmin.address,
            ),
          ).to.equal(false);
        });

        it('a role can be renounced multiple times', async function () {
          await instance
            .connect(nonAdmin)
            .renounceRole(`${ROLE}`, nonAdmin.address);

          const trx = await instance
            .connect(nonAdmin)
            .renounceRole(`${ROLE}`, nonAdmin.address);
          const receipt = await trx.wait();
          expect(receipt.events?.length).to.equal(0);
        });
      });
    });
  });
}
