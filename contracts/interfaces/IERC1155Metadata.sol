// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC1155Metadata } from './_IERC1155Metadata.sol';

interface IERC1155Metadata is _IERC1155Metadata {
    /**
     * @notice get generated URI for given token
     * @return token URI
     */
    function uri(uint256 tokenId) external view returns (string memory);
}
