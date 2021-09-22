// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC20Base } from './base/ERC20Base.sol';
import { ERC20Extended } from './extended/ERC20Extended.sol';
import { ERC20Metadata } from './metadata/ERC20Metadata.sol';

/**
 * @title SolidState ERC20 implementation, including recommended extensions
 */
abstract contract ERC20 is ERC20Base, ERC20Extended, ERC20Metadata {

}
