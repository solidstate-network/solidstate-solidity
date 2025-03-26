import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { seedToStorageSlot } from '@solidstate/library/storage_layout';
import { $Slot, $Slot__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Slot', () => {
  let deployer: HardhatEthersSigner;
  let instance: $Slot;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $Slot__factory(deployer).deploy();
  });

  // TODO: test transient functions
  // TODO: how to disambiguate internal types in test headers?

  describe('#read(uint256)', () => {
    it('reads bytes32 data from arbitrary storage slot', async () => {
      const slot = ethers.hexlify(ethers.randomBytes(32));
      const data = ethers.ZeroHash;

      expect(await instance.$read_Slot_StorageSlot.staticCall(slot)).to.equal(
        data,
      );
    });
  });

  describe('#write(uint256,bytes32)', () => {
    it('writes bytes32 data to arbitrary storage slot', async () => {
      const slot = seedToStorageSlot('solidstate.contracts.storage.Ownable');
      const data = ethers.zeroPadValue(deployer.address, 32);

      expect(await instance.$read_Slot_StorageSlot.staticCall(slot)).to.equal(
        ethers.ZeroHash,
      );

      await instance.$write_Slot_StorageSlot(slot, data);

      expect(await instance.$read_Slot_StorageSlot.staticCall(slot)).to.equal(
        data,
      );
    });
  });
});
