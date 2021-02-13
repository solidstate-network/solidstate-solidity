// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

/**
 * @title Set implementation
 * @dev derived from https://github.com/OpenZeppelin/openzeppelin-contracts (MIT license)
 */
library EnumerableSet {
  struct Set {
    bytes32[] _values;

    // 1-indexed to allow 0 to signify nonexistence
    mapping (bytes32 => uint) _indexes;
  }

  struct Bytes32Set {
    Set _inner;
  }

  struct AddressSet {
    Set _inner;
  }

  struct UintSet {
    Set _inner;
  }

  function at (
    Bytes32Set storage set,
    uint index
  ) internal view returns (bytes32) {
    return _at(set._inner, index);
  }

  function at (
    AddressSet storage set,
    uint index
  ) internal view returns (address) {
    return address(uint160(uint(_at(set._inner, index))));
  }

  function at (
    UintSet storage set,
    uint index
  ) internal view returns (uint) {
    return uint(_at(set._inner, index));
  }

  function contains (
    Bytes32Set storage set,
    bytes32 value
  ) internal view returns (bool) {
    return _contains(set._inner, value);
  }

  function contains (
    AddressSet storage set,
    address value
  ) internal view returns (bool) {
    return _contains(set._inner, bytes32(uint(uint160(value))));
  }

  function contains (
    UintSet storage set,
    uint value
  ) internal view returns (bool) {
    return _contains(set._inner, bytes32(value));
  }

  function indexOf (
    Bytes32Set storage set,
    bytes32 value
  ) internal view returns (uint) {
    return _indexOf(set._inner, value);
  }

  function indexOf (
    AddressSet storage set,
    address value
  ) internal view returns (uint) {
    return _indexOf(set._inner, bytes32(uint(uint160(value))));
  }

  function indexOf (
    UintSet storage set,
    uint value
  ) internal view returns (uint) {
    return _indexOf(set._inner, bytes32(value));
  }

  function length (
    Bytes32Set storage set
  ) internal view returns (uint) {
    return _length(set._inner);
  }

  function length (
    AddressSet storage set
  ) internal view returns (uint) {
    return _length(set._inner);
  }

  function length (
    UintSet storage set
  ) internal view returns (uint) {
    return _length(set._inner);
  }

  function add (
    Bytes32Set storage set,
    bytes32 value
  ) internal returns (bool) {
    return _add(set._inner, value);
  }

  function add (
    AddressSet storage set,
    address value
  ) internal returns (bool) {
    return _add(set._inner, bytes32(uint(uint160(value))));
  }

  function add (
    UintSet storage set,
    uint value
  ) internal returns (bool) {
    return _add(set._inner, bytes32(value));
  }

  function remove (
    Bytes32Set storage set,
    bytes32 value
  ) internal returns (bool) {
    return _remove(set._inner, value);
  }

  function remove (
    AddressSet storage set,
    address value
  ) internal returns (bool) {
    return _remove(set._inner, bytes32(uint(uint160(value))));
  }

  function remove (
    UintSet storage set,
    uint value
  ) internal returns (bool) {
    return _remove(set._inner, bytes32(value));
  }

  function _at (
    Set storage set,
    uint index
  ) private view returns (bytes32) {
    require(set._values.length > index, 'EnumerableSet: index out of bounds');
    return set._values[index];
  }

  function _contains (
    Set storage set,
    bytes32 value
  ) private view returns (bool) {
    return set._indexes[value] != 0;
  }

  function _indexOf (
    Set storage set,
    bytes32 value
  ) private view returns (uint) {
    return set._indexes[value] - 1;
  }

  function _length (
    Set storage set
  ) private view returns (uint) {
    return set._values.length;
  }

  function _add (
    Set storage set,
    bytes32 value
  ) private returns (bool) {
    if (!_contains(set, value)) {
      set._values.push(value);
      set._indexes[value] = set._values.length;
      return true;
    } else {
      return false;
    }
  }

  function _remove (
    Set storage set,
    bytes32 value
  ) private returns (bool) {
    uint valueIndex = set._indexes[value];

    if (valueIndex != 0) {
      uint index = valueIndex - 1;
      bytes32 last = set._values[set._values.length - 1];

      // move last value to now-vacant index

      set._values[index] = last;
      set._indexes[last] = index + 1;

      // clear last index

      set._values.pop();
      delete set._indexes[value];

      return true;
    } else {
      return false;
    }
  }
}
