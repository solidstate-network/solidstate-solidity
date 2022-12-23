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
        Bytes32DoublyLinkedList storage queue,
        bytes32 value
    ) internal view returns (bool) {
        return _contains(queue._inner, value);
    }

    function contains(
        AddressDoublyLinkedList storage queue,
        address value
    ) internal view returns (bool) {
        return _contains(queue._inner, bytes32(uint256(uint160(value))));
    }

    function contains(
        UintDoublyLinkedList storage queue,
        uint256 value
    ) internal view returns (bool) {
        return _contains(queue._inner, bytes32(value));
    }

    function prev(
        Bytes32DoublyLinkedList storage queue,
        bytes32 value
    ) internal view returns (bytes32) {
        return _prev(queue._inner, value);
    }

    function prev(
        AddressDoublyLinkedList storage queue,
        address value
    ) internal view returns (address) {
        return
            address(
                uint160(
                    uint256(
                        _prev(queue._inner, bytes32(uint256(uint160(value))))
                    )
                )
            );
    }

    function prev(
        UintDoublyLinkedList storage queue,
        uint256 value
    ) internal view returns (uint256) {
        return uint256(_prev(queue._inner, bytes32(value)));
    }

    function next(
        Bytes32DoublyLinkedList storage queue,
        bytes32 value
    ) internal view returns (bytes32) {
        return _next(queue._inner, value);
    }

    function next(
        AddressDoublyLinkedList storage queue,
        address value
    ) internal view returns (address) {
        return
            address(
                uint160(
                    uint256(
                        _next(queue._inner, bytes32(uint256(uint160(value))))
                    )
                )
            );
    }

    function next(
        UintDoublyLinkedList storage queue,
        uint256 value
    ) internal view returns (uint256) {
        return uint256(_next(queue._inner, bytes32(value)));
    }

    function insertBefore(
        Bytes32DoublyLinkedList storage queue,
        bytes32 nextValue,
        bytes32 newValue
    ) internal returns (bool status) {
        status = _insertBefore(queue._inner, nextValue, newValue);
    }

    function insertBefore(
        AddressDoublyLinkedList storage queue,
        address nextValue,
        address newValue
    ) internal returns (bool status) {
        status = _insertBefore(
            queue._inner,
            bytes32(uint256(uint160(nextValue))),
            bytes32(uint256(uint160(newValue)))
        );
    }

    function insertBefore(
        UintDoublyLinkedList storage queue,
        uint256 nextValue,
        uint256 newValue
    ) internal returns (bool status) {
        status = _insertBefore(
            queue._inner,
            bytes32(nextValue),
            bytes32(newValue)
        );
    }

    function insertAfter(
        Bytes32DoublyLinkedList storage queue,
        bytes32 prevValue,
        bytes32 newValue
    ) internal returns (bool status) {
        status = _insertAfter(queue._inner, prevValue, newValue);
    }

    function insertAfter(
        AddressDoublyLinkedList storage queue,
        address prevValue,
        address newValue
    ) internal returns (bool status) {
        status = _insertAfter(
            queue._inner,
            bytes32(uint256(uint160(prevValue))),
            bytes32(uint256(uint160(newValue)))
        );
    }

    function insertAfter(
        UintDoublyLinkedList storage queue,
        uint256 prevValue,
        uint256 newValue
    ) internal returns (bool status) {
        status = _insertAfter(
            queue._inner,
            bytes32(prevValue),
            bytes32(newValue)
        );
    }

    function push(
        Bytes32DoublyLinkedList storage queue,
        bytes32 value
    ) internal returns (bool status) {
        status = _push(queue._inner, value);
    }

    function push(
        AddressDoublyLinkedList storage queue,
        address value
    ) internal returns (bool status) {
        status = _push(queue._inner, bytes32(uint256(uint160(value))));
    }

    function push(
        UintDoublyLinkedList storage queue,
        uint256 value
    ) internal returns (bool status) {
        status = _push(queue._inner, bytes32(value));
    }

    function pop(
        Bytes32DoublyLinkedList storage queue
    ) internal returns (bytes32 value) {
        value = _pop(queue._inner);
    }

    function pop(
        AddressDoublyLinkedList storage queue
    ) internal returns (address value) {
        value = address(uint160(uint256(_pop(queue._inner))));
    }

    function pop(
        UintDoublyLinkedList storage queue
    ) internal returns (uint256 value) {
        value = uint256(_pop(queue._inner));
    }

    function shift(
        Bytes32DoublyLinkedList storage queue
    ) internal returns (bytes32 value) {
        value = _shift(queue._inner);
    }

    function shift(
        AddressDoublyLinkedList storage queue
    ) internal returns (address value) {
        value = address(uint160(uint256(_shift(queue._inner))));
    }

    function shift(
        UintDoublyLinkedList storage queue
    ) internal returns (uint256 value) {
        value = uint256(_shift(queue._inner));
    }

    function unshift(
        Bytes32DoublyLinkedList storage queue,
        bytes32 value
    ) internal returns (bool status) {
        status = _unshift(queue._inner, value);
    }

    function unshift(
        AddressDoublyLinkedList storage queue,
        address value
    ) internal returns (bool status) {
        status = _unshift(queue._inner, bytes32(uint256(uint160(value))));
    }

    function unshift(
        UintDoublyLinkedList storage queue,
        uint256 value
    ) internal returns (bool status) {
        status = _unshift(queue._inner, bytes32(value));
    }

    function remove(
        Bytes32DoublyLinkedList storage queue,
        bytes32 value
    ) internal returns (bool status) {
        status = _remove(queue._inner, value);
    }

    function remove(
        AddressDoublyLinkedList storage queue,
        address value
    ) internal returns (bool status) {
        status = _remove(queue._inner, bytes32(uint256(uint160(value))));
    }

    function remove(
        UintDoublyLinkedList storage queue,
        uint256 value
    ) internal returns (bool status) {
        status = _remove(queue._inner, bytes32(value));
    }

    function _contains(
        DoublyLinkedListInternal storage queue,
        bytes32 value
    ) private view returns (bool) {
        return queue._asc[value] != 0 || queue._desc[0] == value;
    }

    function _prev(
        DoublyLinkedListInternal storage queue,
        bytes32 value
    ) private view returns (bytes32) {
        return queue._desc[value];
    }

    function _next(
        DoublyLinkedListInternal storage queue,
        bytes32 value
    ) private view returns (bytes32) {
        return queue._asc[value];
    }

    function _insertBefore(
        DoublyLinkedListInternal storage queue,
        bytes32 nextValue,
        bytes32 newValue
    ) private returns (bool status) {
        status = _insertBetween(
            queue,
            _prev(queue, nextValue),
            nextValue,
            newValue
        );
    }

    function _insertAfter(
        DoublyLinkedListInternal storage queue,
        bytes32 prevValue,
        bytes32 newValue
    ) private returns (bool status) {
        status = _insertBetween(
            queue,
            prevValue,
            _next(queue, prevValue),
            newValue
        );
    }

    function _insertBetween(
        DoublyLinkedListInternal storage queue,
        bytes32 prevValue,
        bytes32 nextValue,
        bytes32 newValue
    ) private returns (bool status) {
        if (newValue == bytes32(0)) revert DoublyLinkedList__InvalidValue();

        if (!_contains(queue, newValue)) {
            _link(queue, prevValue, newValue);
            _link(queue, newValue, nextValue);
            status = true;
        }
    }

    function _push(
        DoublyLinkedListInternal storage queue,
        bytes32 value
    ) private returns (bool status) {
        status = _insertBetween(queue, _prev(queue, 0), 0, value);
    }

    function _pop(
        DoublyLinkedListInternal storage queue
    ) private returns (bytes32 value) {
        value = _prev(queue, 0);
        _remove(queue, value);
    }

    function _shift(
        DoublyLinkedListInternal storage queue
    ) private returns (bytes32 value) {
        value = _next(queue, 0);
        _remove(queue, value);
    }

    function _unshift(
        DoublyLinkedListInternal storage queue,
        bytes32 value
    ) private returns (bool status) {
        status = _insertBetween(queue, 0, _next(queue, 0), value);
    }

    function _remove(
        DoublyLinkedListInternal storage queue,
        bytes32 value
    ) private returns (bool status) {
        if (_contains(queue, value)) {
            _link(queue, _prev(queue, value), _next(queue, value));
            delete queue._desc[value];
            delete queue._asc[value];
            status = true;
        }
    }

    function _link(
        DoublyLinkedListInternal storage queue,
        bytes32 prevValue,
        bytes32 nextValue
    ) private {
        queue._asc[prevValue] = nextValue;
        queue._desc[nextValue] = prevValue;
    }
}
