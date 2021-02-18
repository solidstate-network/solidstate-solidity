// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './IERC1271.sol';

/**
 * @title Base implementation of ERC1721
 * @dev _isValidSignature function must be overridden with application-specific logic
 */
abstract contract ERC1271Base is IERC1271 {
  bytes4 internal constant MAGIC_VALUE = IERC1271.isValidSignature.selector;

  /**
   * @inheritdoc IERC1271
   */
  function isValidSignature (
    bytes32 hash,
    bytes memory signature
  ) override external view returns (bytes4 magicValue) {
    if (_isValidSignature(hash, signature)) {
      magicValue = MAGIC_VALUE;
    }
  }

  /**
   * @notice return whether given signature is valid
   * @param hash hashed data
   * @param signature signed hash
   * @return whether given signature is valid
   */
  function _isValidSignature (
    bytes32 hash,
    bytes memory signature
  ) virtual internal view returns (bool);
}
