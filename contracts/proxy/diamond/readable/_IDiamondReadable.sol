// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC2535DiamondLoupe } from '../../../interfaces/_IERC2535DiamondLoupe.sol';
import { _IERC165Base } from '../../../introspection/ERC165/base/_IERC165Base.sol';

/**
 * @title Diamond proxy introspection interface needed for internal functions
 * @dev see https://eips.ethereum.org/EIPS/eip-2535
 */
interface _IDiamondReadable is _IERC2535DiamondLoupe, _IERC165Base {}
