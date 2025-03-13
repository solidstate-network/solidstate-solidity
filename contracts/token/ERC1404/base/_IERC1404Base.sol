// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC1404 } from '../../../interfaces/_IERC1404.sol';
import { _IFungibleTokenBase } from '../../fungible/base/_IFungibleTokenBase.sol';

/**
 * @title ERC1404 base interface
 */
interface _IERC1404Base is _IERC1404, _IFungibleTokenBase {
    error ERC1404Base__ArrayLengthMismatch();
}
