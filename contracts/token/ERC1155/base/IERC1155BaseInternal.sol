// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC1155Internal } from '../../../interfaces/IERC1155Internal.sol';

/**
 * @title ERC1155 base interface
 */
interface IERC1155BaseInternal is IERC1155Internal {
    error ERC1155Base__ArrayLengthMismatch();
    error ERC1155Base__BalanceQueryZeroAddress();
    error ERC1155Base__NotOwnerOrApproved();
    error ERC1155Base__SelfApproval();
    error ERC1155Internal__ArrayLengthMismatch();
    error ERC1155Internal__BalanceQueryZeroAddress();
    error ERC1155Internal__BurnExceedsBalance();
    error ERC1155Internal__BurnFromZeroAddress();
    error ERC1155Internal__ERC1155ReceiverRejected();
    error ERC1155Internal__ERC1155ReceiverNotImplemented();
    error ERC1155Internal__MintToZeroAddress();
    error ERC1155Internal__TransferExceedsBalance();
    error ERC1155Internal__TransferToZeroAddress();
}
