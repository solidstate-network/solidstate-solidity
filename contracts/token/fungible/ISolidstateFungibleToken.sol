// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _ISolidstateFungibleToken } from './_ISolidstateFungibleToken.sol';
import { IFungibleTokenExtended } from './extended/IFungibleTokenExtended.sol';
import { IFungibleToken } from './IFungibleToken.sol';
import { IFungibleTokenMetadata } from './metadata/IFungibleTokenMetadata.sol';
import { IFungibleTokenPermit } from './permit/IFungibleTokenPermit.sol';

interface ISolidstateFungibleToken is
    _ISolidstateFungibleToken,
    IFungibleToken,
    IFungibleTokenExtended,
    IFungibleTokenMetadata,
    IFungibleTokenPermit
{}
