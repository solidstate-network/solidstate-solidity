// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISolidStateERC20 } from '../ERC20/ISolidStateERC20.sol';
import { IERC1404Base } from './base/IERC1404Base.sol';
import { ISolidStateERC1404Internal } from './ISolidStateERC1404Internal.sol';

interface ISolidStateERC1404 is
    ISolidStateERC1404Internal,
    IERC1404Base,
    ISolidStateERC20
{}
