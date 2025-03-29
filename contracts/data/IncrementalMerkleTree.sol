// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

library IncrementalMerkleTree {
    using IncrementalMerkleTree for Tree;

    struct Tree {
        // underlying array always has even length
        // elements are stored at even indexes, and their hashes in between
        // last index is empty

        bytes32[] _elements;
    }

    /**
     * @notice query number of elements contained in tree
     * @param self Tree struct storage reference
     * @return treeSize size of tree
     */
    function size(Tree storage self) internal view returns (uint256 treeSize) {
        // underlying array is exactly twice the size of the set of leaf nodes
        treeSize = self._elements.length >> 1;
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
            rootHash = _at(_arraySlot(self), (1 << self.height()) - 1);
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
        if (index >= self.size()) {
            assembly {
                mstore(0x00, 0x4e487b71)
                mstore(0x20, 0x32)
                revert(0x1c, 0x24)
            }
        }
        element = _at(_arraySlot(self), index << 1);
    }

    /**
     * @notice add new element to tree
     * @param self Tree struct storage reference
     * @param element element to add
     */
    function push(Tree storage self, bytes32 element) internal {
        // index of element being added
        uint256 index;

        assembly {
            index := sload(self.slot)
            sstore(self.slot, add(index, 2))
        }

        _set(_arraySlot(self), 0, index, index, element);
    }

    /**
     * @notice remove last element from tree
     * @param self Tree struct storage reference
     */
    function pop(Tree storage self) internal {
        // index of element being removed
        uint256 index;

        assembly {
            index := sub(sload(self.slot), 2)
            sstore(self.slot, index)
        }

        // TODO: do nothing if tree is balanced
        if (index == 0) return;

        // TODO: don't start at depth 0

        bytes32 slot = _arraySlot(self);

        // index of last element after removal, which may need to be reset
        unchecked {
            index -= 2;
        }

        _set(slot, 0, index, index, _at(slot, index));
    }

    /**
     * @notice overwrite element in tree at given index
     * @param self Tree struct storage reference
     * @param index index to update
     * @param element element to add
     */
    function set(Tree storage self, uint256 index, bytes32 element) internal {
        _set(
            _arraySlot(self),
            0,
            self._elements.length - 2,
            index << 1,
            element
        );
    }

    /**
     * @notice calculate the storage slot of the underlying bytes32 array
     * @param self Tree struct storage reference
     * @return slot storage slot
     */
    function _arraySlot(Tree storage self) private pure returns (bytes32 slot) {
        assembly {
            mstore(0, self.slot)
            slot := keccak256(0, 32)
        }
    }

    /**
     * @notice retreive element at given internal index
     * @param arraySlot cached slot of underlying array
     * @param index index to query
     * @return element element stored at index
     */
    function _at(
        bytes32 arraySlot,
        uint256 index
    ) private view returns (bytes32 element) {
        assembly {
            element := sload(add(arraySlot, index))
        }
    }

    function _set(
        bytes32 arraySlot,
        uint256 depth,
        uint256 maxIndex,
        uint256 index,
        bytes32 element
    ) private {
        if (index <= maxIndex) {
            // current index is within bounds of data, so write it to storage
            assembly {
                sstore(add(arraySlot, index), element)
            }
        }

        // lowest n bits will always be (1) for elements at depth n
        // flip bit n+1 of an element's index to get it sibling
        uint256 mask = 2 << depth;

        if (mask <= maxIndex) {
            uint256 indexRight = index | mask;

            // if current element is on the left and right element does not exist
            // pass element along to next depth unhashed

            if (index == indexRight) {
                // current element is on the right
                // left element is guaranteed to exist
                assembly {
                    mstore(0, sload(add(arraySlot, xor(indexRight, mask))))
                    mstore(32, element)
                    element := keccak256(0, 64)
                }
            } else if (indexRight <= maxIndex) {
                // current element is on the left
                // right element exists
                assembly {
                    mstore(0, element)
                    mstore(32, sload(add(arraySlot, indexRight)))
                    element := keccak256(0, 64)
                }
            }

            unchecked {
                // calculate the index of next element at depth n+1
                // midpoint between current left and right index
                // index = indexRight ^ (3 << depth)

                _set(
                    arraySlot,
                    depth + 1,
                    maxIndex,
                    indexRight ^ (3 << depth),
                    element
                );
            }
        }
    }
}
