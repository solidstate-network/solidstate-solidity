import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { $Panic, $Panic__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Panic', async () => {
  let instance: $Panic;
  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $Panic__factory(deployer).deploy();
  });

  describe('#panic(uint256)', () => {
    it('reverts with panic', async () => {
      // generic code is not included in matcher library
      await expect(instance.$panic.staticCall(0)).to.be.revertedWithPanic(0);

      for (const code of Object.values(PANIC_CODES)) {
        await expect(instance.$panic.staticCall(code)).to.be.revertedWithPanic(
          code,
        );
      }
    });
  });
});
