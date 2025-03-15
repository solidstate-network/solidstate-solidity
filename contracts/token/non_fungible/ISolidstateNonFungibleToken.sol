// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { INonFungibleTokenBase } from './base/INonFungibleTokenBase.sol';
import { INonFungibleTokenEnumerable } from './enumerable/INonFungibleTokenEnumerable.sol';
import { INonFungibleTokenMetadata } from './metadata/INonFungibleTokenMetadata.sol';
import { _ISolidstateNonFungibleToken } from './_ISolidstateNonFungibleToken.sol';

interface ISolidstateNonFungibleToken is
    _ISolidstateNonFungibleToken,
    INonFungibleTokenBase,
    INonFungibleTokenEnumerable,
    INonFungibleTokenMetadata
{}
