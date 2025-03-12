// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IDiamondCommon } from './IDiamondCommon.sol';
import { _DiamondCommon } from './_DiamondCommon.sol';

contract DiamondCommon is IDiamondCommon, _DiamondCommon {}
