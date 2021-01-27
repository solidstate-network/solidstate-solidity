// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '../access/OwnableStorage.sol';
import '../cryptography/ECDSA.sol';
import './ERC1271Base.sol';

abstract contract ERC1271Ownable is ERC1271Base {
  using ECDSA for bytes32;

  /**
   * @notice return whether given signature is signed by contract owner
   */
  function _isValidSignature (
    bytes32 hash,
    bytes memory signature
  ) override internal view returns (bool) {
    return hash.toEthSignedMessageHash().recover(signature) == OwnableStorage.layout().owner;
  }
}
