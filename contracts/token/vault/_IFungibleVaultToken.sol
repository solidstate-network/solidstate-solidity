// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC4626 } from '../../interfaces/_IERC4626.sol';
import { _IFungibleTokenBase } from '../fungible/base/_IFungibleTokenBase.sol';
import { _IFungibleTokenMetadata } from '../fungible/metadata/_IFungibleTokenMetadata.sol';

/**
 * @title FungibleVaultToken base interface
 */
interface _IFungibleVaultToken is
    _IFungibleTokenBase,
    _IFungibleTokenMetadata,
    _IERC4626
{
    error FungibleVaultToken__MaximumAmountExceeded();
    error FungibleVaultToken__AllowanceExceeded();
}
