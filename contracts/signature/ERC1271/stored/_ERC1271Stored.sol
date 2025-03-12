// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ERC1271Base } from '../base/_ERC1271Base.sol';
import { ERC1271StoredStorage } from './ERC1271StoredStorage.sol';
import { _IERC1271Stored } from './_IERC1271Stored.sol';

/**
 * @title ERC1271Stored internal functions
 */
abstract contract _ERC1271Stored is _IERC1271Stored, _ERC1271Base {
    function _isValidSignature(
        bytes32 hash,
        bytes memory
    ) internal view virtual override returns (bytes4 magicValue) {
        return
            ERC1271StoredStorage
                .layout(ERC1271StoredStorage.DEFAULT_STORAGE_SLOT)
                .hashes[hash]
                ? MAGIC_VALUE
                : bytes4(0);
    }

    function _setValidSignature(bytes32 hash, bool status) internal {
        ERC1271StoredStorage
            .layout(ERC1271StoredStorage.DEFAULT_STORAGE_SLOT)
            .hashes[hash] = status;
    }
}
