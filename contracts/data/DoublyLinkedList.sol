// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title Doubly linked list implementation with enumeration functions
 */
library DoublyLinkedList {
    struct DoublyLinkedListInternal {
        mapping(bytes32 => bytes32) _asc;
        mapping(bytes32 => bytes32) _desc;
    }

    struct Bytes32DoublyLinkedList {
        DoublyLinkedListInternal _inner;
    }

    struct AddressDoublyLinkedList {
        DoublyLinkedListInternal _inner;
    }

    struct UintDoublyLinkedList {
        DoublyLinkedListInternal _inner;
    }

    error DoublyLinkedList__InvalidValue();

    function contains(
        Bytes32DoublyLinkedList storage self,
        bytes32 value
    ) internal view returns (bool) {
        return _contains(self._inner, value);
    }

    function contains(
        AddressDoublyLinkedList storage self,
        address value
    ) internal view returns (bool) {
        return _contains(self._inner, bytes32(uint256(uint160(value))));
    }

    function contains(
        UintDoublyLinkedList storage self,
        uint256 value
    ) internal view returns (bool) {
        return _contains(self._inner, bytes32(value));
    }

    function prev(
        Bytes32DoublyLinkedList storage self,
        bytes32 value
    ) internal view returns (bytes32) {
        return _prev(self._inner, value);
    }

    function prev(
        AddressDoublyLinkedList storage self,
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
        UintDoublyLinkedList storage self,
        uint256 value
    ) internal view returns (uint256) {
        return uint256(_prev(self._inner, bytes32(value)));
    }

    function next(
        Bytes32DoublyLinkedList storage self,
        bytes32 value
    ) internal view returns (bytes32) {
        return _next(self._inner, value);
    }

    function next(
        AddressDoublyLinkedList storage self,
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
        UintDoublyLinkedList storage self,
        uint256 value
    ) internal view returns (uint256) {
        return uint256(_next(self._inner, bytes32(value)));
    }

    function insertBefore(
        Bytes32DoublyLinkedList storage self,
        bytes32 nextValue,
        bytes32 newValue
    ) internal returns (bool status) {
        status = _insertBefore(self._inner, nextValue, newValue);
    }

    function insertBefore(
        AddressDoublyLinkedList storage self,
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
        UintDoublyLinkedList storage self,
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
        Bytes32DoublyLinkedList storage self,
        bytes32 prevValue,
        bytes32 newValue
    ) internal returns (bool status) {
        status = _insertAfter(self._inner, prevValue, newValue);
    }

    function insertAfter(
        AddressDoublyLinkedList storage self,
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
        UintDoublyLinkedList storage self,
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
        Bytes32DoublyLinkedList storage self,
        bytes32 value
    ) internal returns (bool status) {
        status = _push(self._inner, value);
    }

    function push(
        AddressDoublyLinkedList storage self,
        address value
    ) internal returns (bool status) {
        status = _push(self._inner, bytes32(uint256(uint160(value))));
    }

    function push(
        UintDoublyLinkedList storage self,
        uint256 value
    ) internal returns (bool status) {
        status = _push(self._inner, bytes32(value));
    }

    function pop(
        Bytes32DoublyLinkedList storage self
    ) internal returns (bytes32 value) {
        value = _pop(self._inner);
    }

    function pop(
        AddressDoublyLinkedList storage self
    ) internal returns (address value) {
        value = address(uint160(uint256(_pop(self._inner))));
    }

    function pop(
        UintDoublyLinkedList storage self
    ) internal returns (uint256 value) {
        value = uint256(_pop(self._inner));
    }

    function shift(
        Bytes32DoublyLinkedList storage self
    ) internal returns (bytes32 value) {
        value = _shift(self._inner);
    }

    function shift(
        AddressDoublyLinkedList storage self
    ) internal returns (address value) {
        value = address(uint160(uint256(_shift(self._inner))));
    }

    function shift(
        UintDoublyLinkedList storage self
    ) internal returns (uint256 value) {
        value = uint256(_shift(self._inner));
    }

    function unshift(
        Bytes32DoublyLinkedList storage self,
        bytes32 value
    ) internal returns (bool status) {
        status = _unshift(self._inner, value);
    }

    function unshift(
        AddressDoublyLinkedList storage self,
        address value
    ) internal returns (bool status) {
        status = _unshift(self._inner, bytes32(uint256(uint160(value))));
    }

    function unshift(
        UintDoublyLinkedList storage self,
        uint256 value
    ) internal returns (bool status) {
        status = _unshift(self._inner, bytes32(value));
    }

    function remove(
        Bytes32DoublyLinkedList storage self,
        bytes32 value
    ) internal returns (bool status) {
        status = _remove(self._inner, value);
    }

    function remove(
        AddressDoublyLinkedList storage self,
        address value
    ) internal returns (bool status) {
        status = _remove(self._inner, bytes32(uint256(uint160(value))));
    }

    function remove(
        UintDoublyLinkedList storage self,
        uint256 value
    ) internal returns (bool status) {
        status = _remove(self._inner, bytes32(value));
    }

    function _contains(
        DoublyLinkedListInternal storage self,
        bytes32 value
    ) private view returns (bool) {
        return self._asc[value] != 0 || self._desc[0] == value;
    }

    function _prev(
        DoublyLinkedListInternal storage self,
        bytes32 value
    ) private view returns (bytes32) {
        return self._desc[value];
    }

    function _next(
        DoublyLinkedListInternal storage self,
        bytes32 value
    ) private view returns (bytes32) {
        return self._asc[value];
    }

    function _insertBefore(
        DoublyLinkedListInternal storage self,
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
        DoublyLinkedListInternal storage self,
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
        DoublyLinkedListInternal storage self,
        bytes32 prevValue,
        bytes32 nextValue,
        bytes32 newValue
    ) private returns (bool status) {
        if (newValue == bytes32(0)) revert DoublyLinkedList__InvalidValue();

        if (!_contains(self, newValue)) {
            _link(self, prevValue, newValue);
            _link(self, newValue, nextValue);
            status = true;
        }
    }

    function _push(
        DoublyLinkedListInternal storage self,
        bytes32 value
    ) private returns (bool status) {
        status = _insertBetween(self, _prev(self, 0), 0, value);
    }

    function _pop(
        DoublyLinkedListInternal storage self
    ) private returns (bytes32 value) {
        value = _prev(self, 0);
        _remove(self, value);
    }

    function _shift(
        DoublyLinkedListInternal storage self
    ) private returns (bytes32 value) {
        value = _next(self, 0);
        _remove(self, value);
    }

    function _unshift(
        DoublyLinkedListInternal storage self,
        bytes32 value
    ) private returns (bool status) {
        status = _insertBetween(self, 0, _next(self, 0), value);
    }

    function _remove(
        DoublyLinkedListInternal storage self,
        bytes32 value
    ) private returns (bool status) {
        if (_contains(self, value)) {
            _link(self, _prev(self, value), _next(self, value));
            delete self._desc[value];
            delete self._asc[value];
            status = true;
        }
    }

    function _link(
        DoublyLinkedListInternal storage self,
        bytes32 prevValue,
        bytes32 nextValue
    ) private {
        self._asc[prevValue] = nextValue;
        self._desc[nextValue] = prevValue;
    }
}
