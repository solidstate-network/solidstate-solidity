// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IOwnableInternal } from '../../access/ownable/IOwnableInternal.sol';
import { IERC1271BaseInternal } from '../base/IERC1271BaseInternal.sol';

interface IERC1271OwnableInternal is IERC1271BaseInternal, IOwnableInternal {}
