// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1271Internal } from './IERC1271Internal.sol';

interface IERC1271 is IERC1271Internal {
    /**
     * @notice return ERC1271 magic value if given signature is valid for contract
     * @param hash hashed data
     * @param signature signed hash
     * @return magicValue ERC1271 magic value or null bytes
     */
    function isValidSignature(
        bytes32 hash,
        bytes memory signature
    ) external view returns (bytes4 magicValue);
}
