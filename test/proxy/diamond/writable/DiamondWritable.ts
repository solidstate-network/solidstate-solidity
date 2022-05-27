import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { describeBehaviorOfDiamondWritable } from '@solidstate/spec';
import {
  DiamondWritableMock,
  DiamondWritableMock__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('DiamondWritable', function () {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: DiamondWritableMock;

  before(async function () {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new DiamondWritableMock__factory(deployer).deploy();
  });

  describeBehaviorOfDiamondWritable({
    deploy: async () => instance as any,
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });
});
