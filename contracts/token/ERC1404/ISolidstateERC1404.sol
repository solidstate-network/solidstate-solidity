// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISolidstateERC20 } from '../ERC20/ISolidstateERC20.sol';
import { IERC1404Base } from './base/IERC1404Base.sol';
import { _ISolidstateERC1404 } from './_ISolidstateERC1404.sol';

interface ISolidstateERC1404 is
    _ISolidstateERC1404,
    IERC1404Base,
    ISolidstateERC20
{}
