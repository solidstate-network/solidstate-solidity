// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC20 } from '../../../interfaces/_IERC20.sol';

/**
 * @title FungibleToken base interface
 */
interface _IFungibleTokenBase is _IERC20 {
    error FungibleTokenBase__ApproveFromZeroAddress();
    error FungibleTokenBase__ApproveToZeroAddress();
    error FungibleTokenBase__BurnExceedsBalance();
    error FungibleTokenBase__BurnFromZeroAddress();
    error FungibleTokenBase__InsufficientAllowance();
    error FungibleTokenBase__MintToZeroAddress();
    error FungibleTokenBase__TransferExceedsBalance();
    error FungibleTokenBase__TransferFromZeroAddress();
    error FungibleTokenBase__TransferToZeroAddress();
}
