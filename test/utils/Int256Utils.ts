import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  $Int256Utils,
  $Int256Utils__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Int256Utils', async () => {
  let instance: $Int256Utils;
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $Int256Utils__factory(deployer).deploy();
  });

  describe('__internal', () => {
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
});
