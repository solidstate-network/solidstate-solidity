import { describeBehaviorOfSafeOwnable } from '../../spec/access/SafeOwnable.behavior';
import { ethers } from 'hardhat';
import { SafeOwnableMock__factory } from '../../typechain';

let getOwner = async function () {
  let [signer] = await ethers.getSigners();
  return signer;
};

let getNomineeOwner = async function () {
  let [, signer] = await ethers.getSigners();
  return signer;
};

let getNonOwner = async function () {
  let [, , signer] = await ethers.getSigners();
  return signer;
};

let deploy = async function () {
  const owner = await getOwner();
  return new SafeOwnableMock__factory(owner).deploy(owner.address);
};

describe('SafeOwnable', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfSafeOwnable(
    {
      deploy,
      getOwner,
      getNomineeOwner,
      getNonOwner,
    },
    [],
  );
});
