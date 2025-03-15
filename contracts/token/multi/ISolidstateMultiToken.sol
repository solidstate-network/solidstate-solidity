// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IMultiTokenBase } from './base/IMultiTokenBase.sol';
import { IMultiTokenEnumerable } from './enumerable/IMultiTokenEnumerable.sol';
import { IMultiTokenMetadata } from './metadata/IMultiTokenMetadata.sol';
import { _ISolidstateMultiToken } from './_ISolidstateMultiToken.sol';

interface ISolidstateMultiToken is
    _ISolidstateMultiToken,
    IMultiTokenBase,
    IMultiTokenEnumerable,
    IMultiTokenMetadata
{}
