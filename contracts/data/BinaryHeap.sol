// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

/**
 * @title Binary Heap implementation
 * @dev The data strucutre is configured as a max-heap
 */

library BinaryHeap {
    struct Heap {
        bytes32[] _values;
        mapping(bytes32 => uint256) _indexes;
    }

    struct Bytes32Heap {
        Heap _inner;
    }

    struct AddressHeap {
        Heap _inner;
    }

    struct UintHeap {
        Heap _inner;
    }

    function at(Bytes32Heap storage heap, uint256 index)
        internal
        view
        returns (bytes32)
    {
        return _at(heap._inner, index);
    }

    function at(AddressHeap storage heap, uint256 index)
        internal
        view
        returns (address)
    {
        return address(uint160(uint256(_at(heap._inner, index))));
    }

    function at(UintHeap storage heap, uint256 index)
        internal
        view
        returns (uint256)
    {
        return uint256(_at(heap._inner, index));
    }

    function contains(Bytes32Heap storage heap, bytes32 value)
        internal
        view
        returns (bool)
    {
        return _contains(heap._inner, value);
    }

    function contains(AddressHeap storage heap, address value)
        internal
        view
        returns (bool)
    {
        return _contains(heap._inner, bytes32(uint256(uint160(value))));
    }

    function contains(UintHeap storage heap, uint256 value)
        internal
        view
        returns (bool)
    {
        return _contains(heap._inner, bytes32(value));
    }

    function indexOf(Bytes32Heap storage heap, bytes32 value)
        internal
        view
        returns (uint256)
    {
        return _indexOf(heap._inner, value);
    }

    function indexOf(AddressHeap storage heap, address value)
        internal
        view
        returns (uint256)
    {
        return _indexOf(heap._inner, bytes32(uint256(uint160(value))));
    }

    function indexOf(UintHeap storage heap, uint256 value)
        internal
        view
        returns (uint256)
    {
        return _indexOf(heap._inner, bytes32(value));
    }

    function length(Bytes32Heap storage heap) internal view returns (uint256) {
        return _length(heap._inner);
    }

    function length(AddressHeap storage heap) internal view returns (uint256) {
        return _length(heap._inner);
    }

    function length(UintHeap storage heap) internal view returns (uint256) {
        return _length(heap._inner);
    }

    function root(Bytes32Heap storage heap) internal view returns (bytes32) {
        return _root(heap._inner);
    }

    function root(AddressHeap storage heap) internal view returns (address) {
        return address(uint160(uint256(_root(heap._inner))));
    }

    function root(UintHeap storage heap) internal view returns (uint256) {
        return uint256(_root(heap._inner));
    }

    function add(Bytes32Heap storage heap, bytes32 value) internal {
        _add(heap._inner, value);
    }

    function add(AddressHeap storage heap, address value) internal {
        _add(heap._inner, bytes32(uint256(uint160(value))));
    }

    function add(UintHeap storage heap, uint256 value) internal {
        _add(heap._inner, bytes32(value));
    }

    function remove(Bytes32Heap storage heap, bytes32 value)
        internal
        returns (bool)
    {
        return _remove(heap._inner, value);
    }

    function remove(AddressHeap storage heap, address value)
        internal
        returns (bool)
    {
        return _remove(heap._inner, bytes32(uint256(uint160(value))));
    }

    function remove(UintHeap storage heap, uint256 value)
        internal
        returns (bool)
    {
        return _remove(heap._inner, bytes32(value));
    }

    function toArray(Bytes32Heap storage heap)
        internal
        view
        returns (bytes32[] memory)
    {
        uint256 len = _length(heap._inner);
        bytes32[] memory arr = new bytes32[](len);
        for (uint256 index = 0; index < len; index++) {
            arr[index] = _at(heap._inner, index);
        }
        return arr;
    }

    function toArray(AddressHeap storage heap)
        internal
        view
        returns (address[] memory)
    {
        uint256 len = _length(heap._inner);
        address[] memory arr = new address[](len);
        for (uint256 index = 0; index < len; index++) {
            arr[index] = address(uint160(uint256(_at(heap._inner, index))));
        }
        return arr;
    }

    function toArray(UintHeap storage heap)
        internal
        view
        returns (uint256[] memory)
    {
        uint256 len = _length(heap._inner);
        uint256[] memory arr = new uint256[](len);
        for (uint256 index = 0; index < len; index++) {
            arr[index] = uint256(_at(heap._inner, index));
        }
        return arr;
    }

    function _at(Heap storage heap, uint256 index)
        private
        view
        returns (bytes32)
    {
        require(heap._values.length > index, 'BinaryHeap: index out of bounds');
        return heap._values[index];
    }

    function _contains(Heap storage heap, bytes32 value)
        private
        view
        returns (bool)
    {
        return heap._indexes[value] != 0;
    }

    function _indexOf(Heap storage heap, bytes32 value)
        private
        view
        returns (uint256)
    {
        unchecked {
            return heap._indexes[value] - 1;
        }
    }

    function _length(Heap storage heap) private view returns (uint256) {
        return heap._values.length;
    }

    function _root(Heap storage heap) private view returns (bytes32) {
        return _at(heap, 0);
    }

    function _add(Heap storage heap, bytes32 value) private {
        heap._values.push(value);
        heap._indexes[value] = _length(heap);

        _heapify(heap);
    }

    function _remove(Heap storage heap, bytes32 value) private returns (bool) {
        if (_contains(heap, value)) {
            uint256 node = _indexOf(heap, value);

            // move node with last element in the tree, then remove it
            _swap(heap, node, _length(heap) - 1);

            heap._values.pop();
            delete heap._indexes[value];

            _heapify(heap);

            return true;
        } else {
            return false;
        }
    }

    function _heapify(Heap storage heap) private {
        uint256 len = _length(heap);
        if (len > 1) {
            unchecked {
                uint256 index = ((len) / 2) - 1;
                while (index >= 0) {
                    _maxHeapify(heap, len, index);
                    if (index == 0) break;
                    --index;
                }
            }
        }
    }

    function _maxHeapify(
        Heap storage heap,
        uint256 len,
        uint256 index
    ) private {
        uint256 largest = index;

        unchecked {
            uint256 left = 2 * index + 1;
            uint256 right = 2 * index + 2;

            if (left < len && heap._values[largest] < heap._values[left]) {
                largest = left;
            }

            if (right < len && heap._values[largest] < heap._values[right]) {
                largest = right;
            }
        }

        if (largest != index) {
            // swap until the largest node is the root node
            _swap(heap, index, largest);
            _maxHeapify(heap, len, largest);
        }
    }

    function _swap(
        Heap storage heap,
        uint256 a,
        uint256 b
    ) private {
        (heap._indexes[heap._values[a]], heap._indexes[heap._values[b]]) = (
            heap._indexes[heap._values[b]],
            heap._indexes[heap._values[a]]
        );

        (heap._values[a], heap._values[b]) = (heap._values[b], heap._values[a]);
    }
}
