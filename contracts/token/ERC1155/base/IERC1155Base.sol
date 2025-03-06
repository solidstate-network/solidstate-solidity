// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1155 } from '../../../interfaces/IERC1155.sol';
import { _IERC1155Base } from './_IERC1155Base.sol';

/**
 * @title ERC1155 base interface
 */
interface IERC1155Base is _IERC1155Base, IERC1155 {}
