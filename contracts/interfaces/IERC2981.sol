// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC165 } from './IERC165.sol';

/**
 * @title ERC2981 interface
 * @dev see https://eips.ethereum.org/EIPS/eip-2981
 */
interface IERC2981 is IERC165 {
    /**
     * @notice called with the sale price to determine how much royalty is owed and to whom.
     * @param tokenId the NFT asset queried for royalty information
     * @param salePrice the sale price of the NFT asset specified by tokenId
     * @return address of who should be sent the royalty payment
     * @return the royalty payment amount for salePrice
     */
    function royaltyInfo(uint256 tokenId, uint256 salePrice)
        external
        view
        returns (address, uint256);
}
