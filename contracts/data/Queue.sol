// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title Queue implementation with enumeration functions
 */
library Queue {
    struct QueueInternal {
        mapping(bytes32 => bytes32) _asc;
        mapping(bytes32 => bytes32) _desc;
    }

    struct Bytes32Queue {
        QueueInternal _inner;
    }

    struct AddressQueue {
        QueueInternal _inner;
    }

    struct UintQueue {
        QueueInternal _inner;
    }

    function contains(Bytes32Queue storage queue, bytes32 value)
        internal
        view
        returns (bool)
    {
        return _contains(queue._inner, value);
    }

    function contains(AddressQueue storage queue, address value)
        internal
        view
        returns (bool)
    {
        return _contains(queue._inner, bytes32(uint256(uint160(value))));
    }

    function contains(UintQueue storage queue, uint256 value)
        internal
        view
        returns (bool)
    {
        return _contains(queue._inner, bytes32(value));
    }

    function prev(Bytes32Queue storage queue, bytes32 value)
        internal
        view
        returns (bytes32)
    {
        return _prev(queue._inner, value);
    }

    function prev(AddressQueue storage queue, address value)
        internal
        view
        returns (address)
    {
        return
            address(
                uint160(
                    uint256(
                        _prev(queue._inner, bytes32(uint256(uint160(value))))
                    )
                )
            );
    }

    function prev(UintQueue storage queue, uint256 value)
        internal
        view
        returns (uint256)
    {
        return uint256(_prev(queue._inner, bytes32(value)));
    }

    function next(Bytes32Queue storage queue, bytes32 value)
        internal
        view
        returns (bytes32)
    {
        return _next(queue._inner, value);
    }

    function next(AddressQueue storage queue, address value)
        internal
        view
        returns (address)
    {
        return
            address(
                uint160(
                    uint256(
                        _next(queue._inner, bytes32(uint256(uint160(value))))
                    )
                )
            );
    }

    function next(UintQueue storage queue, uint256 value)
        internal
        view
        returns (uint256)
    {
        return uint256(_next(queue._inner, bytes32(value)));
    }

    function add(Bytes32Queue storage queue, bytes32 value)
        internal
        returns (bool)
    {
        return _add(queue._inner, value);
    }

    function add(AddressQueue storage queue, address value)
        internal
        returns (bool)
    {
        return _add(queue._inner, bytes32(uint256(uint160(value))));
    }

    function add(UintQueue storage queue, uint256 value)
        internal
        returns (bool)
    {
        return _add(queue._inner, bytes32(value));
    }

    function remove(Bytes32Queue storage queue, bytes32 value)
        internal
        returns (bool)
    {
        return _remove(queue._inner, value);
    }

    function remove(AddressQueue storage queue, address value)
        internal
        returns (bool)
    {
        return _remove(queue._inner, bytes32(uint256(uint160(value))));
    }

    function remove(UintQueue storage queue, uint256 value)
        internal
        returns (bool)
    {
        return _remove(queue._inner, bytes32(value));
    }

    function _contains(QueueInternal storage queue, bytes32 value)
        private
        view
        returns (bool)
    {
        return _contains(value, queue._asc, queue._desc);
    }

    function _contains(
        bytes32 value,
        mapping(bytes32 => bytes32) storage asc,
        mapping(bytes32 => bytes32) storage desc
    ) private view returns (bool) {
        return asc[value] != 0 || desc[0] == value;
    }

    function _prev(QueueInternal storage queue, bytes32 value)
        private
        view
        returns (bytes32)
    {
        return queue._desc[value];
    }

    function _next(QueueInternal storage queue, bytes32 value)
        private
        view
        returns (bytes32)
    {
        return queue._asc[value];
    }

    function _add(QueueInternal storage queue, bytes32 value)
        private
        returns (bool)
    {
        mapping(bytes32 => bytes32) storage asc = queue._asc;
        mapping(bytes32 => bytes32) storage desc = queue._desc;

        if (_contains(value, asc, desc)) return false;

        bytes32 last = desc[0];
        asc[last] = value;
        desc[value] = last;
        desc[0] = value;

        return true;
    }

    function _remove(QueueInternal storage queue, bytes32 value)
        private
        returns (bool)
    {
        mapping(bytes32 => bytes32) storage asc = queue._asc;
        mapping(bytes32 => bytes32) storage desc = queue._desc;

        if (!_contains(value, asc, desc)) return false;

        bytes32 prevValue = desc[value];
        bytes32 nextValue = asc[value];
        asc[prevValue] = nextValue;
        desc[nextValue] = prevValue;
        delete asc[value];
        delete desc[value];

        return true;
    }
}
