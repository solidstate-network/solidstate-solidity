import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { seedToStorageSlot } from '@solidstate/library/storage_layout';
import {
  $StorageSlot,
  $StorageSlot__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('StorageSlot', () => {
  let deployer: HardhatEthersSigner;
  let instance: $StorageSlot;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    instance = await new $StorageSlot__factory(deployer).deploy();
  });

  describe('#calculateErc7201Slot(string)', () => {
    it('calculates storage slot using "erc7201" formula', async () => {
      expect(await instance.$calculateErc7201Slot('example.main')).to.equal(
        '0x183a6125c38840424c4a85fa12bab2ab606c4b6d0e7cc73c0c06ba5300eab500',
      );
    });
  });

  describe('#index(uint256)', () => {
    it('returns the slot of an index of an array declared at the current slot', async () => {
      const slot = ethers.hexlify(ethers.randomBytes(32));

      const indexZero = await instance.$index.staticCall(slot, 0n);

      expect(indexZero).to.eq(ethers.keccak256(slot));

      for (let i = 1n; i < 3n; i++) {
        expect(await instance.$index.staticCall(slot, i)).to.eq(
          BigInt(indexZero) + i,
        );
      }
    });
  });

  describe('#map(uint256)', () => {
    it('returns the slot of a value of a mapping declared at the current slot', async () => {
      const slot = ethers.hexlify(ethers.randomBytes(32));
      const key = ethers.hexlify(ethers.randomBytes(32));

      expect(await instance.$map.staticCall(slot, key)).to.eq(
        ethers.keccak256(ethers.concat([key, slot])),
      );
    });
  });

  describe('#next()', () => {
    it('returns next slot', async () => {
      const slot = ethers.hexlify(ethers.randomBytes(32));

      expect(await instance['$next(bytes32)'].staticCall(slot)).to.eq(
        BigInt(slot) + 1n,
      );
    });
  });

  describe('#next(uint256)', () => {
    it('returns slot incremented by input amount', async () => {
      const slot = ethers.hexlify(ethers.randomBytes(32));

      for (let i = 0n; i < 3n; i++) {
        expect(
          await instance['$next(bytes32,uint256)'].staticCall(slot, i),
        ).to.eq(BigInt(slot) + i);
      }
    });
  });

  describe('#prev()', () => {
    it('returns previous slot', async () => {
      const slot = ethers.hexlify(ethers.randomBytes(32));

      expect(await instance['$prev(bytes32)'].staticCall(slot)).to.eq(
        BigInt(slot) - 1n,
      );
    });
  });

  describe('#prev(uint256)', () => {
    it('returns slot decremented by input amount', async () => {
      const slot = ethers.hexlify(ethers.randomBytes(32));

      for (let i = 0n; i < 3n; i++) {
        expect(
          await instance['$prev(bytes32,uint256)'].staticCall(slot, i),
        ).to.eq(BigInt(slot) - i);
      }
    });
  });

  describe('#read()', () => {
    it('reads bytes32 data from arbitrary storage slot', async () => {
      const slot = ethers.hexlify(ethers.randomBytes(32));
      const data = ethers.ZeroHash;

      expect(await instance.$read.staticCall(slot)).to.equal(data);
    });
  });

  describe('#write(bytes32)', () => {
    it('writes bytes32 data to arbitrary storage slot', async () => {
      const slot = seedToStorageSlot('solidstate.layout.Ownable');
      const data = ethers.zeroPadValue(deployer.address, 32);

      expect(await instance.$read.staticCall(slot)).to.equal(ethers.ZeroHash);

      await instance.$write(slot, data);

      expect(await instance.$read.staticCall(slot)).to.equal(data);
    });
  });

  describe('#clear()', () => {
    it('clears data from arbitrary storage slot', async () => {
      const slot = seedToStorageSlot('solidstate.layout.Ownable');
      const data = ethers.zeroPadValue(deployer.address, 32);

      await instance.$write(slot, data);

      await instance.$clear(slot);

      expect(await instance.$read.staticCall(slot)).to.equal(ethers.ZeroHash);
    });
  });
});
