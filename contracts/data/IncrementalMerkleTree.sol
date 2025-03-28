// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

library IncrementalMerkleTree {
    using IncrementalMerkleTree for Tree;

    struct Tree {
        // array always has odd length
        // elements are stored at even indexes
        bytes32[] _elements;
    }

    /**
     * @notice query number of elements contained in tree
     * @param self Tree struct storage reference
     * @return treeSize size of tree
     */
    function size(Tree storage self) internal view returns (uint256 treeSize) {
        treeSize = (self._elements.length + 1) >> 1;
    }

    /**
     * @notice query height of tree
     * @param self Tree struct storage reference
     * @return treeHeight height of tree
     */
    function height(
        Tree storage self
    ) internal view returns (uint256 treeHeight) {
        uint256 length = self._elements.length;

        if (length == 0) revert();

        while (2 << treeHeight < length) {
            unchecked {
                treeHeight++;
            }
        }
    }

    /**
     * @notice query Merkle root
     * @param self Tree struct storage reference
     * @return rootHash root hash
     */
    function root(Tree storage self) internal view returns (bytes32 rootHash) {
        unchecked {
            return self._elements[(1 << self.height()) - 1];
        }
    }

    /**
     * @notice retrieve element at given index
     * @param self Tree struct storage reference
     * @param index index to query
     * @return element element stored at index
     */
    function at(
        Tree storage self,
        uint256 index
    ) internal view returns (bytes32 element) {
        element = self._elements[index << 1];
    }

    /**
     * @notice add new element to tree
     * @param self Tree struct storage reference
     * @param element element to add
     */
    function push(Tree storage self, bytes32 element) internal {
        uint256 treeSize = self.size() + 1;
        uint256 len = (treeSize << 1) - 1;

        assembly {
            sstore(self.slot, len)
        }

        _set(self, 0, (treeSize - 1) << 1, element, len);
    }

    /**
     * @notice remove last element from tree
     * @param self Tree struct storage reference
     */
    function pop(Tree storage self) internal {
        uint256 treeSize = self.size() - 1;
        uint256 len = treeSize == 0 ? 0 : (treeSize << 1) - 1;

        assembly {
            sstore(self.slot, len)
        }

        if (treeSize == 0) return;

        _set(self, 0, (treeSize - 1) << 1, self.at(treeSize - 1), len);
    }

    /**
     * @notice overwrite element in tree at given index
     * @param self Tree struct storage reference
     * @param index index to update
     * @param element element to add
     */
    function set(Tree storage self, uint256 index, bytes32 element) internal {
        _set(self, 0, index << 1, element, self._elements.length);
    }

    function _set(
        Tree storage self,
        uint256 depth,
        uint256 index,
        bytes32 element,
        uint256 len
    ) private {
        if (index < len) {
            // write element to storage if
            self._elements[index] = element;
        }

        // flip bit of depth to get sibling, continue until 2^depth exceeds size
        uint256 mask = 2 << depth;

        if (mask < len) {
            uint256 indexLeft = index & ~mask;
            uint256 indexRight = index | mask;

            if (index == indexRight) {
                assembly {
                    mstore(0, self.slot)
                    mstore(0, sload(add(keccak256(0, 32), indexLeft)))
                    mstore(32, element)
                    element := keccak256(0, 64)
                }
            } else if (indexRight < len) {
                assembly {
                    mstore(0, self.slot)
                    mstore(32, sload(add(keccak256(0, 32), indexRight)))
                    mstore(0, element)
                    element := keccak256(0, 64)
                }
            }

            _set(self, depth + 1, indexRight ^ (3 << depth), element, len);
        }
    }
}
