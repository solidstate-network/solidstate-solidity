import { AccessControl } from '../../typechain';
import { describeBehaviorOfERC165 } from '../introspection';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeFilter } from '@solidstate/library';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import * as web3 from 'web3-utils';

const { expectEvent } = require('@openzeppelin/test-helpers');

const DEFAULT_ADMIN_ROLE =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
const ROLE = web3.soliditySha3('ROLE');
const OTHER_ROLE = web3.soliditySha3('OTHER_ROLE');

interface AccessControlBehaviorArgs {
  deploy: () => Promise<AccessControl>;
  getAdmin: () => Promise<SignerWithAddress>;
  getAuthorized: () => Promise<SignerWithAddress>;
  getOther: () => Promise<SignerWithAddress>;
  getOtherAdmin(): Promise<SignerWithAddress>;
  getOtherAuthorized(): Promise<SignerWithAddress>;
}

export function describeBehaviorOfAccessControl(
  {
    deploy,
    getAdmin,
    getAuthorized,
    getOther,
    getOtherAdmin,
    getOtherAuthorized,
  }: AccessControlBehaviorArgs,
  skips?: string[],
) {
  const describe = describeFilter(skips);

  describe('::AccessControl', function () {
    let instance: AccessControl;
    let admin: SignerWithAddress;
    let authorized: SignerWithAddress;
    let other: SignerWithAddress;
    let otherAdmin: SignerWithAddress;
    let otherAuthorized: SignerWithAddress;

    beforeEach(async function () {
      instance = await deploy();
      admin = await getAdmin();
      authorized = await getAuthorized();
      other = await getOther();
      otherAdmin = await getOtherAdmin();
      otherAuthorized = await getOtherAuthorized();
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
        await instance.connect(admin).grantRole(`${ROLE}`, authorized.address);
        expect(
          await instance.callStatic['hasRole(bytes32,address)'](
            `${ROLE}`,
            authorized.address,
          ),
        ).to.equal(true);
      });
      it('emits RoleGranted event', async function () {
        await expect(
          instance.connect(admin).grantRole(`${ROLE}`, authorized.address),
        ).to.emit(instance, 'RoleGranted');
      });
      it('accounts can be granted a role multiple times', async function () {
        await instance.connect(admin).grantRole(`${ROLE}`, authorized.address);
        const trx = await instance
          .connect(admin)
          .grantRole(`${ROLE}`, authorized.address);
        const receipt = await trx.wait();
        expectEvent.notEmitted(receipt, 'RoleGranted');
      });
    });
    describe('#revokeRole(bytes32, address)', function () {
      beforeEach(async function () {
        this.receipt = await instance
          .connect(admin)
          .grantRole(`${ROLE}`, authorized.address);
      });
      it('admin can revoke role', async function () {
        await instance.connect(admin).revokeRole(`${ROLE}`, authorized.address);
        expect(
          await instance.callStatic['hasRole(bytes32,address)'](
            `${ROLE}`,
            authorized.address,
          ),
        ).to.equal(false);
      });
    });
    describe('#renounceRole(bytes32, address)', function () {
      beforeEach(async function () {
        this.receipt = await instance
          .connect(admin)
          .grantRole(`${ROLE}`, authorized.address);
      });
      it('bearer can renounce role', async function () {
        await expect(
          instance
            .connect(authorized)
            .renounceRole(`${ROLE}`, authorized.address),
        )
          .to.emit(instance, 'RoleRevoked')
          .withArgs(`${ROLE}`, authorized.address, authorized.address);

        expect(
          await instance.callStatic['hasRole(bytes32,address)'](
            `${ROLE}`,
            authorized.address,
          ),
        ).to.equal(false);
      });
      it('a role can be renounced multiple times', async function () {
        await instance
          .connect(authorized)
          .renounceRole(`${ROLE}`, authorized.address);

        const trx = await instance
          .connect(authorized)
          .renounceRole(`${ROLE}`, authorized.address);
        const receipt = await trx.wait();
        expectEvent.notEmitted(receipt, 'RoleRevoked');
      });
    });
    describe('reverts if', function () {
      it('non-admin cannot grant role to other accounts', async function () {
        await instance.connect(admin).grantRole(`${ROLE}`, authorized.address);
        await expect(
          instance.connect(authorized).grantRole(`${ROLE}`, authorized.address),
        ).to.be.revertedWith(
          `AccessControl: account ${authorized.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`,
        );
      });
      it('non-admin cannot revoke role', async function () {
        await instance.connect(admin).grantRole(`${ROLE}`, authorized.address);
        await expect(
          instance
            .connect(authorized)
            .revokeRole(`${ROLE}`, authorized.address),
        ).to.be.revertedWith(
          `AccessControl: account ${authorized.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`,
        );
      });
    });
  });
}
