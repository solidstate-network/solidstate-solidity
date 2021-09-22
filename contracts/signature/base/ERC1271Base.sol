// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IERC1271 } from '../IERC1271.sol';
import { ERC1271BaseInternal } from './ERC1271BaseInternal.sol';

/**
 * @title Base implementation of ERC1721
 * @dev _isValidSignature function must be overridden with application-specific logic
 */
abstract contract ERC1271Base is IERC1271, ERC1271BaseInternal {
    bytes4 internal constant MAGIC_VALUE = IERC1271.isValidSignature.selector;

    /**
     * @inheritdoc IERC1271
     */
    function isValidSignature(bytes32 hash, bytes memory signature)
        external
        view
        override
        returns (bytes4 magicValue)
    {
        if (_isValidSignature(hash, signature)) {
            magicValue = MAGIC_VALUE;
        }
    }
}
