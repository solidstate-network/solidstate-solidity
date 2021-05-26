import { ethers } from 'hardhat';
import { describeBehaviorOfDiamondCuttable } from '../../../spec/proxy/diamond/DiamondCuttable.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { DiamondCuttableMock__factory } from '../../../typechain';

let deploy = async function () {
  return new DiamondCuttableMock__factory().deploy();
};

describe('DiamondCuttable', function () {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;

  before(async function () {
    [owner, nonOwner] = await ethers.getSigners();
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  describeBehaviorOfDiamondCuttable(
    {
      deploy,
      getOwner: async () => owner,
      getNonOwner: async () => nonOwner,
    },
    [],
  );
});
