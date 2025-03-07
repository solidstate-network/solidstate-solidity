// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1155Base } from './base/IERC1155Base.sol';
import { IERC1155Enumerable } from './enumerable/IERC1155Enumerable.sol';
import { IERC1155Metadata } from './metadata/IERC1155Metadata.sol';
import { _ISolidStateERC1155 } from './_ISolidStateERC1155.sol';

interface ISolidStateERC1155 is
    _ISolidStateERC1155,
    IERC1155Base,
    IERC1155Enumerable,
    IERC1155Metadata
{}
