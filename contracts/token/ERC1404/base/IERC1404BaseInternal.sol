// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1404Internal } from '../../../interfaces/IERC1404Internal.sol';
import { IERC20BaseInternal } from '../../ERC20/base/IERC20BaseInternal.sol';

/**
 * @title ERC1404 base interface
 */
interface IERC1404BaseInternal is IERC1404Internal, IERC20BaseInternal {
    error ERC1404Base__ArrayLengthMismatch();
}
