// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1404 } from '../../../interfaces/IERC1404.sol';
import { ERC20Base, ERC20BaseInternal } from '../../ERC20/base/ERC20Base.sol';
import { IERC1404Base } from './IERC1404Base.sol';
import { ERC1404BaseInternal } from './ERC1404BaseInternal.sol';

/**
 * @title Base ERC1404 implementation
 */
abstract contract ERC1404Base is IERC1404Base, ERC1404BaseInternal, ERC20Base {
    /**
     * @inheritdoc IERC1404
     */
    function detectTransferRestriction(
        address from,
        address to,
        uint256 amount
    ) public view returns (uint8) {
        return _detectTransferRestriction(from, to, amount);
    }

    /**
     * @dev this implementation reads restriction messages from storage
     * @inheritdoc IERC1404
     */
    function messageForTransferRestriction(
        uint8 restrictionCode
    ) public view returns (string memory) {
        return _messageForTransferRestriction(restrictionCode);
    }

    /**
     * @notice ERC20 hook: detect and handle transfer restriction
     * @inheritdoc ERC1404BaseInternal
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override(ERC1404BaseInternal, ERC20BaseInternal) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
