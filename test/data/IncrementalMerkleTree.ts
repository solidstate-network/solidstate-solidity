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

  it('todo', async () => {
    const letters = ['a', 'b', 'c', 'd', 'e'];

    const data = {};

    for (const d of letters) {
      data[d] = ethers.utils.solidityKeccak256(
        ['bytes'],
        [ethers.utils.toUtf8Bytes(d)],
      );
    }

    const hash_ab = ethers.utils.solidityKeccak256(
      ['bytes32', 'bytes32'],
      [data.a, data.b],
    );

    const hash_cd = ethers.utils.solidityKeccak256(
      ['bytes32', 'bytes32'],
      [data.c, data.d],
    );

    const hash_ab_c = ethers.utils.solidityKeccak256(
      ['bytes32', 'bytes32'],
      [hash_ab, data.c],
    );

    const hash_ab_cd = ethers.utils.solidityKeccak256(
      ['bytes32', 'bytes32'],
      [hash_ab, hash_cd],
    );

    const hash_abcd_e = ethers.utils.solidityKeccak256(
      ['bytes32', 'bytes32'],
      [hash_ab_cd, data.e],
    );

    await instance.push(ethers.utils.toUtf8Bytes('a'));
    expect(await instance.callStatic.root()).to.equal(data.a);
    expect(await instance.callStatic.root()).to.equal(
      new MerkleTree(['a'], keccak256, {
        hashLeaves: true,
      }).getHexRoot(),
    );

    await instance.push(ethers.utils.toUtf8Bytes('b'));
    expect(await instance.callStatic.root()).to.equal(hash_ab);
    expect(await instance.callStatic.root()).to.equal(
      new MerkleTree(['a', 'b'], keccak256, {
        hashLeaves: true,
      }).getHexRoot(),
    );

    await instance.push(ethers.utils.toUtf8Bytes('c'));
    expect(await instance.callStatic.root()).to.equal(hash_ab_c);
    expect(await instance.callStatic.root()).to.equal(
      new MerkleTree(['a', 'b', 'c'], keccak256, {
        hashLeaves: true,
      }).getHexRoot(),
    );

    await instance.push(ethers.utils.toUtf8Bytes('d'));
    expect(await instance.callStatic.root()).to.equal(hash_ab_cd);
    expect(await instance.callStatic.root()).to.equal(
      new MerkleTree(['a', 'b', 'c', 'd'], keccak256, {
        hashLeaves: true,
      }).getHexRoot(),
    );

    await instance.push(ethers.utils.toUtf8Bytes('e'));
    expect(await instance.callStatic.root()).to.equal(hash_abcd_e);
    expect(await instance.callStatic.root()).to.equal(
      new MerkleTree(['a', 'b', 'c', 'd', 'e'], keccak256, {
        hashLeaves: true,
      }).getHexRoot(),
    );

    await instance.set(1, ethers.utils.toUtf8Bytes('e'));
    expect(await instance.callStatic.root()).to.equal(
      new MerkleTree(['a', 'e', 'c', 'd', 'e'], keccak256, {
        hashLeaves: true,
      }).getHexRoot(),
    );
  });
});
