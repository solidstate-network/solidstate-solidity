// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC4626 } from '../../../interfaces/IERC4626.sol';
import { IFungibleTokenMetadata } from '../../fungible/metadata/IFungibleTokenMetadata.sol';
import { IFungibleToken } from '../IFungibleToken.sol';
import { _IFungibleVaultToken } from './_IFungibleVaultToken.sol';

/**
 * @title FungibleVaultToken base interface
 */
interface IFungibleVaultToken is
    _IFungibleVaultToken,
    IFungibleToken,
    IFungibleTokenMetadata,
    IERC4626
{}
