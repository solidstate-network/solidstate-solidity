// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1404 } from '../../interfaces/IERC1404.sol';
import { IFungibleTokenBase } from '../fungible/base/IFungibleTokenBase.sol';
import { _IRestrictedFungibleToken } from './_IRestrictedFungibleToken.sol';

/**
 * @title ERC1404 base interface
 */
interface IRestrictedFungibleToken is
    _IRestrictedFungibleToken,
    IFungibleTokenBase,
    IERC1404
{}
