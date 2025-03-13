// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _FungibleTokenMetadata } from '../fungible/metadata/_FungibleTokenMetadata.sol';
import { _SolidstateFungibleToken } from '../fungible/_SolidstateFungibleToken.sol';
import { _ERC4626Base } from './base/_ERC4626Base.sol';
import { _ISolidstateERC4626 } from './_ISolidstateERC4626.sol';

abstract contract _SolidstateERC4626 is
    _ISolidstateERC4626,
    _SolidstateFungibleToken,
    _ERC4626Base
{}
