// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title ERC1271Base internal functions
 * @dev _isValidSignature function must be overridden with application-specific logic
 */
abstract contract ERC1271BaseInternal {
    /**
     * @notice return whether given signature is valid
     * @param hash hashed data
     * @param signature signed hash
     * @return whether given signature is valid
     */
    function _isValidSignature(bytes32 hash, bytes memory signature)
        internal
        view
        virtual
        returns (bool);
}
