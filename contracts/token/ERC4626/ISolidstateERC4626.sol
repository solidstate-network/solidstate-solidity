// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISolidstateERC20 } from '../ERC20/ISolidstateERC20.sol';
import { IERC4626Base } from './base/IERC4626Base.sol';
import { _ISolidstateERC4626 } from './_ISolidstateERC4626.sol';

interface ISolidstateERC4626 is
    _ISolidstateERC4626,
    ISolidstateERC20,
    IERC4626Base
{}
