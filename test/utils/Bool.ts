import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  $Bool,
  $Bool__factory,
  BoolTest__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Bool', async () => {
  let instance: $Bool;
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $Bool__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#toBytes32(bool)', () => {
      it('returns a bytes32 representation of bool', async () => {
        expect(await instance.$toBytes32.staticCall(true)).to.eq(
          ethers.zeroPadValue('0x01', 32),
        );

        expect(await instance.$toBytes32.staticCall(false)).to.eq(
          ethers.zeroPadValue('0x00', 32),
        );
      });

      it('sanitizes higher-order bits as true', async () => {
        const testInstance = await new BoolTest__factory(deployer).deploy();

        expect(
          await testInstance.sanitizeBytes32Test.staticCall(false),
        ).to.hexEqual('0x01');
        expect(
          await testInstance.sanitizeBytes32Test.staticCall(true),
        ).to.hexEqual('0x01');
      });
    });
  });
});
