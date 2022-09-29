// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library IncrementalMerkleTree {
    using IncrementalMerkleTree for Tree;

    struct Tree {
        bytes32[][] nodes;
    }

    /**
     * @notice query number of elements contained in tree
     * @param t Tree struct storage reference
     * @return size of tree
     */
    function size(Tree storage t) internal view returns (uint256) {
        if (t.height() > 0) {
            return t.nodes[0].length;
        }
    }

    /**
     * @notice query one-indexed height of tree
     * @dev conventional zero-indexed height would require the use of signed integers, so height is one-indexed instead
     * @param t Tree struct storage reference
     * @return one-indexed height of tree
     */
    function height(Tree storage t) internal view returns (uint256) {
        return t.nodes.length;
    }

    /**
     * @notice query Merkle root
     * @param t Tree struct storage reference
     * @return root hash
     */
    function root(Tree storage t) internal view returns (bytes32) {
        uint256 height = t.height();

        if (height > 0) {
            unchecked {
                return t.nodes[height - 1][0];
            }
        }
    }

    /**
     * @notice add new element to tree
     * @param t Tree struct storage reference
     * @param data data to add
     */
    function push(Tree storage t, bytes memory data) internal {
        unchecked {
            uint256 height = t.height();
            uint256 size = t.size();

            // add new layer if tree is at capacity

            if (size == (1 << height) >> 1) {
                t.nodes.push();
                height++;
            }

            // add new columns if rows are full

            uint256 row;
            uint256 col = size;

            while (row < height && t.nodes[row].length <= col) {
                t.nodes[row].push();
                row++;
                col >>= 1;
            }

            // add data to tree

            t.set(size, data);
        }
    }

    /**
     * @notice update existing element in tree
     * @param t Tree struct storage reference
     * @param index index to update
     * @param data new data to add
     */
    function set(
        Tree storage t,
        uint256 index,
        bytes memory data
    ) internal {
        unchecked {
            _set(t.nodes, 0, index, t.height() - 1, keccak256(data));
        }
    }

    /**
     * @notice update element in tree and recursively recalculate hashes
     * @param nodes internal tree structure storage reference
     * @param rowIndex index of current row to update
     * @param colIndex index of current column to update
     * @param hash hash to store at current position
     */
    function _set(
        bytes32[][] storage nodes,
        uint256 rowIndex,
        uint256 colIndex,
        uint256 rootIndex,
        bytes32 hash
    ) private {
        bytes32[] storage row = nodes[rowIndex];

        row[colIndex] = hash;

        if (rowIndex == rootIndex) return;

        unchecked {
            if (colIndex & 1 == 1) {
                // sibling is on the left
                assembly {
                    mstore(0x00, row.slot)
                    let sibling := sload(
                        add(keccak256(0x00, 0x20), sub(colIndex, 1))
                    )
                    mstore(0x00, sibling)
                    mstore(0x20, hash)
                    hash := keccak256(0x00, 0x40)
                }
            } else if (colIndex + 1 < row.length) {
                // sibling is on the right (and sibling exists)
                assembly {
                    mstore(0x00, row.slot)
                    let sibling := sload(
                        add(keccak256(0x00, 0x20), add(colIndex, 1))
                    )
                    mstore(0x00, hash)
                    mstore(0x20, sibling)
                    hash := keccak256(0x00, 0x40)
                }
            }

            _set(nodes, rowIndex + 1, colIndex >> 1, rootIndex, hash);
        }
    }
}
