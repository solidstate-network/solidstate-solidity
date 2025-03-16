// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IFungibleTokenExtended } from './extended/IFungibleTokenExtended.sol';
import { IFungibleTokenMetadata } from './metadata/IFungibleTokenMetadata.sol';
import { IFungibleTokenPermit } from './permit/IFungibleTokenPermit.sol';
import { IFungibleToken } from './IFungibleToken.sol';
import { _ISolidstateFungibleToken } from './_ISolidstateFungibleToken.sol';

interface ISolidstateFungibleToken is
    _ISolidstateFungibleToken,
    IFungibleToken,
    IFungibleTokenExtended,
    IFungibleTokenMetadata,
    IFungibleTokenPermit
{}
