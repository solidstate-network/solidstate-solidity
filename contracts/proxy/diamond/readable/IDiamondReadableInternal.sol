// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC2535DiamondLoupeInternal } from '../../../interfaces/IERC2535DiamondLoupeInternal.sol';

/**
 * @title Diamond proxy introspection interface needed for internal functions
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface IDiamondReadableInternal is IERC2535DiamondLoupeInternal {}
