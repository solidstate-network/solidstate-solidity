// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IFungibleTokenBase } from './base/_IFungibleTokenBase.sol';
import { _IFungibleTokenExtended } from './extended/_IFungibleTokenExtended.sol';
import { _IFungibleTokenMetadata } from './metadata/_IFungibleTokenMetadata.sol';
import { _IFungibleTokenPermit } from './permit/_IFungibleTokenPermit.sol';

interface _ISolidstateFungibleToken is
    _IFungibleTokenBase,
    _IFungibleTokenExtended,
    _IFungibleTokenMetadata,
    _IFungibleTokenPermit
{}
