// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { FungibleTokenBase } from './base/FungibleTokenBase.sol';
import { FungibleTokenExtended } from './extended/FungibleTokenExtended.sol';
import { FungibleTokenMetadata } from './metadata/FungibleTokenMetadata.sol';
import { _FungibleTokenMetadata } from './metadata/_FungibleTokenMetadata.sol';
import { FungibleTokenPermit } from './permit/FungibleTokenPermit.sol';
import { _FungibleTokenPermit } from './permit/_FungibleTokenPermit.sol';
import { ISolidstateFungibleToken } from './ISolidstateFungibleToken.sol';
import { _SolidstateFungibleToken } from './_SolidstateFungibleToken.sol';

/**
 * @title Solidstate FungibleToken implementation, including recommended extensions
 */
abstract contract SolidstateFungibleToken is
    ISolidstateFungibleToken,
    _SolidstateFungibleToken,
    FungibleTokenBase,
    FungibleTokenExtended,
    FungibleTokenMetadata,
    FungibleTokenPermit
{}
