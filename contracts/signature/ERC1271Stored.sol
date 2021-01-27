// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import './ERC1271Base.sol';
import './ERC1271StoredStorage.sol';

abstract contract ERC1271Stored is ERC1271Base {
  function _isValidSignature (
    bytes32 hash,
    bytes memory
  ) virtual override internal view returns (bool) {
    return ERC1271StoredStorage.layout().hashes[hash];
  }

  function _setValidSignature (
    bytes32 hash,
    bool status
  ) internal {
    ERC1271StoredStorage.layout().hashes[hash] = status;
  }
}
