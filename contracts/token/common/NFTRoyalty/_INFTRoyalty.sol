// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC2981 } from '../../../interfaces/_IERC2981.sol';
import { _IERC165Base } from '../../../introspection/ERC165/base/_IERC165Base.sol';

interface _INFTRoyalty is _IERC2981, _IERC165Base {
    error NFTRoyalty__RoyaltyTooHigh();
}
