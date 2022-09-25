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
    it('returns Merkle root', async () => {
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
});
