// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IFungibleToken } from '../_IFungibleToken.sol';
import { _IERC4626 } from '../../../interfaces/_IERC4626.sol';
import { _IFungibleTokenMetadata } from '../metadata/_IFungibleTokenMetadata.sol';

/**
 * @title FungibleVaultToken base interface
 */
interface _IFungibleVaultToken is
    _IFungibleToken,
    _IFungibleTokenMetadata,
    _IERC4626
{
    error FungibleVaultToken__MaximumAmountExceeded();
    error FungibleVaultToken__AllowanceExceeded();
}
