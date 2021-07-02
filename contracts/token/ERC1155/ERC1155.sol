// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {ERC1155Base} from './ERC1155Base.sol';
import {ERC165} from '../../introspection/ERC165.sol';

abstract contract ERC1155 is ERC1155Base, ERC165 {}
