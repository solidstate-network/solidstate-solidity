// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

/**
 * @title Partial ERC1155 interface needed by internal functions
 * @dev ERC165 is not included in this interface
 */
interface IERC1155Internal {
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
