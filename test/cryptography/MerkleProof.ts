import {
  __hh_exposed_MerkleProof,
  __hh_exposed_MerkleProof__factory,
} from '@solidstate/typechain-types';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';

describe('MerkleProof', () => {
  let instance: __hh_exposed_MerkleProof;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();
    instance = await new __hh_exposed_MerkleProof__factory(deployer).deploy();
  });

  describe('__internal', () => {
    describe('#verify(bytes32[],bytes32,bytes32)', () => {
      it('returns true if proof is valid', async () => {
        const leaves = ['1', '2', '3'];
        const tree = new MerkleTree(leaves, keccak256, {
          hashLeaves: true,
          sortPairs: true,
        });
        const root = tree.getHexRoot();

        for (const leaf of leaves) {
          const proof = tree.getHexProof(keccak256(leaf));

          expect(
            await instance.__hh_exposed_verify.staticCall(
              proof,
              root,
              keccak256(leaf),
            ),
          ).to.be.true;
        }
      });

      it('returns false if proof is invalid', async () => {
        const leaves = ['1', '2', '3'];
        const tree = new MerkleTree(leaves, keccak256, {
          hashLeaves: true,
          sortPairs: true,
        });
        const root = tree.getHexRoot();

        const proof = tree.getHexProof(keccak256(leaves[0]));

        expect(
          await instance.__hh_exposed_verify.staticCall(
            proof,
            root,
            keccak256('4'),
          ),
        ).to.be.false;
      });
    });
  });
});
