// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title Merkle tree verification utility
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
 */
library MerkleProof {
    /**
     * @notice verify whether given leaf is contained within Merkle tree defined by given root
     * @param proof proof that Merkle tree contains given leaf
     * @param root Merkle tree root
     * @param leaf element whose presence in Merkle tree to prove
     * @return whether leaf is proven to be contained within Merkle tree defined by root
     */
    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) internal pure returns (bool) {
        unchecked {
            bytes32 computedHash = leaf;

            for (uint256 i = 0; i < proof.length; i++) {
                bytes32 proofElement = proof[i];

                if (computedHash <= proofElement) {
                    computedHash = keccak256(
                        abi.encodePacked(computedHash, proofElement)
                    );
                } else {
                    computedHash = keccak256(
                        abi.encodePacked(proofElement, computedHash)
                    );
                }
            }

            return computedHash == root;
        }
    }
}
