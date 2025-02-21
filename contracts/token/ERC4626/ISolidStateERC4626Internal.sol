// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISolidStateERC20Internal } from '../ERC20/ISolidStateERC20Internal.sol';
import { IERC4626BaseInternal } from './base/IERC4626BaseInternal.sol';

interface ISolidStateERC4626Internal is
    ISolidStateERC20Internal,
    IERC4626BaseInternal
{}
