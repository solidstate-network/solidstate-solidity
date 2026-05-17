// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _FungibleTokenExtended } from './extended/_FungibleTokenExtended.sol';
import { _FungibleTokenMetadata } from './metadata/_FungibleTokenMetadata.sol';
import { _FungibleTokenPermit } from './permit/_FungibleTokenPermit.sol';
import { _FungibleToken } from './_FungibleToken.sol';
import { _ISolidstateFungibleToken } from './_ISolidstateFungibleToken.sol';

/**
 * @title Solidstate FungibleToken implementation, including recommended extensions
 */
abstract contract _SolidstateFungibleToken is
    _ISolidstateFungibleToken,
    _FungibleToken,
    _FungibleTokenExtended,
    _FungibleTokenMetadata,
    _FungibleTokenPermit
{}
