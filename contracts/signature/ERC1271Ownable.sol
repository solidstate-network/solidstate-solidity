// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '../access/OwnableStorage.sol';
import '../cryptography/ECDSA.sol';
import './ERC1271Base.sol';

/**
 * @title ERC1271 implementation which delegates signing authority to ERC173 contract owner
 */
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
