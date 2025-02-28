// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2981 } from '../../../interfaces/IERC2981.sol';
import { INFTRoyaltyInternal } from './INFTRoyaltyInternal.sol';

interface INFTRoyalty is INFTRoyaltyInternal, IERC2981 {}
