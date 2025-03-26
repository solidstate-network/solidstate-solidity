// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { FungibleTokenExtended } from './extended/FungibleTokenExtended.sol';
import { FungibleTokenMetadata } from './metadata/FungibleTokenMetadata.sol';
import { _FungibleTokenMetadata } from './metadata/_FungibleTokenMetadata.sol';
import { FungibleTokenPermit } from './permit/FungibleTokenPermit.sol';
import { _FungibleTokenPermit } from './permit/_FungibleTokenPermit.sol';
import { FungibleToken } from './FungibleToken.sol';
import { ISolidstateFungibleToken } from './ISolidstateFungibleToken.sol';
import { _SolidstateFungibleToken } from './_SolidstateFungibleToken.sol';

/**
 * @title Solidstate FungibleToken implementation, including recommended extensions
 */
abstract contract SolidstateFungibleToken is
    ISolidstateFungibleToken,
    _SolidstateFungibleToken,
    FungibleToken,
    FungibleTokenExtended,
    FungibleTokenMetadata,
    FungibleTokenPermit
{}
