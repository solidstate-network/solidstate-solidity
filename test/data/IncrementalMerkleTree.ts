import { PANIC_CODES } from '@nomicfoundation/hardhat-chai-matchers/panic';
import {
  IncrementalMerkleTreeMock,
  IncrementalMerkleTreeMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';

const randomHash = () => ethers.hexlify(ethers.randomBytes(32));

describe('IncrementalMerkleTree', () => {
  let instance: IncrementalMerkleTreeMock;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new IncrementalMerkleTreeMock__factory(deployer).deploy();
  });

  describe('#size', () => {
    it('returns number of elements in tree', async () => {
      expect(await instance.size.staticCall()).to.equal(0);

      for (let i = 1; i < 10; i++) {
        await instance.push(randomHash());

        expect(await instance.size.staticCall()).to.equal(i);
      }
    });
  });

  describe('#height', () => {
    it('returns one-indexed height of tree', async () => {
      expect(await instance.height.staticCall()).to.equal(0);

      for (let i = 1; i < 10; i++) {
        await instance.push(randomHash());

        expect(await instance.height.staticCall()).to.equal(
          Math.ceil(Math.log2(i) + 1),
        );
      }
    });
  });

  describe('#root', () => {
    it('returns zero bytes for tree of size zero', async () => {
      expect(await instance.root.staticCall()).to.equal(ethers.ZeroHash);
    });

    it('returns contained element for tree of size one', async () => {
      const hash = randomHash();

      await instance.push(hash);

      expect(await instance.root.staticCall()).to.equal(hash);
    });

    it('returns Merkle root derived from elements contained in balanced tree', async () => {
      const hash_a = randomHash();
      const hash_b = randomHash();

      const hash = ethers.solidityPackedKeccak256(
        ['bytes32', 'bytes32'],
        [hash_a, hash_b],
      );

      await instance.push(hash_a);
      await instance.push(hash_b);

      expect(await instance.root.staticCall()).to.equal(hash);
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

      await instance.push(hash_a);
      await instance.push(hash_b);
      await instance.push(hash_c);

      expect(await instance.root.staticCall()).to.equal(hash);
    });

    it('returns result matching reference implementation regardless of previous operations', async () => {
      const count = 5;
      const hashes = [];

      for (let i = 0; i < count; i++) {
        hashes.push(randomHash());
        await instance.push(hashes[i]);
      }

      for (let i = 0; i < count; i++) {
        await instance.push(randomHash());
      }

      for (let i = 0; i < count; i++) {
        await instance.pop();
      }

      for (let i = 0; i < count; i++) {
        hashes.push(randomHash());
        await instance.push(hashes[count + i]);

        const tree = new MerkleTree(hashes, keccak256);

        expect(await instance.root.staticCall()).to.equal(tree.getHexRoot());
      }
    });
  });

  describe('#at', () => {
    it('returns element at given index', async () => {
      const hash = randomHash();

      await instance.push(hash);

      expect(await instance.at.staticCall(0)).to.equal(hash);
    });

    describe('reverts if', () => {
      it('index is out of bounds', async () => {
        await expect(instance.at.staticCall(0)).to.be.revertedWithPanic(
          PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS,
        );
      });
    });
  });

  describe('#push', () => {
    it('updates Merkle root', async () => {
      const hashes = [];

      for (let i = 0; i < 10; i++) {
        hashes.push(randomHash());
      }

      for (let i = 0; i < hashes.length; i++) {
        await instance.push(hashes[i]);

        const tree = new MerkleTree(hashes.slice(0, i + 1), keccak256);

        expect(await instance.root.staticCall()).to.equal(tree.getHexRoot());
      }
    });
  });

  describe('#pop', () => {
    it('updates Merkle root', async () => {
      const hashes = [];

      for (let i = 0; i < 10; i++) {
        hashes.push(randomHash());
        await instance.push(hashes[i]);
      }

      for (let i = 0; i < hashes.length; i++) {
        await instance.pop();

        const tree = new MerkleTree(
          hashes.slice(0, hashes.length - 1 - i),
          keccak256,
        );

        // MerkleTree library returns truncated zero hash, so must use hexEqual matcher

        expect(await instance.root.staticCall()).to.hexEqual(tree.getHexRoot());
      }
    });

    describe('reverts if', () => {
      it('tree is size zero', async () => {
        await expect(instance.pop()).to.be.revertedWithPanic(
          PANIC_CODES.ARITHMETIC_UNDER_OR_OVERFLOW,
        );
      });
    });
  });

  describe('#set', () => {
    it('updates Merkle root', async () => {
      const hashes = [];

      for (let i = 0; i < 10; i++) {
        const hash = randomHash();
        hashes.push(hash);
        await instance.push(hash);
      }

      for (let i = 0; i < hashes.length; i++) {
        const hash = randomHash();

        hashes[i] = hash;
        await instance.set(i, hash);

        const tree = new MerkleTree(hashes, keccak256);

        expect(await instance.root.staticCall()).to.equal(tree.getHexRoot());
      }
    });

    describe('reverts if', () => {
      it('index is out of bounds', async () => {
        await expect(
          instance.set.staticCall(0, ethers.ZeroHash),
        ).to.be.revertedWithPanic(PANIC_CODES.ARRAY_ACCESS_OUT_OF_BOUNDS);
      });
    });
  });
});
