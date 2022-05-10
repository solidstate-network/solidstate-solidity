import { AccessControlMock, AccessControlMock__factory } from '../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfAccessControl } from '@solidstate/spec';
import { ethers } from 'hardhat';

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
});
