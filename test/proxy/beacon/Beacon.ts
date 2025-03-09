import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfBeacon } from '@solidstate/spec';
import {
  __hh_exposed_Beacon,
  __hh_exposed_Beacon__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Beacon', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: __hh_exposed_Beacon;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    instance = await new __hh_exposed_Beacon__factory(deployer).deploy();

    await instance.__hh_exposed__setOwner(await owner.getAddress());
  });

  describeBehaviorOfBeacon(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });
});
