// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC721Base } from './base/IERC721Base.sol';
import { IERC721Enumerable } from './enumerable/IERC721Enumerable.sol';
import { IERC721Metadata } from './metadata/IERC721Metadata.sol';
import { _ISolidstateERC721 } from './_ISolidstateERC721.sol';

interface ISolidstateERC721 is
    _ISolidstateERC721,
    IERC721Base,
    IERC721Enumerable,
    IERC721Metadata
{}
