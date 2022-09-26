// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library IncrementalMerkleTree {
    using IncrementalMerkleTree for Tree;

    struct Tree {
        bytes32[][] nodes;
    }

    /**
     * TODO: would be desirable to be able to remove the height check
     */
    function size(Tree storage t) internal view returns (uint256) {
        return t.height() == 0 ? 0 : t.nodes[0].length;
    }

    /**
     * TODO: it seems that tree height is traditionally zero-indexed,
     *  but that means that we would have to use a signed integer because a
     *  size-zero tree has a height of -1
     */
    function height(Tree storage t) internal view returns (uint256) {
        return t.nodes.length;
    }

    function root(Tree storage t) internal view returns (bytes32) {
        unchecked {
            uint256 height = t.height();
            return height == 0 ? bytes32(0) : t.nodes[height - 1][0];
        }
    }

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

    function set(
        Tree storage t,
        uint256 index,
        bytes memory data
    ) internal {
        unchecked {
            _set(t.nodes, 0, index, t.height() - 1, keccak256(data));
        }
    }

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
                hash = keccak256(bytes.concat(row[colIndex - 1], hash));
            } else if (colIndex + 1 < row.length) {
                // sibling is on the right (and sibling exists)
                hash = keccak256(bytes.concat(hash, row[colIndex + 1]));
            }

            _set(nodes, rowIndex + 1, colIndex >> 1, rootIndex, hash);
        }
    }
}
