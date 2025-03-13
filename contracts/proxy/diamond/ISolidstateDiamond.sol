// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISafeOwnable } from '../../access/ownable/ISafeOwnable.sol';
import { IDiamondBase } from './base/IDiamondBase.sol';
import { IDiamondFallback } from './fallback/IDiamondFallback.sol';
import { IDiamondReadable } from './readable/IDiamondReadable.sol';
import { IDiamondWritable } from './writable/IDiamondWritable.sol';
import { _ISolidstateDiamond } from './_ISolidstateDiamond.sol';

interface ISolidstateDiamond is
    _ISolidstateDiamond,
    IDiamondBase,
    IDiamondFallback,
    IDiamondReadable,
    IDiamondWritable,
    ISafeOwnable
{
    receive() external payable;
}
