// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20Internal } from './IERC20Internal.sol';
// TODO: "starndard" interface should not inherit from SS interface
import { IERC20MetadataInternal } from '../token/ERC20/metadata/IERC20MetadataInternal.sol';

interface IWETHInternal is IERC20Internal, IERC20MetadataInternal {}
