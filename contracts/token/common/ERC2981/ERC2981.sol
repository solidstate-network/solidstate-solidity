// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2981 } from '../../../interfaces/IERC2981.sol';

import { ERC2981Storage } from './ERC2981Storage.sol';
import { ERC2981Internal } from './ERC2981Internal.sol';

/**
 * @title ERC2981 implementation
 */
abstract contract ERC2981 is IERC2981, ERC2981Internal {
    /**
     * @notice inheritdoc IERC2981
     */
    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view returns (address, uint256) {
        return _royaltyInfo(tokenId, salePrice);
    }
}
