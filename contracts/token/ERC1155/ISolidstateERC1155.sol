// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC1155Base } from './base/IERC1155Base.sol';
import { IERC1155Enumerable } from './enumerable/IERC1155Enumerable.sol';
import { IERC1155Metadata } from './metadata/IERC1155Metadata.sol';
import { _ISolidstateERC1155 } from './_ISolidstateERC1155.sol';

interface ISolidstateERC1155 is
    _ISolidstateERC1155,
    IERC1155Base,
    IERC1155Enumerable,
    IERC1155Metadata
{}
