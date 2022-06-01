import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfOwnable } from '@solidstate/spec';
import { OwnableMock, OwnableMock__factory } from '@solidstate/typechain-types';
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

  describeBehaviorOfOwnable({
    deploy: async () => instance,
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });
});
