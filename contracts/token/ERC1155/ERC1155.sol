// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC165} from '../../introspection/ERC165.sol';
import {ERC1155Base} from './base/ERC1155Base.sol';

/**
 * @title SolidState ERC1155 implementation
 */
abstract contract ERC1155 is ERC1155Base, ERC165 {}
