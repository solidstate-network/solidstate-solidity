// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { IERC1404 } from '../../../interfaces/IERC1404.sol';
import { IFungibleToken } from '../IFungibleToken.sol';
import { _IRestrictedFungibleToken } from './_IRestrictedFungibleToken.sol';

/**
 * @title ERC1404 base interface
 */
interface IRestrictedFungibleToken is
    _IRestrictedFungibleToken,
    IFungibleToken,
    IERC1404
{}
