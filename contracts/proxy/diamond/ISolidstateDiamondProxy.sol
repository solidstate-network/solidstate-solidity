// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IDiamondProxyFallback } from './fallback/IDiamondProxyFallback.sol';
import { IDiamondProxyReadable } from './readable/IDiamondProxyReadable.sol';
import { IDiamondProxyWritable } from './writable/IDiamondProxyWritable.sol';
import { _ISolidstateDiamondProxy } from './_ISolidstateDiamondProxy.sol';
import { IDiamondProxy } from './IDiamondProxy.sol';

interface ISolidstateDiamondProxy is
    _ISolidstateDiamondProxy,
    IDiamondProxy,
    IDiamondProxyFallback,
    IDiamondProxyReadable,
    IDiamondProxyWritable
{}
