// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _ISafeOwnable } from '../../access/ownable/_ISafeOwnable.sol';
import { _IDiamondBase } from './base/_IDiamondBase.sol';
import { _IDiamondFallback } from './fallback/_IDiamondFallback.sol';
import { _IDiamondReadable } from './readable/_IDiamondReadable.sol';
import { _IDiamondWritable } from './writable/_IDiamondWritable.sol';

interface _ISolidStateDiamond is
    _IDiamondBase,
    _IDiamondFallback,
    _IDiamondReadable,
    _IDiamondWritable,
    _ISafeOwnable
{}
