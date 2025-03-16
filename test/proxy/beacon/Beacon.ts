import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfBeacon } from '@solidstate/spec';
import { $Beacon, $Beacon__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Beacon', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: $Beacon;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    instance = await new $Beacon__factory(deployer).deploy();

    await instance.$_setOwner(await owner.getAddress());
  });

  describeBehaviorOfBeacon(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });
});
