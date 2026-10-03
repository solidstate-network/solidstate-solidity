import { PANIC_CODES } from '@nomicfoundation/hardhat-ethers-chai-matchers/panic';
import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/types';
import { type $Panic, $Panic__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { network } from 'hardhat';

const connection = await network.create();

describe('Panic', async () => {
  let instance: $Panic;
  let deployer: HardhatEthersSigner;

  beforeEach(async () => {
    [deployer] = await connection.ethers.getSigners();
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
