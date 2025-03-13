// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC2612 } from '../../../interfaces/_IERC2612.sol';
import { _IERC5267 } from '../../../interfaces/_IERC5267.sol';
import { _IFungibleTokenBase } from '../base/_IFungibleTokenBase.sol';
import { _IFungibleTokenMetadata } from '../metadata/_IFungibleTokenMetadata.sol';

interface _IFungibleTokenPermit is
    _IFungibleTokenBase,
    _IFungibleTokenMetadata,
    _IERC2612,
    _IERC5267
{
    error FungibleTokenPermit__ExpiredDeadline();
    error FungibleTokenPermit__InvalidSignature();
}
