// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { MerkleProof } from './MerkleProof.sol';

contract MerkleProofMock {
    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) external pure returns (bool) {
        return MerkleProof.verify(proof, root, leaf);
    }
}
