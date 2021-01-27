// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '../access/OwnableStorage.sol';
import './ERC1271Ownable.sol';

contract ERC1271OwnableMock is ERC1271Ownable {
  constructor (
    address owner
  ) {
    OwnableStorage.layout().owner = owner;
  }

  function __isValidSignature (
    bytes32 hash,
    bytes memory signature
  ) external view returns (bool) {
    return _isValidSignature(hash, signature);
  }
}
