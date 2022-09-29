// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC20Internal } from '../../../interfaces/IERC20Internal.sol';

/**
 * @title ERC20 base interface
 */
interface IERC20BaseInternal is IERC20Internal {
    error ERC20BaseInternal__ApproveFromZeroAddress();
    error ERC20BaseInternal__ApproveToZeroAddress();
    error ERC20BaseInternal__BurnExceedsBalance();
    error ERC20BaseInternal__BurnFromZeroAddress();
    error ERC20BaseInternal__MintToZeroAddress();
    error ERC20BaseInternal__TransferExceedsBalance();
    error ERC20BaseInternal__TransferExceedsAllowance();
    error ERC20BaseInternal__TransferFromZeroAddress();
    error ERC20BaseInternal__TransferToZeroAddress();
}
