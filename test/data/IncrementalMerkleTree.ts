import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic';
import {
  $IncrementalMerkleTree,
  $IncrementalMerkleTree__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';

// data structures can be defined at any storage slot
// it doesn't matter which slot is used as long as it's consistent
const STORAGE_SLOT = 0n;

const randomHash = () => ethers.hexlify(ethers.randomBytes(32));

describe('IncrementalMerkleTree', () => {
  let instance: $IncrementalMerkleTree;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new $IncrementalMerkleTree__factory(deployer).deploy();
  });

  describe('#size', () => {
    it('returns number of elements in tree', async () => {
      expect(await instance.$size.staticCall(STORAGE_SLOT)).to.equal(0);

      for (let i = 1; i < 10; i++) {
        await instance.$push(STORAGE_SLOT, randomHash());

        expect(await instance.$size.staticCall(STORAGE_SLOT)).to.equal(i);
      }
    });
  });

  describe('#height', () => {
    it('returns zero-indexed height of tree', async () => {
      for (let i = 0; i < 10; i++) {
        await instance.$push(STORAGE_SLOT, randomHash());

        const size = await instance.$size.staticCall(STORAGE_SLOT);

        expect(await instance.$height.staticCall(STORAGE_SLOT)).to.equal(
          Math.ceil(Math.log2(Number(size))),
        );
      }
    });

    describe('reverts if', () => {
      it('tree size is zero', async () => {
        // TODO: reason
        await expect(instance.$height.staticCall(STORAGE_SLOT)).to.be.reverted;
      });
    });
  });

  describe('#root', () => {
    it('returns contained element for tree of size one', async () => {
      const hash = randomHash();

      await instance.$push(STORAGE_SLOT, hash);

      expect(await instance.$root.staticCall(STORAGE_SLOT)).to.equal(hash);
    });

    it('returns Merkle root derived from elements contained in balanced tree', async () => {
      const hash_a = randomHash();
      const hash_b = randomHash();

      const hash = ethers.solidityPackedKeccak256(
        ['bytes32', 'bytes32'],
        [hash_a, hash_b],
      );

      await instance.$push(STORAGE_SLOT, hash_a);
      await instance.$push(STORAGE_SLOT, hash_b);

      expect(await instance.$root.staticCall(STORAGE_SLOT)).to.equal(hash);
    });

    it('returns Merkle root derived from elements contained in unbalanced tree', async () => {
      const hash_a = randomHash();
      const hash_b = randomHash();
      const hash_c = randomHash();

      const hash_ab = ethers.solidityPackedKeccak256(
        ['bytes32', 'bytes32'],
        [hash_a, hash_b],
      );

      const hash = ethers.solidityPackedKeccak256(
        ['bytes32', 'bytes32'],
        [hash_ab, hash_c],
      );

      await instance.$push(STORAGE_SLOT, hash_a);
      await instance.$push(STORAGE_SLOT, hash_b);
      await instance.$push(STORAGE_SLOT, hash_c);

      expect(await instance.$root.staticCall(STORAGE_SLOT)).to.equal(hash);
    });

    it('returns result matching reference implementation regardless of previous operations', async () => {
      const count = 5;
      const hashes: string[] = [];

      for (let i = 0; i < count; i++) {
        hashes.push(randomHash());
        await instance.$push(STORAGE_SLOT, hashes[i]);
      }

      for (let i = 0; i < count; i++) {
        await instance.$push(STORAGE_SLOT, randomHash());
      }

      for (let i = 0; i < count; i++) {
        await instance.$pop(STORAGE_SLOT);
      }

      for (let i = 0; i < count; i++) {
        hashes.push(randomHash());
        await instance.$push(STORAGE_SLOT, hashes[count + i]);

        const tree = new MerkleTree(hashes, keccak256);

        expect(await instance.$root.staticCall(STORAGE_SLOT)).to.equal(
          tree.getHexRoot(),
        );
      }
    });

    describe('reverts if', () => {
      it('tree size is zero', async () => {
        // TODO: reason
        await expect(instance.$root.staticCall(STORAGE_SLOT)).to.be.reverted;
      });
    });
  });

  describe('#at', () => {
    it('returns element at given index', async () => {
      const hash = randomHash();

      await instance.$push(STORAGE_SLOT, hash);

      expect(await instance.$at.staticCall(STORAGE_SLOT, 0)).to.equal(hash);
    });

    describe('reverts if', () => {
      it('tree is size zero', async () => {
        await expect(
          instance.$at.staticCall(STORAGE_SLOT, 0),
        ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
      });

      it('index is out of bounds', async () => {
        await instance.$push(STORAGE_SLOT, randomHash());

        await expect(
          instance.$at.staticCall(STORAGE_SLOT, 1),
        ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
      });
    });
  });

  describe('#push', () => {
    it('updates Merkle root', async () => {
      const hashes: string[] = [];

      for (let i = 0; i < 10; i++) {
        hashes.push(ethers.zeroPadValue(ethers.toBeHex(i + 1), 32));
      }

      for (let i = 0; i < hashes.length; i++) {
        await instance.$push(STORAGE_SLOT, hashes[i]);

        const tree = new MerkleTree(hashes.slice(0, i + 1), keccak256);

        expect(await instance.$root.staticCall(STORAGE_SLOT)).to.equal(
          tree.getHexRoot(),
        );
      }
    });
  });

  describe('#pop', () => {
    it('updates Merkle root', async () => {
      const hashes: string[] = [];

      for (let i = 0; i < 10; i++) {
        hashes.push(ethers.zeroPadValue(ethers.toBeHex(i + 1), 32));
        await instance.$push(STORAGE_SLOT, hashes[i]);
      }

      for (let i = 0; i < hashes.length - 1; i++) {
        await instance.$pop(STORAGE_SLOT);

        const tree = new MerkleTree(
          hashes.slice(0, hashes.length - 1 - i),
          keccak256,
        );

        expect(await instance.$root.staticCall(STORAGE_SLOT)).to.equal(
          tree.getHexRoot(),
        );
      }
    });

    describe('reverts if', () => {
      it('tree is size zero', async () => {
        // TODO: ...
        // await expect(instance.$pop(STORAGE_SLOT)).to.be.revertedWithPanic(
        //   PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS,
        // );
        await expect(instance.$pop(STORAGE_SLOT)).to.be.reverted;
      });
    });
  });

  describe('#set', () => {
    it('updates Merkle root', async () => {
      const hashes: string[] = [];

      for (let i = 0; i < 4; i++) {
        hashes.push(ethers.zeroPadValue(ethers.toBeHex(i + 1), 32));
        await instance.$push(STORAGE_SLOT, hashes[i]);
      }

      for (let i = 0; i < hashes.length; i++) {
        const hash = randomHash();

        hashes[i] = hash;
        await instance.$set(STORAGE_SLOT, i, hash);

        const tree = new MerkleTree(hashes, keccak256);

        expect(await instance.$root.staticCall(STORAGE_SLOT)).to.equal(
          tree.getHexRoot(),
        );
      }
    });

    describe('reverts if', () => {
      it('index is out of bounds', async () => {
        await expect(
          instance.$set.staticCall(STORAGE_SLOT, 0, ethers.ZeroHash),
        ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);

        await instance.$push(STORAGE_SLOT, ethers.ZeroHash);

        await expect(
          instance.$set.staticCall(STORAGE_SLOT, 1, ethers.ZeroHash),
        ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
      });
    });
  });
});
