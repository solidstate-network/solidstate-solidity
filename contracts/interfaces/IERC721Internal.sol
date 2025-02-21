// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title Partial ERC721 interface needed by internal functions
 * @dev ERC165 is not included in this interface
 */
interface IERC721Internal {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    event Approval(
        address indexed owner,
        address indexed operator,
        uint256 indexed tokenId
    );

    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );
}
