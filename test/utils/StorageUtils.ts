import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { seedToStorageSlot } from '@solidstate/library/storage_layout';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('StorageUtils', () => {
  let deployer: HardhatEthersSigner;
  let instance: StorageUtilsMock;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new StorageUtilsMock__factory(deployer).deploy();
  });

  describe('#read(uint256)', () => {
    it('reads data from arbitrary storage slot', async () => {
      const slot = seedToStorageSlot('solidstate.contracts.storage.Ownable');
      const data = ethers.zeroPadValue(deployer.address, 32);

      expect(await instance.read.staticCall(slot)).to.equal(data);
    });
  });

  describe('#write(uint256,bytes32)', () => {
    it('updates arbitrary storage data', async () => {
      const slot = ethers.hexlify(ethers.randomBytes(32));
      const data = ethers.hexlify(ethers.randomBytes(32));

      expect(await instance.read.staticCall(slot)).to.equal(ethers.ZeroHash);

      await instance.write(slot, data);

      expect(await instance.read.staticCall(slot)).to.equal(data);
    });
  });
});
