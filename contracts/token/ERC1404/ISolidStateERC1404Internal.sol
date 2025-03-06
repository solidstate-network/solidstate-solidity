// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISolidStateERC20Internal } from '../ERC20/ISolidStateERC20Internal.sol';
import { IERC1404BaseInternal } from '../ERC1404/base/IERC1404BaseInternal.sol';

interface ISolidStateERC1404Internal is
    ISolidStateERC20Internal,
    IERC1404BaseInternal
{}
