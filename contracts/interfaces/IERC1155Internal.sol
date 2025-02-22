// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC165Internal } from './IERC165Internal.sol';

/**
 * @title Partial ERC1155 interface needed by internal functions
 */
interface IERC1155Internal is IERC165Internal {
    event TransferSingle(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256 id,
        uint256 value
    );

    event TransferBatch(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256[] ids,
        uint256[] values
    );

    event ApprovalForAll(
        address indexed account,
        address indexed operator,
        bool approved
    );
}
