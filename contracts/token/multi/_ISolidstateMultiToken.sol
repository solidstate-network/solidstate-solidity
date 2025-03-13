// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IMultiTokenBase } from './base/_IMultiTokenBase.sol';
import { _IMultiTokenEnumerable } from './enumerable/_IMultiTokenEnumerable.sol';
import { _IMultiTokenMetadata } from './metadata/_IMultiTokenMetadata.sol';

interface _ISolidstateMultiToken is
    _IMultiTokenBase,
    _IMultiTokenEnumerable,
    _IMultiTokenMetadata
{}
