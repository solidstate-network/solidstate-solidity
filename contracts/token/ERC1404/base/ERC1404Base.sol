// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1404 } from '../../../interfaces/IERC1404.sol';
import { FungibleTokenBase } from '../../fungible/base/FungibleTokenBase.sol';
import { _FungibleTokenBase } from '../../fungible/base/_FungibleTokenBase.sol';
import { IERC1404Base } from './IERC1404Base.sol';
import { _ERC1404Base } from './_ERC1404Base.sol';

/**
 * @title Base ERC1404 implementation
 */
abstract contract ERC1404Base is IERC1404Base, _ERC1404Base, FungibleTokenBase {
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
     * @inheritdoc _ERC1404Base
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(_ERC1404Base, _FungibleTokenBase) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
