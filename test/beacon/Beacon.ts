import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { describeBehaviorOfBeacon } from '@solidstate/spec';
import { type $Beacon, $Beacon__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { network } from 'hardhat';

const connection = await network.create();

describe('Beacon', () => {
  let owner: HardhatEthersSigner;
  let nonOwner: HardhatEthersSigner;
  let instance: $Beacon;

  before(async () => {
    [owner, nonOwner] = await connection.ethers.getSigners();
  });

  beforeEach(async () => {
    const [deployer] = await connection.ethers.getSigners();

    instance = await new $Beacon__factory(deployer).deploy();

    await instance.$_setOwner(await owner.getAddress());
  });

  describeBehaviorOfBeacon(connection, async () => instance, {
    getOwner: async () => owner,
    getNonOwner: async () => nonOwner,
  });
});
