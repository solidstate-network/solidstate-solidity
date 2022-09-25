// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IncrementalMerkleTree } from './IncrementalMerkleTree.sol';

import 'hardhat/console.sol';

contract IncrementalMerkleTreeMock {
    using IncrementalMerkleTree for IncrementalMerkleTree.Tree;

    IncrementalMerkleTree.Tree private tree;

    function size() external view returns (uint256) {
        return tree.size();
    }

    function height() external view returns (uint256) {
        return tree.height();
    }

    function root() external view returns (bytes32) {
        return tree.root();
    }

    function push(bytes memory data) external {
        tree.push(data);
    }

    function set(uint256 index, bytes memory data) external {
        tree.set(index, data);
    }
}
