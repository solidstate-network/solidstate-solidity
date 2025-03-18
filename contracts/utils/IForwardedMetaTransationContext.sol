// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2771 } from '../interfaces/IERC2771.sol';
import { _IForwardedMetaTransationContext } from './_IForwardedMetaTransationContext.sol';

interface IForwardedMetaTransationContext is
    _IForwardedMetaTransationContext,
    IERC2771
{}
