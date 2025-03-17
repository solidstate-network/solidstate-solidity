// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { INonFungibleTokenEnumerable } from './enumerable/INonFungibleTokenEnumerable.sol';
import { INonFungibleTokenMetadata } from './metadata/INonFungibleTokenMetadata.sol';
import { INonFungibleToken } from './INonFungibleToken.sol';
import { _ISolidstateNonFungibleToken } from './_ISolidstateNonFungibleToken.sol';

interface ISolidstateNonFungibleToken is
    _ISolidstateNonFungibleToken,
    INonFungibleToken,
    INonFungibleTokenEnumerable,
    INonFungibleTokenMetadata
{}
