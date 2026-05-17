// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _IERC2612 } from '../../../interfaces/_IERC2612.sol';
import { _IERC5267 } from '../../../interfaces/_IERC5267.sol';
import { _IFungibleTokenMetadata } from '../metadata/_IFungibleTokenMetadata.sol';
import { _IFungibleToken } from '../_IFungibleToken.sol';

interface _IFungibleTokenPermit is
    _IFungibleToken,
    _IFungibleTokenMetadata,
    _IERC2612,
    _IERC5267
{
    error FungibleTokenPermit__ExpiredDeadline();
    error FungibleTokenPermit__InvalidSignature();
}
