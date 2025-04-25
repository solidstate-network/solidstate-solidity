// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC721 } from '../../interfaces/IERC721.sol';
import { IIntrospectable } from '../../introspection/IIntrospectable.sol';
import { IContext } from '../../meta/IContext.sol';
import { _INonFungibleToken } from './_INonFungibleToken.sol';

/**
 * @title NonFungibleToken base interface
 */
interface INonFungibleToken is
    _INonFungibleToken,
    IERC721,
    IIntrospectable,
    IContext
{}
