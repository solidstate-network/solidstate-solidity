import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfAccessControl } from '@solidstate/spec';
import {
  AccessControlMock,
  AccessControlMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const ROLE = ethers.utils.solidityKeccak256(['string'], ['ROLE']);

describe('AccessControl', function () {
  let admin: SignerWithAddress;
  let nonAdmin: SignerWithAddress;
  let instance: AccessControlMock;

  before(async function () {
    [admin, nonAdmin] = await ethers.getSigners();
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
        instance.connect(nonAdmin).callStatic['checkRole(bytes32)'](ROLE),
      ).not.to.be.reverted;
    });

    describe('reverts if', function () {
      it('sender does not have role', async function () {
        await expect(
          instance.connect(nonAdmin).callStatic['checkRole(bytes32)'](ROLE),
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
        instance.callStatic['checkRole(bytes32,address)'](
          ROLE,
          nonAdmin.address,
        ),
      ).not.to.be.reverted;
    });

    describe('reverts if', function () {
      it('given account does not have role', async function () {
        await expect(
          instance.callStatic['checkRole(bytes32,address)'](
            ROLE,
            nonAdmin.address,
          ),
        ).to.revertedWith(
          `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${ROLE}`,
        );
      });
    });
  });
});
