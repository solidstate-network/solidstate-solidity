// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Panic } from '../utils/Panic.sol';

library MerkleTree {
    using MerkleTree for Tree;

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
            rootHash = _at(
                _arraySlot(self),
                ~(type(uint256).max << self.height())
            );
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
            Panic.panic(Panic.ARRAY_ACCESS_OUT_OF_BOUNDS);
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
        // index of next available position in array
        uint256 index;

        assembly {
            index := sload(self.slot)
        }

        if (index == 0) {
            Panic.panic(Panic.POP_ON_EMPTY_ARRAY);
        }

        assembly {
            // index of element being removed
            index := sub(index, 2)
            sstore(self.slot, index)
        }

        unchecked {
            // if tree is now empty or is balanced, do nothing more
            if (index == 0 || (index & (index - 1) == 0)) return;

            // index of last element after removal, which may need to be reset
            index -= 2;
        }

        bytes32 slot = _arraySlot(self);

        // TODO: don't start at depth 0
        _set(slot, 0, index, index, _at(slot, index));
    }

    /**
     * @notice overwrite element in tree at given index
     * @param self Tree struct storage reference
     * @param index index to update
     * @param element element to add
     */
    function set(Tree storage self, uint256 index, bytes32 element) internal {
        if (index >= self.size()) {
            Panic.panic(Panic.ARRAY_ACCESS_OUT_OF_BOUNDS);
        }

        unchecked {
            _set(
                _arraySlot(self),
                0,
                self._elements.length - 2,
                index << 1,
                element
            );
        }
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

        // all elements at depth n will share the lowest n bits
        // these bits also match value of the depth itself

        // create mask of bit n+1 for depth n
        // flipping this bit of element's index yields the index of its sibling
        // the mask is equal to 2 ** (n + 1) and is also used to determine end of loop
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
