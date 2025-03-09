// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20MetadataStandard } from '../../../interfaces/IERC20MetadataStandard.sol';
import { _IERC20Metadata } from './_IERC20Metadata.sol';

/**
 * @title ERC20 metadata interface
 */
interface IERC20Metadata is _IERC20Metadata, IERC20MetadataStandard {}
