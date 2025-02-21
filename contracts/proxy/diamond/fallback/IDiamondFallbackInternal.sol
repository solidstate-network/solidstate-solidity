// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnableInternal } from '../../../access/ownable/IOwnableInternal.sol';
import { IDiamondBaseInternal } from '../base/IDiamondBaseInternal.sol';

interface IDiamondFallbackInternal is IDiamondBaseInternal, IOwnableInternal {}
