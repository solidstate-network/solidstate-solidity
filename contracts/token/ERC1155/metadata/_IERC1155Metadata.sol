// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title Partial ERC1155Metadata interface needed by internal functions
 */
interface _IERC1155Metadata {
    event URI(string value, uint256 indexed tokenId);
}
