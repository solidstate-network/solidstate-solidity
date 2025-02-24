import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfBeacon } from '@solidstate/spec';
import { BeaconMock, BeaconMock__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Beacon', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: BeaconMock;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    instance = await new BeaconMock__factory(deployer).deploy(
      await owner.getAddress(),
    );
  });

  describeBehaviorOfBeacon(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });
});
