// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISafeOwnable } from '../../access/ownable/ISafeOwnable.sol';
import { IDiamondBase } from './base/IDiamondBase.sol';
import { IDiamondFallback } from './fallback/IDiamondFallback.sol';
import { IDiamondProxyReadable } from './readable/IDiamondProxyReadable.sol';
import { IDiamondProxyWritable } from './writable/IDiamondProxyWritable.sol';
import { _ISolidstateDiamond } from './_ISolidstateDiamond.sol';

interface ISolidstateDiamond is
    _ISolidstateDiamond,
    IDiamondBase,
    IDiamondFallback,
    IDiamondProxyReadable,
    IDiamondProxyWritable,
    ISafeOwnable
{
    receive() external payable;
}
