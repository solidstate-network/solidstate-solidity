// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _INonFungibleTokenBase } from './base/_INonFungibleTokenBase.sol';
import { _INonFungibleTokenEnumerable } from './enumerable/_INonFungibleTokenEnumerable.sol';
import { _INonFungibleTokenMetadata } from './metadata/_INonFungibleTokenMetadata.sol';

interface _ISolidstateNonFungibleToken is
    _INonFungibleTokenBase,
    _INonFungibleTokenEnumerable,
    _INonFungibleTokenMetadata
{
    error SolidstateNonFungibleToken__PayableApproveNotSupported();
    error SolidstateNonFungibleToken__PayableTransferNotSupported();
}
