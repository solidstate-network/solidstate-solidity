// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC1404 } from '../../../interfaces/IERC1404.sol';
import { _FungibleToken } from '../_FungibleToken.sol';
import { FungibleToken } from '../FungibleToken.sol';
import { _RestrictedFungibleToken } from './_RestrictedFungibleToken.sol';
import { IRestrictedFungibleToken } from './IRestrictedFungibleToken.sol';

/**
 * @title Base ERC1404 implementation
 */
abstract contract RestrictedFungibleToken is
    IRestrictedFungibleToken,
    _RestrictedFungibleToken,
    FungibleToken
{
    /**
     * @inheritdoc IERC1404
     */
    function detectTransferRestriction(
        address from,
        address to,
        uint256 amount
    ) external view returns (uint8) {
        return _detectTransferRestriction(from, to, amount);
    }

    /**
     * @dev this implementation reads restriction messages from storage
     * @inheritdoc IERC1404
     */
    function messageForTransferRestriction(
        uint8 restrictionCode
    ) external view returns (string memory) {
        return _messageForTransferRestriction(restrictionCode);
    }

    /**
     * @notice ERC20 hook: detect and handle transfer restriction
     * @inheritdoc _RestrictedFungibleToken
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(_RestrictedFungibleToken, _FungibleToken) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
