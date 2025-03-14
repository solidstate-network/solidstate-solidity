// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ISafeOwnable } from '../../access/ownable/_ISafeOwnable.sol';
import { _IDiamondBase } from './base/_IDiamondBase.sol';
import { _IDiamondProxyFallback } from './fallback/_IDiamondProxyFallback.sol';
import { _IDiamondProxyReadable } from './readable/_IDiamondProxyReadable.sol';
import { _IDiamondProxyWritable } from './writable/_IDiamondProxyWritable.sol';

interface _ISolidstateDiamond is
    _IDiamondBase,
    _IDiamondProxyFallback,
    _IDiamondProxyReadable,
    _IDiamondProxyWritable,
    _ISafeOwnable
{}
