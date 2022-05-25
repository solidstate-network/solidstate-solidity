// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { SolidStateERC20 } from '../ERC20/SolidStateERC20.sol';
import { ERC4626Base } from './base/ERC4626Base.sol';

/**
 * @title SolidState ERC4626 implementation, including recommended ERC20 extensions
 */
abstract contract SolidStateERC4626 is ERC4626Base, SolidStateERC20 {

}
