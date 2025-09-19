// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _ISolidstateMultiToken } from './_ISolidstateMultiToken.sol';
import { IMultiTokenEnumerable } from './enumerable/IMultiTokenEnumerable.sol';
import { IMultiToken } from './IMultiToken.sol';
import { IMultiTokenMetadata } from './metadata/IMultiTokenMetadata.sol';

interface ISolidstateMultiToken is
    _ISolidstateMultiToken,
    IMultiToken,
    IMultiTokenEnumerable,
    IMultiTokenMetadata
{}
