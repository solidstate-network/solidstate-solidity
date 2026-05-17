// SPDX-License-Identifier: MIT

pragma solidity ^0.8.31;

import { _IERC1404 } from '../../../interfaces/_IERC1404.sol';
import { _IFungibleToken } from '../_IFungibleToken.sol';

/**
 * @title ERC1404 base interface
 */
interface _IRestrictedFungibleToken is _IERC1404, _IFungibleToken {
    error RestrictedFungibleToken__ArrayLengthMismatch();
}
