// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IMultiToken } from './_IMultiToken.sol';
import { _IMultiTokenEnumerable } from './enumerable/_IMultiTokenEnumerable.sol';
import { _IMultiTokenMetadata } from './metadata/_IMultiTokenMetadata.sol';

interface _ISolidstateMultiToken is
    _IMultiToken,
    _IMultiTokenEnumerable,
    _IMultiTokenMetadata
{}
