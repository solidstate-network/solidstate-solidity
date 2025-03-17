// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title Doubly linked list implementation with enumeration functions
 * @dev implementation does not support insertion of zero values into the list
 */
library PackedDoublyLinkedList {
    struct _PackedDoublyLinkedList {
        mapping(bytes16 => bytes32) _links;
    }

    struct Bytes16List {
        _PackedDoublyLinkedList _inner;
    }

    struct Uint128List {
        _PackedDoublyLinkedList _inner;
    }

    bytes32 private constant MASK_NEXT = bytes32(uint256(type(uint128).max));
    bytes32 private constant MASK_PREV = ~MASK_NEXT;

    /**
     * @notice indicate that an attempt was made to insert 0 into a list
     */
    error PackedDoublyLinkedList__InvalidInput();

    /**
     * @notice indicate that a non-existent value was used as a reference for insertion or lookup
     */
    error PackedDoublyLinkedList__NonExistentEntry();

    function contains(
        Bytes16List storage self,
        bytes16 value
    ) internal view returns (bool) {
        return _contains(self._inner, value);
    }

    function contains(
        Uint128List storage self,
        uint128 value
    ) internal view returns (bool) {
        return _contains(self._inner, bytes16(value));
    }

    function prev(
        Bytes16List storage self,
        bytes16 value
    ) internal view returns (bytes16) {
        return _prev(self._inner, value);
    }

    function prev(
        Uint128List storage self,
        uint128 value
    ) internal view returns (uint128) {
        return uint128(_prev(self._inner, bytes16(value)));
    }

    function next(
        Bytes16List storage self,
        bytes16 value
    ) internal view returns (bytes16) {
        return _next(self._inner, value);
    }

    function next(
        Uint128List storage self,
        uint128 value
    ) internal view returns (uint128) {
        return uint128(_next(self._inner, bytes16(value)));
    }

    function insertBefore(
        Bytes16List storage self,
        bytes16 nextValue,
        bytes16 newValue
    ) internal returns (bool status) {
        status = _insertBefore(self._inner, nextValue, newValue);
    }

    function insertBefore(
        Uint128List storage self,
        uint128 nextValue,
        uint128 newValue
    ) internal returns (bool status) {
        status = _insertBefore(
            self._inner,
            bytes16(nextValue),
            bytes16(newValue)
        );
    }

    function insertAfter(
        Bytes16List storage self,
        bytes16 prevValue,
        bytes16 newValue
    ) internal returns (bool status) {
        status = _insertAfter(self._inner, prevValue, newValue);
    }

    function insertAfter(
        Uint128List storage self,
        uint128 prevValue,
        uint128 newValue
    ) internal returns (bool status) {
        status = _insertAfter(
            self._inner,
            bytes16(prevValue),
            bytes16(newValue)
        );
    }

    function push(
        Bytes16List storage self,
        bytes16 value
    ) internal returns (bool status) {
        status = _push(self._inner, value);
    }

    function push(
        Uint128List storage self,
        uint128 value
    ) internal returns (bool status) {
        status = _push(self._inner, bytes16(value));
    }

    function pop(Bytes16List storage self) internal returns (bytes16 value) {
        value = _pop(self._inner);
    }

    function pop(Uint128List storage self) internal returns (uint128 value) {
        value = uint128(_pop(self._inner));
    }

    function shift(Bytes16List storage self) internal returns (bytes16 value) {
        value = _shift(self._inner);
    }

    function shift(Uint128List storage self) internal returns (uint128 value) {
        value = uint128(_shift(self._inner));
    }

    function unshift(
        Bytes16List storage self,
        bytes16 value
    ) internal returns (bool status) {
        status = _unshift(self._inner, value);
    }

    function unshift(
        Uint128List storage self,
        uint128 value
    ) internal returns (bool status) {
        status = _unshift(self._inner, bytes16(value));
    }

    function remove(
        Bytes16List storage self,
        bytes16 value
    ) internal returns (bool status) {
        status = _remove(self._inner, value);
    }

    function remove(
        Uint128List storage self,
        uint128 value
    ) internal returns (bool status) {
        status = _remove(self._inner, bytes16(value));
    }

    function replace(
        Bytes16List storage self,
        bytes16 oldValue,
        bytes16 newValue
    ) internal returns (bool status) {
        status = _replace(self._inner, oldValue, newValue);
    }

    function replace(
        Uint128List storage self,
        uint128 oldValue,
        uint128 newValue
    ) internal returns (bool status) {
        status = _replace(self._inner, bytes16(oldValue), bytes16(newValue));
    }

    function toArray(
        Bytes16List storage self,
        bytes16 prevValue,
        uint256 count
    ) internal view returns (bytes16[] memory array) {
        array = _toArray(self._inner, prevValue, count);
    }

    function toArray(
        Uint128List storage self,
        uint128 prevValue,
        uint256 count
    ) internal view returns (uint128[] memory array) {
        array = _toArray(self._inner, prevValue, count);
    }

    function _contains(
        _PackedDoublyLinkedList storage self,
        bytes16 value
    ) private view returns (bool) {
        return
            value != 0 &&
            (self._links[value] != 0 ||
                self._links[0] == _formatLinks(value, value));
    }

    function _adjacent(
        _PackedDoublyLinkedList storage self,
        bytes16 value
    ) private view returns (bytes16 prevValue, bytes16 nextValue) {
        (prevValue, nextValue) = _parseLinks(self._links[value]);

        if (
            value != 0 &&
            prevValue == 0 &&
            nextValue == 0 &&
            !_contains(self, value)
        ) revert PackedDoublyLinkedList__NonExistentEntry();
    }

    function _prev(
        _PackedDoublyLinkedList storage self,
        bytes16 nextValue
    ) private view returns (bytes16 prevValue) {
        (prevValue, ) = _adjacent(self, nextValue);
    }

    function _next(
        _PackedDoublyLinkedList storage self,
        bytes16 prevValue
    ) private view returns (bytes16 nextValue) {
        (, nextValue) = _adjacent(self, prevValue);
    }

    function _insertBefore(
        _PackedDoublyLinkedList storage self,
        bytes16 nextValue,
        bytes16 newValue
    ) private returns (bool status) {
        status = _insertBetween(
            self,
            _prev(self, nextValue),
            nextValue,
            newValue
        );
    }

    function _insertAfter(
        _PackedDoublyLinkedList storage self,
        bytes16 prevValue,
        bytes16 newValue
    ) private returns (bool status) {
        status = _insertBetween(
            self,
            prevValue,
            _next(self, prevValue),
            newValue
        );
    }

    function _insertBetween(
        _PackedDoublyLinkedList storage self,
        bytes16 prevValue,
        bytes16 nextValue,
        bytes16 newValue
    ) private returns (bool status) {
        if (newValue == 0) revert PackedDoublyLinkedList__InvalidInput();

        if (!_contains(self, newValue)) {
            self._links[newValue] = _formatLinks(prevValue, nextValue);

            bytes32 prevLinks = self._links[prevValue];
            self._links[prevValue] =
                (prevLinks & MASK_PREV) |
                _formatLinks(0, newValue);

            bytes32 nextLinks = self._links[nextValue];
            self._links[nextValue] =
                (nextLinks & MASK_NEXT) |
                _formatLinks(newValue, 0);

            status = true;
        }
    }

    function _push(
        _PackedDoublyLinkedList storage self,
        bytes16 value
    ) private returns (bool status) {
        status = _insertBetween(self, _prev(self, 0), 0, value);
    }

    function _pop(
        _PackedDoublyLinkedList storage self
    ) private returns (bytes16 value) {
        value = _prev(self, 0);
        _remove(self, value);
    }

    function _shift(
        _PackedDoublyLinkedList storage self
    ) private returns (bytes16 value) {
        value = _next(self, 0);
        _remove(self, value);
    }

    function _unshift(
        _PackedDoublyLinkedList storage self,
        bytes16 value
    ) private returns (bool status) {
        status = _insertBetween(self, 0, _next(self, 0), value);
    }

    function _remove(
        _PackedDoublyLinkedList storage self,
        bytes16 value
    ) private returns (bool status) {
        if (_contains(self, value)) {
            (bytes16 prevValue, bytes16 nextValue) = _adjacent(self, value);

            bytes32 prevLinks = self._links[prevValue];
            self._links[prevValue] =
                (prevLinks & MASK_PREV) |
                _formatLinks(0, nextValue);

            bytes32 nextLinks = self._links[nextValue];
            self._links[nextValue] =
                (nextLinks & MASK_NEXT) |
                _formatLinks(prevValue, 0);

            delete self._links[value];
            status = true;
        }
    }

    function _replace(
        _PackedDoublyLinkedList storage self,
        bytes16 oldValue,
        bytes16 newValue
    ) private returns (bool status) {
        if (!_contains(self, oldValue))
            revert PackedDoublyLinkedList__NonExistentEntry();

        status = _insertBetween(
            self,
            _prev(self, oldValue),
            _next(self, oldValue),
            newValue
        );

        if (status) {
            delete self._links[oldValue];
        }
    }

    function _toArray(
        _PackedDoublyLinkedList storage self,
        bytes16 prevValue,
        uint256 count
    ) internal view returns (bytes16[] memory array) {
        array = new bytes16[](count);

        for (uint i; i < count; i++) {
            (, bytes16 nextValue) = _parseLinks(self._links[prevValue]);

            if (nextValue == 0) {
                if (i == 0 && _prev(self, 0) != prevValue)
                    revert PackedDoublyLinkedList__NonExistentEntry();

                // truncate the array if end of list is reached
                assembly {
                    mstore(array, i)
                }

                break;
            }

            array[i] = prevValue = nextValue;
        }
    }

    function _toArray(
        _PackedDoublyLinkedList storage self,
        uint128 prevValue,
        uint256 count
    ) internal view returns (uint128[] memory array) {
        array = new uint128[](count);

        for (uint i; i < count; i++) {
            (, bytes16 nextValue) = _parseLinks(
                self._links[bytes16(prevValue)]
            );

            if (nextValue == 0) {
                if (i == 0 && _prev(self, 0) != bytes16(prevValue))
                    revert PackedDoublyLinkedList__NonExistentEntry();

                // truncate the array if end of list is reached
                assembly {
                    mstore(array, i)
                }

                break;
            }

            array[i] = prevValue = uint128(nextValue);
        }
    }

    function _formatLinks(
        bytes16 prevValue,
        bytes16 nextValue
    ) private pure returns (bytes32 links) {
        links = (bytes32(nextValue) >> 128) | prevValue;
    }

    function _parseLinks(
        bytes32 links
    ) private pure returns (bytes16 prevValue, bytes16 nextValue) {
        prevValue = bytes16(links);
        nextValue = bytes16(links << 128);
    }
}
