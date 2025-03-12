// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { _IERC1155Base } from './base/_IERC1155Base.sol';
import { _IERC1155Enumerable } from './enumerable/_IERC1155Enumerable.sol';
import { _IERC1155Metadata } from './metadata/_IERC1155Metadata.sol';

interface _ISolidstateERC1155 is
    _IERC1155Base,
    _IERC1155Enumerable,
    _IERC1155Metadata
{}
