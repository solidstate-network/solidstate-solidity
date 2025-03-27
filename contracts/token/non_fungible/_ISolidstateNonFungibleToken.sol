// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _INonFungibleTokenEnumerable } from './enumerable/_INonFungibleTokenEnumerable.sol';
import { _INonFungibleTokenMetadata } from './metadata/_INonFungibleTokenMetadata.sol';
import { _INonFungibleToken } from './_INonFungibleToken.sol';

interface _ISolidstateNonFungibleToken is
    _INonFungibleToken,
    _INonFungibleTokenEnumerable,
    _INonFungibleTokenMetadata
{
    error SolidstateNonFungibleToken__PayableApproveNotSupported();
    error SolidstateNonFungibleToken__PayableTransferNotSupported();
}
