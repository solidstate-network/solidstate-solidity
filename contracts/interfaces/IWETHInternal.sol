// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20Internal } from './IERC20Internal.sol';
import { IERC20MetadataStandardInternal } from './IERC20MetadataStandardInternal.sol';

interface IWETHInternal is IERC20Internal, IERC20MetadataStandardInternal {}
