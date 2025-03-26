// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC165 } from './IERC165.sol';
import { _IERC2981 } from './_IERC2981.sol';

/**
 * @title ERC2981 interface
 * @dev see https://eips.ethereum.org/EIPS/eip-2981
 */
interface IERC2981 is _IERC2981, IERC165 {
    /**
     * @notice called with the sale price to determine how much royalty is owed and to whom
     * @param tokenId the ERC721 or ERC1155 token id to query for royalty information
     * @param salePrice the sale price of the given asset
     * @return receiver rightful recipient of royalty
     * @return royaltyAmount amount of royalty owed
     */
    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view returns (address receiver, uint256 royaltyAmount);
}
