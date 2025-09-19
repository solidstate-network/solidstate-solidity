// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { _IFungibleToken } from '../_IFungibleToken.sol';
import { _IERC1404 } from '../../../interfaces/_IERC1404.sol';

/**
 * @title ERC1404 base interface
 */
interface _IRestrictedFungibleToken is _IERC1404, _IFungibleToken {
    error RestrictedFungibleToken__ArrayLengthMismatch();
}
