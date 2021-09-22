// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { OwnableStorage } from '../../access/OwnableStorage.sol';
import { ECDSA } from '../../cryptography/ECDSA.sol';
import { ERC1271BaseInternal } from '../base/ERC1271BaseInternal.sol';

/**
 * @title ERC1271Ownable internal functions
 */
abstract contract ERC1271OwnableInternal is ERC1271BaseInternal {
    using ECDSA for bytes32;

    /**
     * @inheritdoc ERC1271BaseInternal
     * @notice return whether given signature is signed by contract owner
     */
    function _isValidSignature(bytes32 hash, bytes memory signature)
        internal
        view
        override
        returns (bool)
    {
        return
            hash.toEthSignedMessageHash().recover(signature) ==
            OwnableStorage.layout().owner;
    }
}
