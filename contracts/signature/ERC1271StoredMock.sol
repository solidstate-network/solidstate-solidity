// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ERC1271StoredStorage.sol';
import './ERC1271Stored.sol';

contract ERC1271StoredMock is ERC1271Stored {
  constructor (
    bytes32 hash,
    bytes memory signature
  ) {
    ERC1271StoredStorage.layout().hashes[hash] = true;
  }

  function __isValidSignature (
    bytes32 hash,
    bytes memory signature
  ) external view returns (bool) {
    return _isValidSignature(hash, signature);
  }

  function __setValidSignature (
    bytes32 hash,
    bool status
  ) external {
    _setValidSignature(hash, status);
  }
}
