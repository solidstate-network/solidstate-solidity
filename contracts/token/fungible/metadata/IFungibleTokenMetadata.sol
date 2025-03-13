// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20MetadataStandard } from '../../../interfaces/IERC20MetadataStandard.sol';
import { _IFungibleTokenMetadata } from './_IFungibleTokenMetadata.sol';

/**
 * @title FungibleToken metadata interface
 */
interface IFungibleTokenMetadata is
    _IFungibleTokenMetadata,
    IERC20MetadataStandard
{}
