import { ethers } from 'hardhat';
import { describeBehaviorOfSafeOwnable } from '@solidstate/spec/access/SafeOwnable.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { SafeOwnableMock, SafeOwnableMock__factory } from '../../typechain';

describe('SafeOwnable', function () {
  let owner: SignerWithAddress;
  let nomineeOwner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
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
      getOwner: async () => owner,
      getNomineeOwner: async () => nomineeOwner,
      getNonOwner: async () => nonOwner,
    },
    [],
  );
});
