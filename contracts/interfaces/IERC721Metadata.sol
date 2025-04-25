// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC721Metadata } from './_IERC721Metadata.sol';

interface IERC721Metadata is _IERC721Metadata {
    /**
     * @notice get token name
     * @return token name
     */
    function name() external view returns (string memory);

    /**
     * @notice get token symbol
     * @return token symbol
     */
    function symbol() external view returns (string memory);

    /**
     * @notice get generated URI for given token
     * @return token URI
     */
    function tokenURI(uint256 tokenId) external view returns (string memory);
}
