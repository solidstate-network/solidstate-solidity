// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IERC1155Metadata } from '../../../interfaces/_IERC1155Metadata.sol';

/**
 * @title Partial MultiTokenMetadata interface needed by internal functions
 */
interface _IMultiTokenMetadata is _IERC1155Metadata {}
