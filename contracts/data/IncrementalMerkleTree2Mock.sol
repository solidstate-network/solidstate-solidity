// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IncrementalMerkleTree2 } from './IncrementalMerkleTree2.sol';

import 'hardhat/console.sol';

contract IncrementalMerkleTree2Mock {
    using IncrementalMerkleTree2 for IncrementalMerkleTree2.Tree;

    IncrementalMerkleTree2.Tree private tree;

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
