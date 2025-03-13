// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC4626 } from '../../interfaces/IERC4626.sol';
import { IFungibleTokenBase } from '../fungible/base/IFungibleTokenBase.sol';
import { IFungibleTokenMetadata } from '../fungible/metadata/IFungibleTokenMetadata.sol';
import { _IFungibleVaultToken } from './_IFungibleVaultToken.sol';

/**
 * @title FungibleVaultToken base interface
 */
interface IFungibleVaultToken is
    _IFungibleVaultToken,
    IFungibleTokenBase,
    IFungibleTokenMetadata,
    IERC4626
{}
