import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { describeBehaviorOfDiamondWritable } from '@solidstate/spec';
import {
  __hh_exposed_DiamondWritable,
  __hh_exposed_DiamondWritable__factory,
} from '@solidstate/typechain-types';
import { ethers } from 'hardhat';

describe('DiamondWritable', () => {
  let owner: SignerWithAddress;
  let nonOwner: SignerWithAddress;
  let instance: __hh_exposed_DiamondWritable;

  before(async () => {
    [owner, nonOwner] = await ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_DiamondWritable__factory(
      deployer,
    ).deploy();

    await instance.__hh_exposed__setOwner(await deployer.getAddress());

    await instance.__hh_exposed__setSupportsInterface('0x01ffc9a7', true);
    await instance.__hh_exposed__setSupportsInterface('0x1f931c1c', true);
  });

  describeBehaviorOfDiamondWritable(async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
    immutableSelectors: [],
  });
});
