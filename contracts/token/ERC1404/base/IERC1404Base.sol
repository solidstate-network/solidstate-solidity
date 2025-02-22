// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1404 } from '../../../interfaces/IERC1404.sol';
import { IERC20Base } from '../../ERC20/base/IERC20Base.sol';
import { IERC1404BaseInternal } from './IERC1404BaseInternal.sol';

/**
 * @title ERC1404 base interface
 */
interface IERC1404Base is IERC1404BaseInternal, IERC20Base, IERC1404 {}
