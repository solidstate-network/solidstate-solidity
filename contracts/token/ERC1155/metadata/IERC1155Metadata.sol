// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { IERC1155 } from '../IERC1155.sol';

interface IERC1155Metadata is IERC1155 {
    /**
     * @notice get generated URI for given token
     * @return token URI
     */
    function uri(uint256 tokenId) external view returns (string memory);
}
