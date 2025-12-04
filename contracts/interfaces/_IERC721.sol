// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _IERC165 } from './_IERC165.sol';

/**
 * @title Partial ERC721 interface needed by internal functions
 */
interface _IERC721 is _IERC165 {
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
