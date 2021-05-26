import { ethers } from 'hardhat';
import { describeBehaviorOfOwnable } from '../../spec/access/Ownable.behavior';
import { OwnableMock__factory } from '../../typechain';

let getOwner = async function () {
  let [signer] = await ethers.getSigners();
  return signer;
};

let getNonOwner = async function () {
  let [, signer] = await ethers.getSigners();
  return signer;
};

let deploy = async function () {
  const owner = await getOwner();
  return new OwnableMock__factory(owner).deploy(owner.address);
};

describe('Ownable', function () {
  describeBehaviorOfOwnable(
    {
      deploy,
      getOwner,
      getNonOwner,
    },
    [],
  );
});
