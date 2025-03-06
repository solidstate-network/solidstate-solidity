// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1271 } from '../../../interfaces/IERC1271.sol';
import { IERC1271BaseInternal } from './IERC1271BaseInternal.sol';

interface IERC1271Base is IERC1271BaseInternal, IERC1271 {}
