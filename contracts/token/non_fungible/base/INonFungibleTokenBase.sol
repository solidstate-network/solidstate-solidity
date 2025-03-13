// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC721 } from '../../../interfaces/IERC721.sol';
import { IERC165Base } from '../../../introspection/ERC165/base/IERC165Base.sol';
import { _INonFungibleTokenBase } from './_INonFungibleTokenBase.sol';

/**
 * @title NonFungibleToken base interface
 */
interface INonFungibleTokenBase is
    _INonFungibleTokenBase,
    IERC721,
    IERC165Base
{}
