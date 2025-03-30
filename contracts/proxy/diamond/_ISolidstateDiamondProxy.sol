// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IDiamondProxy } from './_IDiamondProxy.sol';
import { _IDiamondProxyFallback } from './fallback/_IDiamondProxyFallback.sol';
import { _IDiamondProxyReadable } from './readable/_IDiamondProxyReadable.sol';
import { _IDiamondProxyWritable } from './writable/_IDiamondProxyWritable.sol';

interface _ISolidstateDiamondProxy is
    _IDiamondProxy,
    _IDiamondProxyFallback,
    _IDiamondProxyReadable,
    _IDiamondProxyWritable
{}
