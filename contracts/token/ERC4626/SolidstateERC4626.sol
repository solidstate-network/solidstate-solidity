// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _FungibleTokenMetadata } from '../fungible/metadata/_FungibleTokenMetadata.sol';
import { _FungibleTokenPermit } from '../fungible/permit/_FungibleTokenPermit.sol';
import { SolidstateFungibleToken } from '../fungible/SolidstateFungibleToken.sol';
import { ERC4626Base } from './base/ERC4626Base.sol';
import { ISolidstateERC4626 } from './ISolidstateERC4626.sol';
import { _SolidstateERC4626 } from './_SolidstateERC4626.sol';

/**
 * @title Solidstate ERC4626 implementation, including recommended ERC20 extensions
 */
abstract contract SolidstateERC4626 is
    ISolidstateERC4626,
    _SolidstateERC4626,
    ERC4626Base,
    SolidstateFungibleToken
{}
