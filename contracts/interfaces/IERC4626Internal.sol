// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20Internal } from './IERC20Internal.sol';
import { IERC20MetadataStandardInternal } from './IERC20MetadataStandardInternal.sol';

/**
 * @title Partial ERC4626 interface needed by internal functions
 */
interface IERC4626Internal is IERC20Internal, IERC20MetadataStandardInternal {
    event Deposit(
        address indexed caller,
        address indexed owner,
        uint256 assets,
        uint256 shares
    );

    event Withdraw(
        address indexed caller,
        address indexed receiver,
        address indexed owner,
        uint256 assets,
        uint256 shares
    );
}
