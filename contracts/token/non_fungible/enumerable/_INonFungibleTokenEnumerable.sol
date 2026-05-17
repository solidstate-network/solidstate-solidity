// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _IERC721Enumerable } from '../../../interfaces/_IERC721Enumerable.sol';
import { _INonFungibleToken } from '../_INonFungibleToken.sol';

interface _INonFungibleTokenEnumerable is
    _INonFungibleToken,
    _IERC721Enumerable
{}
