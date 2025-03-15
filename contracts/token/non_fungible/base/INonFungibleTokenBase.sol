// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC721 } from '../../../interfaces/IERC721.sol';
import { IIntrospectable } from '../../../introspection/IIntrospectable.sol';
import { _INonFungibleTokenBase } from './_INonFungibleTokenBase.sol';

/**
 * @title NonFungibleToken base interface
 */
interface INonFungibleTokenBase is
    _INonFungibleTokenBase,
    IERC721,
    IIntrospectable
{}
