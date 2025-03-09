// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1271 } from '../../interfaces/IERC1271.sol';
import { IERC1271Base } from './IERC1271Base.sol';
import { _ERC1271Base } from './_ERC1271Base.sol';

/**
 * @title Base implementation of ERC1721
 * @dev _isValidSignature function must be overridden with application-specific logic
 */
abstract contract ERC1271Base is IERC1271Base, _ERC1271Base {
    /**
     * @inheritdoc IERC1271
     */
    function isValidSignature(
        bytes32 hash,
        bytes memory signature
    ) external view returns (bytes4) {
        return _isValidSignature(hash, signature);
    }
}
