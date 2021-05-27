import { ethers } from 'hardhat';
import { describeBehaviorOfOwnable } from '@solidstate/spec/access/Ownable.behavior';
import { OwnableMock, OwnableMock__factory } from '../../typechain';

describe('Ownable', function () {
  let owner: any;
  let nonOwner: any;
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
      getOwner: () => owner,
      getNonOwner: () => nonOwner,
    },
    [],
  );
});
