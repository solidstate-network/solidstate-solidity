// SPDX-License-Identifier: MIT

pragma solidity ^0.8.35;

import { IERC2612 } from '../../../interfaces/IERC2612.sol';
import { IERC5267 } from '../../../interfaces/IERC5267.sol';
import { IFungibleTokenMetadata } from '../metadata/IFungibleTokenMetadata.sol';
import { IFungibleToken } from '../IFungibleToken.sol';
import { _IFungibleTokenPermit } from './_IFungibleTokenPermit.sol';

interface IFungibleTokenPermit is
    _IFungibleTokenPermit,
    IFungibleToken,
    IFungibleTokenMetadata,
    IERC2612,
    IERC5267
{}
