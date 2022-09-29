// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC2612Internal } from './IERC2612Internal.sol';

interface IERC20PermitInternal is IERC2612Internal {
    error ERC20PermitInternal__ExpiredDeadline();
    error ERC20PermitInternal__InvalidSignature();
}
