// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _IERC2981 } from '../../../interfaces/_IERC2981.sol';
import { _IIntrospectable } from '../../../introspection/_IIntrospectable.sol';

interface _INFTRoyalty is _IERC2981, _IIntrospectable {
    error NFTRoyalty__RoyaltyTooHigh();
}
