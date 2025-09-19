// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import {
    _ISolidstateNonFungibleToken
} from './_ISolidstateNonFungibleToken.sol';
import {
    INonFungibleTokenEnumerable
} from './enumerable/INonFungibleTokenEnumerable.sol';
import { INonFungibleToken } from './INonFungibleToken.sol';
import {
    INonFungibleTokenMetadata
} from './metadata/INonFungibleTokenMetadata.sol';

interface ISolidstateNonFungibleToken is
    _ISolidstateNonFungibleToken,
    INonFungibleToken,
    INonFungibleTokenEnumerable,
    INonFungibleTokenMetadata
{}
