import { expect } from 'chai';
import { ethers } from 'hardhat';
import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import { MerkleProofMock, MerkleProofMock__factory } from '../../typechain';

describe('MerkleProof', function () {
  let instance: MerkleProofMock;

  beforeEach(async function () {
    const [deployer] = await ethers.getSigners();
    instance = await new MerkleProofMock__factory(deployer).deploy();
  });

  describe('__internal', function () {
    describe('#verify', function () {
      it('returns true if proof is valid', async function () {
        const leaves = ['1', '2', '3'];
        const tree = new MerkleTree(leaves, keccak256, {
          hashLeaves: true,
          sortPairs: true,
        });
        const root = tree.getHexRoot();

        for (const leaf of leaves) {
          const proof = tree.getHexProof(keccak256(leaf));

          expect(await instance.callStatic.verify(proof, root, keccak256(leaf)))
            .to.be.true;
        }
      });

      it('returns false if proof is invalid', async function () {
        const leaves = ['1', '2', '3'];
        const tree = new MerkleTree(leaves, keccak256, {
          hashLeaves: true,
          sortPairs: true,
        });
        const root = tree.getHexRoot();

        const proof = tree.getHexProof(keccak256(leaves[0]));

        expect(await instance.callStatic.verify(proof, root, keccak256('4'))).to
          .be.false;
      });
    });
  });
});
