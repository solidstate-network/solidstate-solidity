// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IFungibleTokenBase } from './base/IFungibleTokenBase.sol';
import { IFungibleTokenExtended } from './extended/IFungibleTokenExtended.sol';
import { IFungibleTokenMetadata } from './metadata/IFungibleTokenMetadata.sol';
import { IFungibleTokenPermit } from './permit/IFungibleTokenPermit.sol';
import { _ISolidstateFungibleToken } from './_ISolidstateFungibleToken.sol';

interface ISolidstateFungibleToken is
    _ISolidstateFungibleToken,
    IFungibleTokenBase,
    IFungibleTokenExtended,
    IFungibleTokenMetadata,
    IFungibleTokenPermit
{}
