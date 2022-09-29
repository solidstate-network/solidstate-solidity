// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

/**
 * @title Partial ERC1155 interface needed by internal functions
 */
interface IERC1155Internal {
    error ERC1155Internal__ArrayLengthMismatch();
    error ERC1155Internal__BalanceQueryZeroAddress();
    error ERC1155Internal__BurnExceedsBalance();
    error ERC1155Internal__BurnFromZeroAddress();
    error ERC1155Internal__ERC1155ReceiverRejected();
    error ERC1155Internal__ERC1155ReceiverNotImplemented();
    error ERC1155Internal__MintToZeroAddress();
    error ERC1155Internal__TransferExceedsBalance();
    error ERC1155Internal__TransferToZeroAddress();

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
