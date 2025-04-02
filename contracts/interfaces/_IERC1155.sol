// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC165 } from './_IERC165.sol';

/**
 * @title Partial ERC1155 interface needed by internal functions
 */
interface _IERC1155 is _IERC165 {
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
