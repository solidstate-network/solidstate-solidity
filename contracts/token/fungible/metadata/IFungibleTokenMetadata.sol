// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IERC20Metadata } from '../../../interfaces/IERC20Metadata.sol';
import { _IFungibleTokenMetadata } from './_IFungibleTokenMetadata.sol';

/**
 * @title FungibleToken metadata interface
 */
interface IFungibleTokenMetadata is _IFungibleTokenMetadata, IERC20Metadata {}
