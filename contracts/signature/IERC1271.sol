// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC1271 {
    /**
     * @notice return ERC1271 magic value if given signature is valid for contract
     * @param hash hashed data
     * @param signature signed hash
     * @return magicValue ERC1271 magic value or null bytes
     */
    function isValidSignature(bytes32 hash, bytes memory signature)
        external
        view
        returns (bytes4 magicValue);
}
