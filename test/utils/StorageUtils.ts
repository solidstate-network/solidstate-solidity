import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { seedToStorageSlot } from '@solidstate/library/storage_layout';
import {
  $StorageUtils,
  $StorageUtils__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('StorageUtils', () => {
  let deployer: HardhatEthersSigner;
  let instance: $StorageUtils;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $StorageUtils__factory(deployer).deploy();
  });

  describe('#calculateStorageSlot(string)', () => {
    it('calculates storage slot using "erc7201" formula', async () => {
      expect(await instance.$calculateStorageSlot('example.main')).to.equal(
        '0x183a6125c38840424c4a85fa12bab2ab606c4b6d0e7cc73c0c06ba5300eab500',
      );
    });
  });

  describe('#read(uint256)', () => {
    it('reads data from arbitrary storage slot', async () => {
      const slot = ethers.hexlify(ethers.randomBytes(32));
      const data = ethers.ZeroHash;

      expect(await instance.$read.staticCall(slot)).to.equal(data);
    });
  });

  describe('#write(uint256,bytes32)', () => {
    it('updates arbitrary storage data', async () => {
      const slot = seedToStorageSlot('solidstate.layout.Ownable');
      const data = ethers.zeroPadValue(deployer.address, 32);

      expect(await instance.$read.staticCall(slot)).to.equal(ethers.ZeroHash);

      await instance.$write(slot, data);

      expect(await instance.$read.staticCall(slot)).to.equal(data);
    });
  });
});
