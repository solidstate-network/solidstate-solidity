import {
  IncrementalMerkleTreeMock,
  IncrementalMerkleTreeMock__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';

describe('IncrementalMerkleTree', function () {
  let instance: IncrementalMerkleTreeMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new IncrementalMerkleTreeMock__factory(deployer).deploy();
  });

  describe('#size', () => {
    it('returns number of elements in tree', async () => {
      expect(await instance.callStatic.size()).to.equal(0);

      for (let i = 1; i < 10; i++) {
        await instance.push(ethers.utils.randomBytes(32));

        expect(await instance.callStatic.size()).to.equal(i);
      }
    });
  });

  describe('#height', () => {
    it('returns one-indexed height of tree', async () => {
      expect(await instance.callStatic.size()).to.equal(0);

      for (let i = 1; i < 10; i++) {
        await instance.push(ethers.utils.randomBytes(32));

        expect(await instance.callStatic.height()).to.equal(
          Math.ceil(Math.log2(i) + 1),
        );
      }
    });
  });

  describe('#root', () => {
    it('returns zero bytes for tree of size zero', async () => {
      expect(await instance.callStatic.root()).to.equal(
        ethers.constants.HashZero,
      );
    });

    it('returns contained element for tree of size one', async () => {
      const value = String(Math.random());
      const hash = ethers.utils.solidityKeccak256(
        ['bytes'],
        [ethers.utils.toUtf8Bytes(value)],
      );

      await instance.push(ethers.utils.toUtf8Bytes(value));

      expect(await instance.callStatic.root()).to.equal(hash);
    });

    it('returns Merkle root derived from elements contained in balanced tree', async () => {
      const value0 = String(Math.random());
      const value1 = String(Math.random());

      const hash0 = ethers.utils.solidityKeccak256(
        ['bytes'],
        [ethers.utils.toUtf8Bytes(value0)],
      );

      const hash1 = ethers.utils.solidityKeccak256(
        ['bytes'],
        [ethers.utils.toUtf8Bytes(value1)],
      );

      const hash = ethers.utils.solidityKeccak256(
        ['bytes32', 'bytes32'],
        [hash0, hash1],
      );

      await instance.push(ethers.utils.toUtf8Bytes(value0));
      await instance.push(ethers.utils.toUtf8Bytes(value1));

      expect(await instance.callStatic.root()).to.equal(hash);
    });

    it('returns Merkle root derived from elements contained in unbalanced tree', async () => {
      const value0 = String(Math.random());
      const value1 = String(Math.random());
      const value2 = String(Math.random());

      const hash0 = ethers.utils.solidityKeccak256(
        ['bytes'],
        [ethers.utils.toUtf8Bytes(value0)],
      );

      const hash1 = ethers.utils.solidityKeccak256(
        ['bytes'],
        [ethers.utils.toUtf8Bytes(value1)],
      );

      const hash2 = ethers.utils.solidityKeccak256(
        ['bytes'],
        [ethers.utils.toUtf8Bytes(value2)],
      );

      const hash = ethers.utils.solidityKeccak256(
        ['bytes32', 'bytes32'],
        [
          ethers.utils.solidityKeccak256(
            ['bytes32', 'bytes32'],
            [hash0, hash1],
          ),
          hash2,
        ],
      );

      await instance.push(ethers.utils.toUtf8Bytes(value0));
      await instance.push(ethers.utils.toUtf8Bytes(value1));
      await instance.push(ethers.utils.toUtf8Bytes(value2));

      expect(await instance.callStatic.root()).to.equal(hash);
    });
  });

  describe('#push', () => {
    it('updates Merkle root', async () => {
      const values = [];

      for (let i = 0; i < 10; i++) {
        values.push(String(Math.random()));
      }

      for (let i = 0; i < values.length; i++) {
        await instance.push(ethers.utils.toUtf8Bytes(values[i]));

        const tree = new MerkleTree(values.slice(0, i + 1), keccak256, {
          hashLeaves: true,
        });

        expect(await instance.callStatic.root()).to.equal(tree.getHexRoot());
      }
    });
  });

  describe('#set', () => {
    it('updates Merkle root', async () => {
      const values = [];

      for (let i = 0; i < 10; i++) {
        const value = String(Math.random());
        values.push(value);
        await instance.push(ethers.utils.toUtf8Bytes(value));
      }

      for (let i = 0; i < 10; i++) {
        const value = String(Math.random());
        values[i] = value;
        await instance.set(i, ethers.utils.toUtf8Bytes(value));

        const tree = new MerkleTree(values, keccak256, {
          hashLeaves: true,
        });

        expect(await instance.callStatic.root()).to.equal(tree.getHexRoot());
      }
    });
  });
});
