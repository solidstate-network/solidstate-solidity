// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IFungibleToken } from './_IFungibleToken.sol';
import { _IFungibleTokenExtended } from './extended/_IFungibleTokenExtended.sol';
import { _IFungibleTokenMetadata } from './metadata/_IFungibleTokenMetadata.sol';
import { _IFungibleTokenPermit } from './permit/_IFungibleTokenPermit.sol';

interface _ISolidstateFungibleToken is
    _IFungibleToken,
    _IFungibleTokenExtended,
    _IFungibleTokenMetadata,
    _IFungibleTokenPermit
{}
