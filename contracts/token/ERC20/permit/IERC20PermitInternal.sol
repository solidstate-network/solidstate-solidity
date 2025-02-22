// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2612Internal } from '../../../interfaces/IERC2612Internal.sol';
import { IERC20BaseInternal } from '../base/IERC20BaseInternal.sol';
import { IERC20MetadataInternal } from '../metadata/IERC20MetadataInternal.sol';

interface IERC20PermitInternal is
    IERC20BaseInternal,
    IERC20MetadataInternal,
    IERC2612Internal
{
    error ERC20Permit__ExpiredDeadline();
    error ERC20Permit__InvalidSignature();
}
