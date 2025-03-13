// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC1155 } from '../../../interfaces/_IERC1155.sol';
import { _IERC165Base } from '../../../introspection/ERC165/base/_IERC165Base.sol';

/**
 * @title MultiToken base interface
 */
interface _IMultiTokenBase is _IERC1155, _IERC165Base {
    error MultiTokenBase__ArrayLengthMismatch();
    error MultiTokenBase__BalanceQueryZeroAddress();
    error MultiTokenBase__NotOwnerOrApproved();
    error MultiTokenBase__SelfApproval();
    error MultiTokenBase__BurnExceedsBalance();
    error MultiTokenBase__BurnFromZeroAddress();
    error MultiTokenBase__ERC1155ReceiverRejected();
    error MultiTokenBase__ERC1155ReceiverNotImplemented();
    error MultiTokenBase__MintToZeroAddress();
    error MultiTokenBase__TransferExceedsBalance();
    error MultiTokenBase__TransferToZeroAddress();
}
