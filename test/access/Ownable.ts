import { ethers } from 'hardhat';
import { describeBehaviorOfOwnable } from '@solidstate/spec';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { OwnableMock, OwnableMock__factory } from '@solidstate/typechain';

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

  describeBehaviorOfOwnable(
    {
      deploy: async () => instance,
      getOwner: async () => owner,
      getNonOwner: async () => nonOwner,
    },
    [],
  );
});
