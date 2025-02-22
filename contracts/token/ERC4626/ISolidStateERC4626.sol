// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISolidStateERC20 } from '../ERC20/ISolidStateERC20.sol';
import { IERC4626Base } from './base/IERC4626Base.sol';
import { ISolidStateERC4626Internal } from './ISolidStateERC4626Internal.sol';

interface ISolidStateERC4626 is
    ISolidStateERC4626Internal,
    ISolidStateERC20,
    IERC4626Base
{}
