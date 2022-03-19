import {
  DiamondCuttableMock,
  DiamondCuttableMock__factory,
} from '../../../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfDiamondCuttable } from '@solidstate/spec';
import { ethers } from 'hardhat';

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

  describeBehaviorOfDiamondCuttable({
    deploy: async () => instance as any,
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });
});
