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

  describe('#readStorage(uint256)', () => {
    it('reads bytes32 data from arbitrary storage slot', async () => {
      const slot = ethers.hexlify(ethers.randomBytes(32));
      const data = ethers.ZeroHash;

      expect(await instance.$readStorage.staticCall(slot)).to.equal(data);
    });
  });

  describe('#write(uint256,bytes32)', () => {
    it('writes bytes32 data to arbitrary storage slot', async () => {
      const slot = seedToStorageSlot('solidstate.contracts.storage.Ownable');
      const data = ethers.zeroPadValue(deployer.address, 32);

      expect(await instance.$readStorage.staticCall(slot)).to.equal(
        ethers.ZeroHash,
      );

      await instance['$writeStorage(bytes32,bytes32)'](slot, data);

      expect(await instance.$readStorage.staticCall(slot)).to.equal(data);
    });
  });
});
