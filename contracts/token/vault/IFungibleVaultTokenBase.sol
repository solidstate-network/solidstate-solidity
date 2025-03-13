// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC4626 } from '../../interfaces/IERC4626.sol';
import { IFungibleTokenBase } from '../fungible/base/IFungibleTokenBase.sol';
import { IFungibleTokenMetadata } from '../fungible/metadata/IFungibleTokenMetadata.sol';
import { _IFungibleVaultTokenBase } from './_IFungibleVaultTokenBase.sol';

/**
 * @title FungibleVaultToken base interface
 */
interface IFungibleVaultTokenBase is
    _IFungibleVaultTokenBase,
    IFungibleTokenBase,
    IFungibleTokenMetadata,
    IERC4626
{}
