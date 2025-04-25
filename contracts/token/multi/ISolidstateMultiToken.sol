// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IMultiTokenEnumerable } from './enumerable/IMultiTokenEnumerable.sol';
import { IMultiTokenMetadata } from './metadata/IMultiTokenMetadata.sol';
import { IMultiToken } from './IMultiToken.sol';
import { _ISolidstateMultiToken } from './_ISolidstateMultiToken.sol';

interface ISolidstateMultiToken is
    _ISolidstateMultiToken,
    IMultiToken,
    IMultiTokenEnumerable,
    IMultiTokenMetadata
{}
