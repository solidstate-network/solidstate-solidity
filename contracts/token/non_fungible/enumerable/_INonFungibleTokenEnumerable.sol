// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _INonFungibleToken } from '../_INonFungibleToken.sol';
import { _IERC721Enumerable } from '../../../interfaces/_IERC721Enumerable.sol';

interface _INonFungibleTokenEnumerable is
    _INonFungibleToken,
    _IERC721Enumerable
{}
