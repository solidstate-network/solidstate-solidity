// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

// TODO: inherit IERC165Internal
import { IERC165Internal } from './IERC165Internal.sol';

/**
 * @title Partial ERC721 interface needed by internal functions
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
