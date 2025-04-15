import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { $Block, $Block__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Block', async () => {
  let deployer: SignerWithAddress;
  let instance: $Block;

  before(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $Block__factory(deployer).deploy();
  });

  describe('#timestamp()', () => {
    it('returns current timestamp', async () => {
      const timestamp = BigInt(await time.latest());

      expect(await instance.$timestamp.staticCall()).to.eq(timestamp);
    });
  });
});
