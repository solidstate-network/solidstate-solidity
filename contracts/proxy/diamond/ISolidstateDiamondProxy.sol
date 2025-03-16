// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { ISafeOwnable } from '../../access/ownable/ISafeOwnable.sol';
import { IDiamondProxyExecutable } from './executable/IDiamondProxyExecutable.sol';
import { IDiamondProxyFallback } from './fallback/IDiamondProxyFallback.sol';
import { IDiamondProxyReadable } from './readable/IDiamondProxyReadable.sol';
import { IDiamondProxyWritable } from './writable/IDiamondProxyWritable.sol';
import { _ISolidstateDiamondProxy } from './_ISolidstateDiamondProxy.sol';

interface ISolidstateDiamondProxy is
    _ISolidstateDiamondProxy,
    IDiamondProxyExecutable,
    IDiamondProxyFallback,
    IDiamondProxyReadable,
    IDiamondProxyWritable,
    ISafeOwnable
{
    receive() external payable;
}
