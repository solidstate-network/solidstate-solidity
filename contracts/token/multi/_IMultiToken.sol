// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC1155 } from '../../interfaces/_IERC1155.sol';
import { _IIntrospectable } from '../../introspection/_IIntrospectable.sol';

/**
 * @title MultiToken base interface
 */
interface _IMultiToken is _IERC1155, _IIntrospectable {
    error MultiToken__ArrayLengthMismatch();
    error MultiToken__BalanceQueryZeroAddress();
    error MultiToken__NotOwnerOrApproved();
    error MultiToken__SelfApproval();
    error MultiToken__BurnExceedsBalance();
    error MultiToken__BurnFromZeroAddress();
    error MultiToken__ERC1155ReceiverRejected();
    error MultiToken__ERC1155ReceiverNotImplemented();
    error MultiToken__MintToZeroAddress();
    error MultiToken__TransferExceedsBalance();
    error MultiToken__TransferToZeroAddress();
}
