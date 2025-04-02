import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { seedToStorageSlot } from '@solidstate/library/storage_layout';
import { $Storage, $Storage__factory } from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Storage', () => {
  let deployer: HardhatEthersSigner;
  let instance: $Storage;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $Storage__factory(deployer).deploy();
  });

  describe('#calculateErc7201StorageSlot(string)', () => {
    it('calculates storage slot using "erc7201" formula', async () => {
      expect(
        await instance.$calculateErc7201StorageSlot('example.main'),
      ).to.equal(
        '0x183a6125c38840424c4a85fa12bab2ab606c4b6d0e7cc73c0c06ba5300eab500',
      );
    });
  });
});
