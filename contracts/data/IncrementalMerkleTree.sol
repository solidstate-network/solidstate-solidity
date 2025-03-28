// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

library IncrementalMerkleTree {
    using IncrementalMerkleTree for Tree;

    struct Tree {
        // array always has odd length
        // elements are stored at even indexes
        bytes32[] _elements;
    }

    function size(Tree storage self) internal view returns (uint256 treeSize) {
        treeSize = (self._elements.length + 1) >> 1;
    }

    function height(
        Tree storage self
    ) internal view returns (uint256 treeHeight) {
        uint256 treeSize = self.size();

        if (treeSize == 0) revert();

        while (1 << treeHeight < treeSize) {
            treeHeight++;
        }
    }

    function root(Tree storage self) internal view returns (bytes32 rootHash) {
        unchecked {
            return self._elements[(1 << self.height()) - 1];
        }
    }

    function at(
        Tree storage self,
        uint256 index
    ) internal view returns (bytes32 element) {
        element = self._elements[index << 1];
    }

    function push(Tree storage self, bytes32 element) internal {
        uint256 treeSize = self.size() + 1;
        uint256 len = (treeSize << 1) - 1;

        assembly {
            sstore(self.slot, len)
        }

        _set(self, 0, (treeSize - 1) << 1, element, len);
    }

    function pop(Tree storage self) internal {
        uint256 treeSize = self.size() - 1;
        uint256 len = treeSize == 0 ? 0 : (treeSize << 1) - 1;

        assembly {
            sstore(self.slot, len)
        }

        if (treeSize == 0) return;

        _set(self, 0, (treeSize - 1) << 1, self.at(treeSize - 1), len);
    }

    function set(Tree storage self, uint256 index, bytes32 element) internal {
        _set(self, 0, index << 1, element, self._elements.length);
    }

    function _set(
        Tree storage self,
        uint256 depth,
        uint256 index,
        bytes32 element,
        uint256 len
    ) internal {
        if (index < len) {
            // write element to storage if
            self._elements[index] = element;
        }

        // flip bit of depth to get sibling, continue until 2^depth exceeds size
        uint256 mask = 2 << depth;

        if (mask < len) {
            uint256 indexLeft = index & ~mask;
            uint256 indexRight = index | mask;

            bytes32 nextElement;

            if (index == indexRight) {
                nextElement = keccak256(
                    abi.encodePacked(self._elements[indexLeft], element)
                );
            } else if (indexRight < len) {
                nextElement = keccak256(
                    abi.encodePacked(element, self._elements[indexRight])
                );
            } else {
                nextElement = element;
            }

            uint256 nextIndex = indexRight ^ (3 << depth);

            _set(self, depth + 1, nextIndex, nextElement, len);
        }
    }
}
