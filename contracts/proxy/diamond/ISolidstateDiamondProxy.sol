// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _ISolidstateDiamondProxy } from './_ISolidstateDiamondProxy.sol';
import { IDiamondProxyFallback } from './fallback/IDiamondProxyFallback.sol';
import { IDiamondProxy } from './IDiamondProxy.sol';
import { IDiamondProxyReadable } from './readable/IDiamondProxyReadable.sol';
import { IDiamondProxyWritable } from './writable/IDiamondProxyWritable.sol';

interface ISolidstateDiamondProxy is
    _ISolidstateDiamondProxy,
    IDiamondProxy,
    IDiamondProxyFallback,
    IDiamondProxyReadable,
    IDiamondProxyWritable
{}
