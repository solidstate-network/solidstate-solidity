// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

/**
 * @title Doubly linked list implementation with enumeration functions
 * @dev implementation does not support insertion of zero values into the list
 */
library DoublyLinkedList {
    struct _DoublyLinkedList {
        mapping(bytes32 => bytes32) _nextValues;
        mapping(bytes32 => bytes32) _prevValues;
    }

    struct Bytes32List {
        _DoublyLinkedList _inner;
    }

    struct AddressList {
        _DoublyLinkedList _inner;
    }

    struct Uint256List {
        _DoublyLinkedList _inner;
    }

    /**
     * @notice indicate that an attempt was made to insert 0 into a list
     */
    error DoublyLinkedList__InvalidInput();

    /**
     * @notice indicate that a non-existent value was used as a reference for insertion or lookup
     */
    error DoublyLinkedList__NonExistentEntry();

    function contains(
        Bytes32List storage self,
        bytes32 value
    ) internal view returns (bool) {
        return _contains(self._inner, value);
    }

    function contains(
        AddressList storage self,
        address value
    ) internal view returns (bool) {
        return _contains(self._inner, bytes32(uint256(uint160(value))));
    }

    function contains(
        Uint256List storage self,
        uint256 value
    ) internal view returns (bool) {
        return _contains(self._inner, bytes32(value));
    }

    function prev(
        Bytes32List storage self,
        bytes32 value
    ) internal view returns (bytes32) {
        return _prev(self._inner, value);
    }

    function prev(
        AddressList storage self,
        address value
    ) internal view returns (address) {
        return
            address(
                uint160(
                    uint256(
                        _prev(self._inner, bytes32(uint256(uint160(value))))
                    )
                )
            );
    }

    function prev(
        Uint256List storage self,
        uint256 value
    ) internal view returns (uint256) {
        return uint256(_prev(self._inner, bytes32(value)));
    }

    function next(
        Bytes32List storage self,
        bytes32 value
    ) internal view returns (bytes32) {
        return _next(self._inner, value);
    }

    function next(
        AddressList storage self,
        address value
    ) internal view returns (address) {
        return
            address(
                uint160(
                    uint256(
                        _next(self._inner, bytes32(uint256(uint160(value))))
                    )
                )
            );
    }

    function next(
        Uint256List storage self,
        uint256 value
    ) internal view returns (uint256) {
        return uint256(_next(self._inner, bytes32(value)));
    }

    function insertBefore(
        Bytes32List storage self,
        bytes32 nextValue,
        bytes32 newValue
    ) internal returns (bool status) {
        status = _insertBefore(self._inner, nextValue, newValue);
    }

    function insertBefore(
        AddressList storage self,
        address nextValue,
        address newValue
    ) internal returns (bool status) {
        status = _insertBefore(
            self._inner,
            bytes32(uint256(uint160(nextValue))),
            bytes32(uint256(uint160(newValue)))
        );
    }

    function insertBefore(
        Uint256List storage self,
        uint256 nextValue,
        uint256 newValue
    ) internal returns (bool status) {
        status = _insertBefore(
            self._inner,
            bytes32(nextValue),
            bytes32(newValue)
        );
    }

    function insertAfter(
        Bytes32List storage self,
        bytes32 prevValue,
        bytes32 newValue
    ) internal returns (bool status) {
        status = _insertAfter(self._inner, prevValue, newValue);
    }

    function insertAfter(
        AddressList storage self,
        address prevValue,
        address newValue
    ) internal returns (bool status) {
        status = _insertAfter(
            self._inner,
            bytes32(uint256(uint160(prevValue))),
            bytes32(uint256(uint160(newValue)))
        );
    }

    function insertAfter(
        Uint256List storage self,
        uint256 prevValue,
        uint256 newValue
    ) internal returns (bool status) {
        status = _insertAfter(
            self._inner,
            bytes32(prevValue),
            bytes32(newValue)
        );
    }

    function push(
        Bytes32List storage self,
        bytes32 value
    ) internal returns (bool status) {
        status = _push(self._inner, value);
    }

    function push(
        AddressList storage self,
        address value
    ) internal returns (bool status) {
        status = _push(self._inner, bytes32(uint256(uint160(value))));
    }

    function push(
        Uint256List storage self,
        uint256 value
    ) internal returns (bool status) {
        status = _push(self._inner, bytes32(value));
    }

    function pop(Bytes32List storage self) internal returns (bytes32 value) {
        value = _pop(self._inner);
    }

    function pop(AddressList storage self) internal returns (address value) {
        value = address(uint160(uint256(_pop(self._inner))));
    }

    function pop(Uint256List storage self) internal returns (uint256 value) {
        value = uint256(_pop(self._inner));
    }

    function shift(Bytes32List storage self) internal returns (bytes32 value) {
        value = _shift(self._inner);
    }

    function shift(AddressList storage self) internal returns (address value) {
        value = address(uint160(uint256(_shift(self._inner))));
    }

    function shift(Uint256List storage self) internal returns (uint256 value) {
        value = uint256(_shift(self._inner));
    }

    function unshift(
        Bytes32List storage self,
        bytes32 value
    ) internal returns (bool status) {
        status = _unshift(self._inner, value);
    }

    function unshift(
        AddressList storage self,
        address value
    ) internal returns (bool status) {
        status = _unshift(self._inner, bytes32(uint256(uint160(value))));
    }

    function unshift(
        Uint256List storage self,
        uint256 value
    ) internal returns (bool status) {
        status = _unshift(self._inner, bytes32(value));
    }

    function remove(
        Bytes32List storage self,
        bytes32 value
    ) internal returns (bool status) {
        status = _remove(self._inner, value);
    }

    function remove(
        AddressList storage self,
        address value
    ) internal returns (bool status) {
        status = _remove(self._inner, bytes32(uint256(uint160(value))));
    }

    function remove(
        Uint256List storage self,
        uint256 value
    ) internal returns (bool status) {
        status = _remove(self._inner, bytes32(value));
    }

    function replace(
        Bytes32List storage self,
        bytes32 oldValue,
        bytes32 newValue
    ) internal returns (bool status) {
        status = _replace(self._inner, oldValue, newValue);
    }

    function replace(
        AddressList storage self,
        address oldValue,
        address newValue
    ) internal returns (bool status) {
        status = _replace(
            self._inner,
            bytes32(uint256(uint160(oldValue))),
            bytes32(uint256(uint160(newValue)))
        );
    }

    function replace(
        Uint256List storage self,
        uint256 oldValue,
        uint256 newValue
    ) internal returns (bool status) {
        status = _replace(self._inner, bytes32(oldValue), bytes32(newValue));
    }

    function toArray(
        Bytes32List storage self,
        bytes32 prevValue,
        uint256 count
    ) internal view returns (bytes32[] memory array) {
        array = _toArray(self._inner, prevValue, count);
    }

    function toArray(
        AddressList storage self,
        address prevValue,
        uint256 count
    ) internal view returns (address[] memory array) {
        bytes32[] memory bytes32Array = _toArray(
            self._inner,
            bytes32(uint256(uint160(prevValue))),
            count
        );

        assembly {
            array := bytes32Array
        }
    }

    function toArray(
        Uint256List storage self,
        uint256 prevValue,
        uint256 count
    ) internal view returns (uint256[] memory array) {
        bytes32[] memory bytes32Array = _toArray(
            self._inner,
            bytes32(prevValue),
            count
        );

        assembly {
            array := bytes32Array
        }
    }

    function _contains(
        _DoublyLinkedList storage self,
        bytes32 value
    ) private view returns (bool) {
        return
            value != 0 &&
            (self._nextValues[value] != 0 || self._prevValues[0] == value);
    }

    function _prev(
        _DoublyLinkedList storage self,
        bytes32 nextValue
    ) private view returns (bytes32 prevValue) {
        prevValue = self._prevValues[nextValue];
        if (
            nextValue != 0 &&
            prevValue == 0 &&
            _next(self, prevValue) != nextValue
        ) revert DoublyLinkedList__NonExistentEntry();
    }

    function _next(
        _DoublyLinkedList storage self,
        bytes32 prevValue
    ) private view returns (bytes32 nextValue) {
        nextValue = self._nextValues[prevValue];
        if (
            prevValue != 0 &&
            nextValue == 0 &&
            _prev(self, nextValue) != prevValue
        ) revert DoublyLinkedList__NonExistentEntry();
    }

    function _insertBefore(
        _DoublyLinkedList storage self,
        bytes32 nextValue,
        bytes32 newValue
    ) private returns (bool status) {
        status = _insertBetween(
            self,
            _prev(self, nextValue),
            nextValue,
            newValue
        );
    }

    function _insertAfter(
        _DoublyLinkedList storage self,
        bytes32 prevValue,
        bytes32 newValue
    ) private returns (bool status) {
        status = _insertBetween(
            self,
            prevValue,
            _next(self, prevValue),
            newValue
        );
    }

    function _insertBetween(
        _DoublyLinkedList storage self,
        bytes32 prevValue,
        bytes32 nextValue,
        bytes32 newValue
    ) private returns (bool status) {
        if (newValue == 0) revert DoublyLinkedList__InvalidInput();

        if (!_contains(self, newValue)) {
            _link(self, prevValue, newValue);
            _link(self, newValue, nextValue);
            status = true;
        }
    }

    function _push(
        _DoublyLinkedList storage self,
        bytes32 value
    ) private returns (bool status) {
        status = _insertBetween(self, _prev(self, 0), 0, value);
    }

    function _pop(
        _DoublyLinkedList storage self
    ) private returns (bytes32 value) {
        value = _prev(self, 0);
        _remove(self, value);
    }

    function _shift(
        _DoublyLinkedList storage self
    ) private returns (bytes32 value) {
        value = _next(self, 0);
        _remove(self, value);
    }

    function _unshift(
        _DoublyLinkedList storage self,
        bytes32 value
    ) private returns (bool status) {
        status = _insertBetween(self, 0, _next(self, 0), value);
    }

    function _remove(
        _DoublyLinkedList storage self,
        bytes32 value
    ) private returns (bool status) {
        if (_contains(self, value)) {
            _link(self, _prev(self, value), _next(self, value));
            delete self._prevValues[value];
            delete self._nextValues[value];
            status = true;
        }
    }

    function _replace(
        _DoublyLinkedList storage self,
        bytes32 oldValue,
        bytes32 newValue
    ) private returns (bool status) {
        if (!_contains(self, oldValue))
            revert DoublyLinkedList__NonExistentEntry();

        status = _insertBetween(
            self,
            _prev(self, oldValue),
            _next(self, oldValue),
            newValue
        );

        if (status) {
            delete self._prevValues[oldValue];
            delete self._nextValues[oldValue];
        }
    }

    function _toArray(
        _DoublyLinkedList storage self,
        bytes32 prevValue,
        uint256 count
    ) private view returns (bytes32[] memory array) {
        array = new bytes32[](count);

        for (uint i; i < count; i++) {
            bytes32 nextValue = self._nextValues[prevValue];

            if (nextValue == 0) {
                if (i == 0 && _prev(self, 0) != prevValue)
                    revert DoublyLinkedList__NonExistentEntry();

                // truncate the array if end of list is reached
                assembly {
                    mstore(array, i)
                }

                break;
            }

            array[i] = prevValue = nextValue;
        }
    }

    function _link(
        _DoublyLinkedList storage self,
        bytes32 prevValue,
        bytes32 nextValue
    ) private {
        self._nextValues[prevValue] = nextValue;
        self._prevValues[nextValue] = prevValue;
    }
}
