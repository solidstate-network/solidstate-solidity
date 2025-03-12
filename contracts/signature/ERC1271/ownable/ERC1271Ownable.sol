// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ERC1271Base } from '../base/ERC1271Base.sol';
import { _ERC1271Base } from '../base/_ERC1271Base.sol';
import { IERC1271Ownable } from './IERC1271Ownable.sol';
import { _ERC1271Ownable } from './_ERC1271Ownable.sol';

/**
 * @title ERC1271 implementation which delegates signing authority to ERC173 contract owner
 */
abstract contract ERC1271Ownable is
    IERC1271Ownable,
    _ERC1271Ownable,
    ERC1271Base
{
    /**
     * @inheritdoc _ERC1271Ownable
     */
    function _isValidSignature(
        bytes32 hash,
        bytes memory signature
    )
        internal
        view
        virtual
        override(_ERC1271Base, _ERC1271Ownable)
        returns (bytes4 magicValue)
    {
        magicValue = super._isValidSignature(hash, signature);
    }
}
