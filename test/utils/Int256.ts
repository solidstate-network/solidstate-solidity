import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { type $Int256, $Int256__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'ethers';
import { network } from 'hardhat';

const connection = await network.create();

describe('Int256', async () => {
  let instance: $Int256;
  let deployer: HardhatEthersSigner;

  beforeEach(async () => {
    [deployer] = await connection.ethers.getSigners();
    instance = await new $Int256__factory(deployer).deploy();
  });

  describe('#toBytes32(int256)', () => {
    it('returns a bytes32 representation of int256', async () => {
      expect(await instance.$toBytes32.staticCall(0n)).to.eq(ethers.ZeroHash);

      expect(await instance.$toBytes32.staticCall(-1n)).to.eq(
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      );

      expect(await instance.$toBytes32.staticCall(ethers.MinInt256)).to.eq(
        '0x8000000000000000000000000000000000000000000000000000000000000000',
      );

      expect(await instance.$toBytes32.staticCall(ethers.MaxInt256)).to.eq(
        '0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      );
    });
  });
});
