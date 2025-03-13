// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1404 } from '../../../interfaces/IERC1404.sol';
import { IFungibleTokenBase } from '../../fungible/base/IFungibleTokenBase.sol';
import { _IERC1404Base } from './_IERC1404Base.sol';

/**
 * @title ERC1404 base interface
 */
interface IERC1404Base is _IERC1404Base, IFungibleTokenBase, IERC1404 {}
