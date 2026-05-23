// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

import { IERC1155Metadata } from '../../../interfaces/IERC1155Metadata.sol';
import { _IMultiTokenMetadata } from './_IMultiTokenMetadata.sol';

/**
 * @title MultiTokenMetadata interface
 */
interface IMultiTokenMetadata is _IMultiTokenMetadata, IERC1155Metadata {}
