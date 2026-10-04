import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { type $Block, $Block__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { network } from 'hardhat';

const connection = await network.create();

describe('Block', async () => {
  let deployer: HardhatEthersSigner;
  let instance: $Block;

  before(async () => {
    [deployer] = await connection.ethers.getSigners();
    instance = await new $Block__factory(deployer).deploy();
  });

  describe('#timestamp()', () => {
    it('returns current timestamp', async () => {
      const timestamp = BigInt(await connection.networkHelpers.time.latest());

      expect(await instance.$timestamp.staticCall()).to.eq(timestamp);
    });
  });
});
