import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfOwnable } from '@solidstate/spec';
import { OwnableMock, OwnableMock__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { deployMockContract } from 'ethereum-waffle';
import { ethers } from 'hardhat';

describe('Ownable', function () {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: OwnableMock;

  before(async function () {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await new OwnableMock__factory(owner).deploy(owner.address);
  });

  describeBehaviorOfOwnable(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });

  describe('__internal', () => {
    describe('#_transitiveOwner()', () => {
      it('returns owner if owner is EOA', async () => {
        expect(await instance.callStatic.__transitiveOwner()).to.equal(
          owner.address,
        );
      });

      it('returns owner if owner is not Ownable', async () => {
        const ownerInstance = await deployMockContract(owner, []);

        await instance.setOwner(ownerInstance.address);

        expect(await instance.callStatic.__transitiveOwner()).to.equal(
          ownerInstance.address,
        );
      });

      it('returns transitive owner', async () => {
        const secondOwnerInstance = await new OwnableMock__factory(
          owner,
        ).deploy(owner.address);

        const firstOwnerInstance = await new OwnableMock__factory(owner).deploy(
          secondOwnerInstance.address,
        );

        await instance.setOwner(firstOwnerInstance.address);

        expect(await instance.callStatic.__transitiveOwner()).to.equal(
          owner.address,
        );
      });
    });
  });
});
