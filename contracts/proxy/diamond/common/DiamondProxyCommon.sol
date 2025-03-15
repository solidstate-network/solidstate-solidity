// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IDiamondProxyCommon } from './IDiamondProxyCommon.sol';
import { _DiamondProxyCommon } from './_DiamondProxyCommon.sol';

contract DiamondProxyCommon is IDiamondProxyCommon, _DiamondProxyCommon {}
