import { ethers } from 'hardhat';
import { describeBehaviorOfSafeOwnable } from '../../spec/access/SafeOwnable.behavior';
import { SafeOwnableMock, SafeOwnableMock__factory } from '../../typechain';

describe('SafeOwnable', function () {
  let owner: any;
  let nomineeOwner: any;
  let nonOwner: any;
  let instance: SafeOwnableMock;

  before(async function () {
    [owner, nomineeOwner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async function () {
    instance = await new SafeOwnableMock__factory(owner).deploy(owner.address);
  });

  describeBehaviorOfSafeOwnable(
    {
      deploy: async () => instance,
      getOwner: () => owner,
      getNomineeOwner: () => nomineeOwner,
      getNonOwner: () => nonOwner,
    },
    [],
  );
});
