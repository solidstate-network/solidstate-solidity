import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { seedToStorageSlot } from '@solidstate/library/storage_layout';
import {
  __hh_exposed_StorageUtils,
  __hh_exposed_StorageUtils__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('StorageUtils', () => {
  let deployer: HardhatEthersSigner;
  let instance: __hh_exposed_StorageUtils;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_StorageUtils__factory(deployer).deploy();
  });

  describe('#read(uint256)', () => {
    it('reads data from arbitrary storage slot', async () => {
      const slot = ethers.hexlify(ethers.randomBytes(32));
      const data = ethers.ZeroHash;

      expect(await instance.__hh_exposed_read.staticCall(slot)).to.equal(data);
    });
  });

  describe('#write(uint256,bytes32)', () => {
    it('updates arbitrary storage data', async () => {
      const slot = seedToStorageSlot('solidstate.contracts.storage.Ownable');
      const data = ethers.zeroPadValue(deployer.address, 32);

      expect(await instance.__hh_exposed_read.staticCall(slot)).to.equal(
        ethers.ZeroHash,
      );

      await instance.__hh_exposed_write(slot, data);

      expect(await instance.__hh_exposed_read.staticCall(slot)).to.equal(data);
    });
  });
});
