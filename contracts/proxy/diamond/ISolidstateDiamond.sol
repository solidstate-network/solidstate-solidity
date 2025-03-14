// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISafeOwnable } from '../../access/ownable/ISafeOwnable.sol';
import { IDiamondProxyExecutable } from './executable/IDiamondProxyExecutable.sol';
import { IDiamondProxyFallback } from './fallback/IDiamondProxyFallback.sol';
import { IDiamondProxyReadable } from './readable/IDiamondProxyReadable.sol';
import { IDiamondProxyWritable } from './writable/IDiamondProxyWritable.sol';
import { _ISolidstateDiamond } from './_ISolidstateDiamond.sol';

interface ISolidstateDiamond is
    _ISolidstateDiamond,
    IDiamondProxyExecutable,
    IDiamondProxyFallback,
    IDiamondProxyReadable,
    IDiamondProxyWritable,
    ISafeOwnable
{
    receive() external payable;
}
