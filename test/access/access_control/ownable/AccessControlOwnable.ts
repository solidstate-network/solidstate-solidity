import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  $AccessControlOwnable,
  $AccessControlOwnable__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const DEFAULT_ADMIN_ROLE = ethers.ZeroHash;

describe('AccessControlOwnable', () => {
  let defaultAdmin: SignerWithAddress;
  let nonAdmin: SignerWithAddress;
  let nonAdmin2: SignerWithAddress;
  let nonAdmin3: SignerWithAddress;
  let instance: $AccessControlOwnable;

  before(async () => {
    [defaultAdmin, nonAdmin, nonAdmin2, nonAdmin3] = await ethers.getSigners();
  });

  beforeEach(async () => {
    instance = await new $AccessControlOwnable__factory(defaultAdmin).deploy();

    await instance.$_setRole(
      DEFAULT_ADMIN_ROLE,
      await defaultAdmin.getAddress(),
      true,
    );
  });

  describe('#grantRole(bytes32,address)', () => {
    it('allows the default admin to grant roles', async () => {
      await instance
        .connect(defaultAdmin)
        .grantRole(ethers.id('ROLE'), nonAdmin.address);
      expect(
        await instance.hasRole(ethers.id('ROLE'), nonAdmin.address),
      ).to.equal(true);
    });

    describe('reverts if', () => {
      it('sender is not default admin', async () => {
        await expect(
          instance
            .connect(nonAdmin)
            .grantRole(ethers.id('ROLE'), nonAdmin.address),
        )
          .to.be.revertedWithCustomError(
            instance,
            'AccessControl__Unauthorized',
          )
          .withArgs(DEFAULT_ADMIN_ROLE, await nonAdmin.getAddress());
      });
    });
  });

  describe('#revokeRole(bytes32,address)', () => {
    it('allows the default admin to revoke roles', async () => {
      await instance
        .connect(defaultAdmin)
        .grantRole(ethers.id('ROLE'), nonAdmin.address);
      await instance
        .connect(defaultAdmin)
        .revokeRole(ethers.id('ROLE'), nonAdmin.address);
      expect(
        await instance.hasRole(ethers.id('ROLE'), nonAdmin.address),
      ).to.equal(false);
    });

    describe('reverts if', () => {
      it('sender is not default admin', async () => {
        await expect(
          instance
            .connect(nonAdmin)
            .grantRole(ethers.id('ROLE'), nonAdmin.address),
        )
          .to.be.revertedWithCustomError(
            instance,
            'AccessControl__Unauthorized',
          )
          .withArgs(DEFAULT_ADMIN_ROLE, await nonAdmin.getAddress());
      });
    });
  });
});
