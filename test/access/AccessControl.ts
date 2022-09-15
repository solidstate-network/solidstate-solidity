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

  describe('#checkRole(bytes32)', function () {
    it('should able to call checkRole', async function () {
      await instance
        .connect(admin)
        .grantRole(`${OTHER_ROLE}`, nonAdmin.address);

      expect(await instance.connect(nonAdmin).checkRole(OTHER_ROLE)).to.equal(
        true,
      );
    });

    describe('reverts if', function () {
      it('sender does not have role', async function () {
        await expect(
          instance.connect(nonAdmin).checkRole(OTHER_ROLE),
        ).to.revertedWith(
          `AccessControl: account ${nonAdmin.address.toLowerCase()} is missing role ${OTHER_ROLE}`,
        );
      });
    });
  });
});
