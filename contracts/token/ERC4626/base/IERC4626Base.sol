// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC4626 } from '../../../interfaces/IERC4626.sol';
import { IFungibleTokenBase } from '../../fungible/base/IFungibleTokenBase.sol';
import { IFungibleTokenMetadata } from '../../fungible/metadata/IFungibleTokenMetadata.sol';
import { _IERC4626Base } from './_IERC4626Base.sol';

/**
 * @title ERC4626 base interface
 */
interface IERC4626Base is
    _IERC4626Base,
    IFungibleTokenBase,
    IFungibleTokenMetadata,
    IERC4626
{}
