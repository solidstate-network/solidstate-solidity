// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { IERC721Enumerable } from '../../../interfaces/IERC721Enumerable.sol';
import { INonFungibleToken } from '../INonFungibleToken.sol';
import { _INonFungibleTokenEnumerable } from './_NonFungibleTokenEnumerable.sol';

interface INonFungibleTokenEnumerable is
    _INonFungibleTokenEnumerable,
    INonFungibleToken,
    IERC721Enumerable
{}
