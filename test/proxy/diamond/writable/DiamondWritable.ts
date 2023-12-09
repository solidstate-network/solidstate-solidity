import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfDiamondWritable } from '@solidstate/spec';
import {
  DiamondWritableMock,
  DiamondWritableMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('DiamondWritable', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: DiamondWritableMock;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new DiamondWritableMock__factory(deployer).deploy();
  });

  describeBehaviorOfDiamondWritable(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
    immutableSelectors: [],
  });
});
