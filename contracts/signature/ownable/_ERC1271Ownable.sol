// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _Ownable } from '../../access/ownable/_Ownable.sol';
import { ECDSA } from '../../cryptography/ECDSA.sol';
import { _ERC1271Base } from '../base/_ERC1271Base.sol';
import { _IERC1271Ownable } from './_IERC1271Ownable.sol';

/**
 * @title ERC1271Ownable internal functions
 */
abstract contract _ERC1271Ownable is _IERC1271Ownable, _ERC1271Base, _Ownable {
    using ECDSA for bytes32;

    /**
     * @inheritdoc _ERC1271Base
     * @notice return whether given signature is signed by contract owner
     */
    function _isValidSignature(
        bytes32 hash,
        bytes memory signature
    ) internal view override returns (bytes4 magicValue) {
        return
            hash.toEthSignedMessageHash().recover(signature) == _owner()
                ? MAGIC_VALUE
                : bytes4(0);
    }
}
