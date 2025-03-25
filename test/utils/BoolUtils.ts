import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  $BoolUtils,
  $BoolUtils__factory,
  BoolUtilsTest__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('BoolUtils', async () => {
  let instance: $BoolUtils;
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $BoolUtils__factory(deployer).deploy();
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

      it('sanitizes higher-order bits', async () => {
        const testInstance = await new BoolUtilsTest__factory(
          deployer,
        ).deploy();

        expect(
          await testInstance.sanitizeBytes32Test.staticCall(false),
        ).to.hexEqual('0x00');
        expect(
          await testInstance.sanitizeBytes32Test.staticCall(true),
        ).to.hexEqual('0x01');
      });
    });
  });
});
