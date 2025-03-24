import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  $Bytes32Utils,
  $Bytes32Utils__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Bytes32Utils', async () => {
  let instance: $Bytes32Utils;
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $Bytes32Utils__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#toString(bytes32)', () => {
      it('returns a hex string representation of bytes', async () => {
        const value = ethers.zeroPadValue(await deployer.getAddress(), 32);

        console.log(value);

        expect(await instance.$toString.staticCall(value)).to.eq(value);
      });
    });
  });
});
