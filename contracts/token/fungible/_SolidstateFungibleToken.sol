// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _FungibleTokenBase } from './base/_FungibleTokenBase.sol';
import { _FungibleTokenExtended } from './extended/_FungibleTokenExtended.sol';
import { _FungibleTokenMetadata } from './metadata/_FungibleTokenMetadata.sol';
import { _FungibleTokenPermit } from './permit/_FungibleTokenPermit.sol';
import { _ISolidstateFungibleToken } from './_ISolidstateFungibleToken.sol';

/**
 * @title Solidstate FungibleToken implementation, including recommended extensions
 */
abstract contract _SolidstateFungibleToken is
    _ISolidstateFungibleToken,
    _FungibleTokenBase,
    _FungibleTokenExtended,
    _FungibleTokenMetadata,
    _FungibleTokenPermit
{}
