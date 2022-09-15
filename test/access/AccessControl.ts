import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfAccessControl } from '@solidstate/spec';
import {
  AccessControlMock,
  AccessControlMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const OTHER_ROLE = ethers.utils.solidityKeccak256(['string'], ['OTHER_ROLE']);

describe('AccessControl', function () {
  let admin: SignerWithAddress;
  let authorized: SignerWithAddress;
  let other: SignerWithAddress;
  let otherAdmin: SignerWithAddress;
  let otherAuthorized: SignerWithAddress;
  let instance: AccessControlMock;

  before(async function () {
    [admin, authorized, other, otherAdmin, otherAuthorized] =
      await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await new AccessControlMock__factory(admin).deploy(
      admin.address,
    );
  });

  describeBehaviorOfAccessControl({
    deploy: async () => instance as any,
    getAdmin: async () => admin,
    getAuthorized: async () => authorized,
    getOther: async () => other,
    getOtherAdmin: async () => otherAdmin,
    getOtherAuthorized: async () => otherAuthorized,
  });

  describe('#checkRole(bytes32)', function () {
    beforeEach(async function () {
      this.receipt = await instance
        .connect(admin)
        .grantRole(`${OTHER_ROLE}`, authorized.address);
    });

    it('should able to call checkRole', async function () {
      expect(await instance.connect(authorized).checkRole(OTHER_ROLE)).to.equal(
        true,
      );
    });

    it('revert when no access', async function () {
      await expect(
        instance.connect(other).checkRole(OTHER_ROLE),
      ).to.revertedWith(
        `AccessControl: account ${other.address.toLowerCase()} is missing role ${OTHER_ROLE}`,
      );
    });
  });
});
