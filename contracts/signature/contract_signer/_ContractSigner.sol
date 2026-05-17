// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IERC1271 } from '../../interfaces/IERC1271.sol';
import { ERC1271Storage } from '../../storage/ERC1271Storage.sol';
import { _IContractSigner } from './_IContractSigner.sol';

/**
 * @title ContractSigner internal functions
 */
abstract contract _ContractSigner is _IContractSigner {
    bytes4 internal constant MAGIC_VALUE = IERC1271.isValidSignature.selector;

    /**
     * @notice return whether given signature is valid
     * @param hash hashed data
     * @param signature signed hash
     * @return magicValue ERC1271 magic value or null bytes
     */
    function _isValidSignature(
        bytes32 hash,
        bytes memory signature
    ) internal view virtual returns (bytes4 magicValue) {
        signature;

        return
            ERC1271Storage.layout(ERC1271Storage.DEFAULT_STORAGE_SLOT).hashes[
                hash
            ]
                ? MAGIC_VALUE
                : bytes4(0);
    }

    function _setValidSignature(bytes32 hash, bool status) internal virtual {
        ERC1271Storage.layout(ERC1271Storage.DEFAULT_STORAGE_SLOT).hashes[
            hash
        ] = status;
    }
}
