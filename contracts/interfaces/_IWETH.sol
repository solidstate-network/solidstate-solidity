// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC20 } from './_IERC20.sol';
import { _IERC20MetadataStandard } from './_IERC20MetadataStandard.sol';

interface _IWETH is _IERC20, _IERC20MetadataStandard {}
