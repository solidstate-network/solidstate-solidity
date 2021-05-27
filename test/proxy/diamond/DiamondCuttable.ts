import { ethers } from 'hardhat';
import { describeBehaviorOfDiamondCuttable } from '@solidstate/spec/proxy/diamond/DiamondCuttable.behavior';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  DiamondCuttableMock,
  DiamondCuttableMock__factory,
} from '../../../typechain';

describe('DiamondCuttable', function () {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: DiamondCuttableMock;

  before(async function () {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new DiamondCuttableMock__factory(deployer).deploy();
  });

  describeBehaviorOfDiamondCuttable(
    {
      deploy: async () => instance,
      getOwner: async () => owner,
      getNonOwner: async () => nonOwner,
    },
    [],
  );
});
